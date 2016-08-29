const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const config = require('./config');
const stripe = require('stripe')(config.testSecretKey);

// Basic Setup
const app = module.exports = express();
app.use(express.static('../public'));
const connectionString = "postgres://postgres:password@127.0.0.1/capricciodb"
const massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);
const db = app.get('db');

//Controllers
const uploads = require('./uploads');
const controller = require('./controllers/controller');
const authCtrl = require('./controllers/authCtrl');

//Middleware, Advanced Setup
app.use(bodyParser.json());
app.use(session({
   secret: config.sessionSecret,
   resave: true,
   saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({usernameField: 'email'},
function(email, password, done) {
  // const hash = bcrypt.hashSync(password, 10)
  db.getUserByEmail(email, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!password == user.password) { return done(null, false); }
    return done(null, user);
  });
}
));

passport.use(new FacebookStrategy({
  clientID: config.facebookID,
  clientSecret: config.facebookSecret,
  callbackURL: 'http://noellereid.io/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, function (accessToken, refreshToken, profile, done) {
  db.getUserByFacebookId([profile.id], function (err, user) {
    if (user) user = user[0];
    if (!user) {
      console.log('Creating User');
      var first_name;
      var last_name;
      var names = profile.displayName.split(' ');
      first_name = names.shift();
      last_name = names.join(' ');
      var date_joined = new Date();
      var admin = false;
      var registered_composer = false;
      db.users.insert({first_name: first_name, last_name: last_name, email:profile.email,
        picture_url: profile.photos[0].value, admin: admin, registered_composer: registered_composer, date_joined: date_joined},
        function (err, user) {
        console.log('User Created');
        db.createFacebookKey(user.id, profile.id, function (err, key) {
          return done(err, user);
        });
      })
    } else {
      return done(err, user);
    }
  })
}
))


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
  console.log('serializing')
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  if (obj[0]) {
    obj = obj[0];
  }
  console.log('deserialized', obj.first_name, obj.last_name, 'email:', obj.email);
  done(null, obj);
});
app.get('/userauth', authCtrl.getAuth);
app.get('/usercomp', authCtrl.getComp);

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})
     //End Authentication
app.get('/products', controller.getProducts);
app.get('/product/:id', controller.getProduct);
app.get('/profiles', controller.getProfile);
app.get('/cart', controller.getCart);
app.get('/submissions', controller.getSubmissions);
app.get('/submissions/:id', controller.getSubmission);
app.get('/orders', controller.getPurchasesByUser);
app.get('/works/:id', controller.getWorksByComposer);
app.get('/users', controller.getUsers);


//Post
// //Local Auth
app.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'}),
  function(req, res) {
    console.log('logged in!');
    res.status(200).send();
  });
// //Stripe Checkout
app.post('/api/charge', function(req, res) {
  // Get the credit card details submitted by the form
  var token = req.body.stripeToken; // Using Express
  // Create a charge: this will charge the user's card
  var charge = stripe.charges.create({
   amount: req.body.price, // Amount in cents
   currency: "usd",
   source: token,
   description: "Music Purchase"
  }, function(err, charge) {
   if (err && err.type === 'StripeCardError') {
     // The card has been declined
   } else {
     // Store order status
     controller.addOrder(req, res, next);
     res.status(200).send(charge);
   }
  });
})
// // Others
app.post('/upload', uploads.composerUpload, controller.createSubmission);
app.post('/admin/upload', uploads.adminUpload, controller.createWork);
app.post('/update', uploads.adminUpdate, controller.updateWork,
  function (req, res, next) {
    res.redirect('/updated');
});

app.post('/users', authCtrl.addLocalUser);
app.post('/composers', controller.createComposer);
app.post('/cart', controller.addToCart, controller.getCart);
app.post('/orders', controller.addOrder);
app.post('/submissions/decision/:id/:acceptance', controller.acceptOrDenySubmission)

// Delete
app.delete('/cart/:id', controller.removeFromCart);

app.listen(config.port, function () {
  console.log("Server listening on ", config.port);
})
