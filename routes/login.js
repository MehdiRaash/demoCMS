var express = require('express');
var bodyParser = require('body-parser'); 
var config = require('../config/index.json'); 

var user_model = require('../models/user_model');

var router = express.Router();
 

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
 
 
router.post('/', urlencodedParser, function (req, res) {

  var user_email    = req.body.email;
  var user_password = req.body.password; 
  
  var sess = req.session; 

  if(user_email && user_password){

    user_model.do_logIn(user_email, user_password, function(user){ 
       
      sess.loggedIn = true; 
      sess.user_email = user.email; 
      sess.firstName = user.firstName;
      sess.lastName = user.lastName; 
      sess.user_id = user._id;
      sess.save(); 
      
      res.redirect('/dashboard'); 
    }); 
 
  } else{
     res.send(404);
  }
   
  
}); 

module.exports = router;