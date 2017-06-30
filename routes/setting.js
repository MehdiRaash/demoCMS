var express = require('express');
var bodyParser = require('body-parser');

var config = require('../config/index.json'); 

var tag_model  = require('../models/tag_model');
var post_model = require('../models/post_model');
var user_model = require('../models/user_model');
 

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var router = express.Router(); 

router.use(function(req, res, next){
  var sess = req.session;
  
  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');  
  }else{
    next();
  }
  
});

router.get('/', function (req, res) {
  var sess = req.session; 
   
    res.render('setting', {
      loggedIn : true , 
      jsFile: '/public/js/setting_client.js' ,
      serverTagsArr : undefined ,
      config: config , 
      firstName: sess.firstName,
      lastName: sess.lastName,
      printName: function() {
        return sess.firstName + ' ' + sess.lastName;
      }
    }); 

}); 

router.post('/submit', jsonParser, function(req, res){
  var sess = req.session;   
      
    var temp = {};

    req.body.forEach(function(theInput) { 
      switch (theInput.name) {
        case 'firstName':
          temp.firstName = theInput.value;
          break;
        case 'lastName':
          temp.lastName = theInput.value;
          break; 
      } 
    }, this); 

    user_model
    .updateName(temp.firstName, temp.lastName, sess.user_id)
    .then(function(result){
      sess.firstName = temp.firstName;
      sess.lastName = temp.lastName;
      res.json({state : 1})
    });


});

module.exports = router;