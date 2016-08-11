var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var fileUpload = require('express-fileupload');
var session = require('express-session');
//Setup
var app = module.exports = express();
var connectionString = "postgres://postgres:Color45@localhost/capricciodb"
var massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);
//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '../public'));
//Configuration
var port = 4531;
//Endpoints
app.get('/products', controller.getProducts);







app.listen(port, function () {
  console.log("listening on ", port);
})
