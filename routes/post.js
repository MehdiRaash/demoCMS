var express = require('express');
var bodyParser = require('body-parser');

var config = require('../config/index.json'); 

var post_model = require('../models/post_model');

var router = express.Router();
 

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
 

router.get('/:postId/:persianText', function (req, res) {
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

  post_model.findById(req.params.postId) 
  .then(function(result){
    renderObj.post = result;
    res.render('post', renderObj);
  }); 

}); 

module.exports = router;