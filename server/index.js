var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');
var fileUpload = require('express-fileupload');
var session = require('express-session');
//Setup
var app = module.exports = express();
var connectionString = "postgres://postgres:Color45@localhost/cappriciodb"
var massiveInstance = massive.connectSync({connectionString: connectionString})




//Middleware
