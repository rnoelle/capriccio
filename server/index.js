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
var connectionString = "postgres://postgres:Color45@localhost/capricciodb"
var massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);
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
  callbackURL: 'http://localhost:4531/auth/facebook/callback'
}, function (token, refreshToken, profile, done) {
  return done(null, profile);
}))

//Controllers
var uploads = require('./uploads');
var controller = require('./controllers/controller');

//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../public'));


//Endpoints

// //Get
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/main',
  failureRedirect: '/login'
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
app.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
     //End Authentication
app.get('/products', controller.getProducts);
app.get('/product/:id', controller.getProduct);
app.get('/profile/:id', controller.getProfile);

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
