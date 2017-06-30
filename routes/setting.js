var express = require('express');
var bodyParser = require('body-parser');

var config = require('../config/index.json'); 

var tag_model = require('../models/tag_model');
var post_model = require('../models/post_model');

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
    jsFile: '/public/js/dashboard_client.js' ,
    //serverTagsArr : JSON.stringify(neatTagsArr) ,
    config: config , 
    printName: function() {
      return sess.firstName + ' ' + sess.lastName;
    }
  });  

}); 

module.exports = router;