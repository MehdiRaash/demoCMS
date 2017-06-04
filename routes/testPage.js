var express = require('express');
var config = require('../config');

var tag_model = require('../models/tag_model');

var router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('a request for testPage.');
  next();
});

router.get('/', function (req, res) {

	var sess = req.session;

	if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    
    res.render('homePage', { loggedIn: false, site_name: config.site_name}); 

  } else{ 

  }
	

    res.render("test", { name :req.params.name , site_name: config.site_name}); 
}); 
router.get('/:id', function (req, res) {
    res.render("test", { name :req.params.name , site_name: config.site_name}); 
}); 

router.get('/json', function(req, res){
    res.json({firstName:'ali', lastName:'kazemi'});
}) 

module.exports = router;