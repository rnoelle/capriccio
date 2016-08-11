var data = require('./data')
var app = require('../index');
var db = app.get('db');

module.exports = {
  getProducts: function (req, res, next) {
    db.read_products(function (err, products) {
      res.json(products);
    })
  },
  getProduct: function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    res.json(data.items[id -1]);
  },
  getProfile: function (req, res, next) {
    var id = req.params.id;
    res.json(data.users[id - 1]);
  }
}
