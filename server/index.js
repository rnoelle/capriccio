var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var multer = require('multer');
//Setup
var app = module.exports = express();
var connectionString = "postgres://postgres:Color45@localhost/capricciodb"
var massiveInstance = massive.connectSync({connectionString: connectionString});
app.set('db', massiveInstance);

//Controllers
var uploads = require('./uploads')
var controller = require('./controllers/controller');
//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('../public'));
//Configuration
var port = 4531;


//Endpoints

// //Get
app.get('/products', controller.getProducts);
app.get('/product/:id', controller.getProduct);
app.get('/profile/:id', controller.getProfile);
// //Post

app.post('/upload', uploads.composerUpload, function (req, res, next) {
  console.log(req.files);
  res.send(req.body);
});





app.listen(port, function () {
  console.log("listening on ", port);
})
