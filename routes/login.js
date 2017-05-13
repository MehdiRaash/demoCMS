var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var router = express.Router();
 

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();


var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    active: Boolean
});
var User = mongoose.model('user', UserSchema, 'user'); 
 
router.post('/', urlencodedParser, function (req, res) {

  var user_email = req.body.email;
  var user_password = req.body.password; 
  var sess = req.session; 

  if(user_email && user_password){

    User.find({ "email": user_email, "password": user_password }, {}, function (err, user) {
      if (err) return console.error(err);  
      console.log(user);
      if(user && user.length == 0){  
        res.sendStatus(404);
      }else{
        var loggedInUser = user[0];
        
        sess.loggedIn = true; 
        sess.user_email = user_email; 
        sess.userId = loggedInUser['_id'];
        sess.save();

        res.redirect('/dashboard'); 
      } 
    });

  } else{
     res.send(404);
  }
   
  
}); 

module.exports = router;