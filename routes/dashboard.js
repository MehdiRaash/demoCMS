var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var router = express.Router();
 
router.get('/', function (req, res) {
  var sess = req.session; 
  res.send(200)
 // res.render('dashboard', {loggedIn:sess.loggedIn,site_name: config.site_name});
}); 

module.exports = router;