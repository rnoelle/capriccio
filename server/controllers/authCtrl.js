var app = require('../server');
var db = app.get('db');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
    addLocalUser: function (req, res, next) {
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
      var email = req.body.email;
      var date_joined = new Date();
      // var hash = bcrypt.hashSync(req.body.password, 10);
      db.getUserByEmail(email, function (err, resp) {
        if (resp.first_name) {
          console.log(resp);
          res.status(403).send('email in use');
          next();
        }
      })
      db.users.insert({first_name: first_name, last_name: last_name, email:email,
        admin: false, local_pass: req.body.password,
        registered_composer: false, date_joined: date_joined}
    ), function (err, resp) {
        res.redirect('/main');
    }},
    localSignin: function(email, password, done) {
      // var hash = bcrypt.hashSync(password, 10)
      db.getUserByEmail(email, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!password == user.password) { return done(null, false); }
        return done(null, user);
      });
    },
    facebookSignin: function (accessToken, refreshToken, profile, done) {
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
    },
    getAuth: function (req, res, next) {
      console.log("server getting auth");
      if (!req.user) {
        res.status(401).send('please login');
        return;
      }
      if (!req.user.admin) {
        res.status(403).send('unauthorized');
        return;
      }
      res.status(200).send('');
      next();
    },
  getComp: function (req, res, next) {
    if (!req.user) {
      res.status(401).send('please login');
      return;
    } else {
      db.get_composer_by_user(req.user.id, function (err, resp) {
        console.log('composer response', resp);
        if (resp.length === 0) {
          res.status(303).send('unauthorized')
          return;
        } else {
          res.redirect('publish');
        }
      })
    }
  }




}
