var express = require('express');
var config  = require('../config');
var router = express.Router();




var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demoCMS');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoDB is connected')
});

 
router.get('/', function (req, res) {
  
  res.render('homePage', { site_name: config.site_name}); 
}); 

module.exports = router;