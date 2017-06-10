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
 
  // var myPreferedTag = {
  //   sport : { fa: 'ورزشی'},
  //   politic : { fa: 'سیاسی'},
  //   social : { fa: 'اجتمائی' }
  // };

  Promise.all([ 
    post_model.getTheMainPost()
    //,
    //post_model.getLastPostsByTag('ورزشی', 2),
    //post_model.getLastPostsByTag('سیاسی', 2),
    //post_model.getLastPostsByTag('اجتمائی', 2),
    ])
    .then(function(result){ 

      renderObj.mainPost = result[0];
     // renderObj.sports   = result[1];
     // renderObj.politic  = result[2];
   //   renderObj.social   = result[3];

      console.log(renderObj);

      res.render('homePage', renderObj); 

  });
}); 

module.exports = router;