var express = require('express');
var config  = require('../config/index.json');
var router = express.Router();

var post_model = require('../models/post_model');

  
router.get('/', function (req, res) {
  var sess = req.session;

  var renderObj = {};
  
  renderObj.config = config;
  
  if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    renderObj.loggedIn = false; 
  } else{  
    renderObj.loggedIn = true;
    renderObj.printName = function(){
      return sess.firstName + ' ' + sess.lastName;
    }
  } 
 

  Promise.all([ 
    post_model.getTheMainPost(),
    post_model.getLastPostsByTag('ورزشی', 2),
    post_model.getLastPostsByTag('سیاسی', 2),
    post_model.getLastPostsByTag('اجتمائی', 2),
    ])
    .then(function(result){

      var mainPost = result[0];
      var sport    = result[1];
      var politic  = result[2];
      var social   = result[3];

      renderObj.mainPost = mainPost;
      renderObj.sports   = sport;
      renderObj.politic  = politic;
      renderObj.social   = social;


      res.render('homePage', renderObj); 

  });
}); 

module.exports = router;