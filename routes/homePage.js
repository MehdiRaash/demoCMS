var express = require('express');
var config  = require('../config');
var router = express.Router();

  
router.get('/', function (req, res) {
  var sess = req.session;

  if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    
    res.render('homePage', { loggedIn: false, config: config}); 

  } else{

    res.render('homePage', { 
      loggedIn : true,
      config: config, 
      firstName: sess.firstName,
      lastName : sess.lastName
    }); 

  }
}); 

module.exports = router;