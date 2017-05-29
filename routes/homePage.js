var express = require('express');
var config  = require('../config');
var router = express.Router();

  
router.get('/', function (req, res) {
  var sess = req.session;

  if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    
    res.render('homePage', { loggedIn: false, site_name: config.site_name}); 

  } else{

    res.render('homePage', { 
      loggedIn : true,
      site_name: config.site_name, 
      firstName: sess.firstName,
      lastName : sess.lastName
    }); 

  }
}); 

module.exports = router;