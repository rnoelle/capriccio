var app = require('../index');
var db = app.get('db');

module.exports = {
  getProducts: function (req, res, next) {
    db.read_products(function (err, products) {
      res.json(products);
    });
  },

  getProduct: function (req, res, next) {
    var id = req.params.id;
    db.read_product(id, function (err, product) {
      res.json(product);
    });
  },

  getCart: function (req, res, next) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    res.json(req.session.cart);
  },

  addToCart: function (req, res, next) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    console.log(req.body);
      db.read_product(req.body.product_id, function (err, product) {
        req.session.cart.push(product[0]);
        res.json(req.session.cart);
      });
  },

  removeFromCart: function (req, res, next) {
    if (!req.session.cart) {
      res.status(403).send('no cart');
      return;
    }
    console.log('search id', req.params.id);
    for (let i = 0; i < req.session.cart.length; i++) {
      console.log('thisId', req.session.cart[i].id);
      if (req.session.cart[i].id = req.params.id) {
        req.session.cart.splice(i, 1);
        break;
      }
      console.log(req.session.cart.length);
    } res.json(req.session.cart);
  },

  getProfile: function (req, res, next) {
    if (req.user) {
      console.log("getting profile", req.user.id, req.user.first_name);
      var id = req.user.id;
      db.read_user(id, function (err, user) {
        if (err) {
          res.send(err)
        }
        res.json(user);
      })
    } else {
      res.status(401).send('must login')
    }
  },

  createSubmission: function (req, res, next) {
    if (req.files.cover) {
      var cover_url = "../public/uploads" + req.files.cover.filename;
      var template = null;
    } else {
      var template = req.body.template;
      var cover_url = null;
    }
    var score_url = "../public/uploads/" + req.files.submissionScore[0].filename;
    var parts_url = "../public/uploads/" + req.files.submissionParts[0].filename;
    var date_submitted = new Date();
    var title = req.body.title;
    var composerfirst = req.body.composerFirst;
    var composerlast = req.body.composerLast;
    if (req.body.package == "pdf") {
      var package = 'pdf';
      var price_pdf = req.body.price_pdf;
      var price_print = null;
      var price_mixed = null;
    }
    if (req.body.package == "print") {
      var package = 'print';
      var price_print = req.body.price_print;
      var price_pdf = null;
      var price_mixed = null;
    }
    if (req.body.package == "mixed") {
      var package = 'mixed';
      var price_mixed = req.body.price_mixed;
      var price_pdf = req.body.price_pdf;
      var price_print = req.body.price_print;
    }
    var accepted = null;
    var date_accepted = null;
    db.create_submission(date_submitted, title, composerfirst, composerlast,
      cover_url, score_url, parts_url, template, price_print, price_pdf,
      price_mixed, package, accepted, date_accepted, function (err, resp) {
        res.send('submitted');
      });
  },

  updateWork: function (req, res, next) {
    var id = req.body.id;
    if (req.body.title) {
      db.update_work_title(id, req.body.title, function (err, resp) {
        res.send('updated');
      });
    }
  },

  createComposer: function (req, res, next) {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var year_born = req.body.year_born;
    if (!req.body.year_died) {
      var year_died = null;
    } else {
      var year_died = req.body.year_died;
    }
    var country_of_origin = req.body.country_of_origin;
    var user_id = req.user.id;
    db.createComposer(first_name, last_name, year_born,
      year_died, country_of_origin, user_id, function (err, resp) {
        res.send(resp)
      })
  },

  updateUserRegisteredComposer: function (req, res, next) {
    db.update_user_registered_composer(req.body.user_id, function (err, resp) {
      res.send(resp)
    })
  }
}
