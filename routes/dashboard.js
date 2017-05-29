var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config'); 


var router = express.Router();
 
router.get('/', function (req, res) {
  var sess = req.session;  
  var loggedIn = true;

  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){ 
    loggedIn = false;
    res.redirect('/');
    res.sendStatus(404);

  }else{

    res.render('dashboard', {
      loggedIn : loggedIn, 
      site_name: config.site_name, 
      firstName: sess.firstName, 
      lastName : sess.lastName
    });

  }

}); 

module.exports = router;