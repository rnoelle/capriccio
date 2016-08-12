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
  getProfile: function (req, res, next) {
    var id = req.params.id;
    db.read_user(id, function (err, user) {
      res.json(user);
    })
  },
  createSubmission: function (req, res, next) {
    console.log(req.files);
    console.log(req.body);
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
        console.log(err);
        console.log(resp);
        res.send('submitted')
      });
  }
}
