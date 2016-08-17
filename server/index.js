var express = require('express');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var multer = require('multer');
var config = require('./config')
//Setup
var app = module.exports = express();
app.use(express.static('../public'));
var connectionString = "postgres://postgres:Color45@localhost/capricciodb"
var massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);
var db = app.get('db');

app.use(bodyParser.json());
app.use(session({
   secret: config.sessionSecret,
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
  clientID: config.facebookID,
  clientSecret: config.facebookSecret,
  callbackURL: 'http://localhost:4531/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, done) {
  db.getUserByFacebookId([profile.id], function (err, user) {
    user = user[0];
    if (!user) {
      console.log('Creating User');
      console.log(profile);
      var first_name;
      var last_name;
      var names = profile.displayName.split(' ');
      first_name = names.shift();
      last_name = names.join(' ');
      var date_joined = new Date();
      db.users.insert({first_name: first_name, last_name: last_name, email:profile.email,
        picture_url: profile.photos[0].value, date_joined: date_joined}, function (err, user) {
        console.log('User Created', user);
        db.createFacebookKey(user.id, profile.id, function (err, key) {
          return done(err, user);
        });
      })
    } else {
      return done(err, user);
    }
  })
}))

//Controllers
var uploads = require('./uploads');
var controller = require('./controllers/controller');

//Middleware
app.use(cors());


//Endpoints

// //Get
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  console.log(obj);
  done(null, obj);
});

     //End Authentication
app.get('/products', controller.getProducts);
app.get('/product/:id', controller.getProduct);
app.get('/profiles', controller.getProfile);

// //Post
app.post('/upload', uploads.composerUpload, controller.createSubmission, function (req, res, next) {
  res.send(req.body);
});
app.post('/update', uploads.adminUpdate, controller.updateWork, function (req, res, next) {
  console.log(req.body);
  res.send(req.body);
});
app.post('/composer', controller.createComposer, controller.updateUserRegisteredComposer);


app.listen(config.port, function () {
  console.log("listening on ", config.port);
})
