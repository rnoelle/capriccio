var data = require('./data');

module.exports = {
  getProducts: function (req, res, next) {
    res.json(data.items);
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
