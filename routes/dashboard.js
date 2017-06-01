var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config'); 

var post_model = require('../models/post_model');


var router = express.Router();
 
router.get('/', function (req, res) {
  var sess = req.session;

  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');
    res.sendStatus(404);

  }else{

    res.render('dashboard', {
      loggedIn : true, 
      jsFile: '/public/js/dashboard.js',
      site_name: config.site_name, 
      firstName: sess.firstName, 
      lastName : sess.lastName
    });

  }

}); 
router.get('/test', function(req, res){
  res.sendStatus(200);
});

router.get('/new_post', function(req, res){
  var sess = req.session;   

  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');
    res.sendStatus(404); 
  }else{   

    var dataObj = {
      title: 'test',
      text: 'test',
      createdAt : Date.now(),
      whoCreated_Id : sess.user_id,
      allowToshow : true,
      tags : [3,4]
    };

    post_model.insert_post( dataObj, function(){ 
      res.sendStatus(200);
    });
 
   }
})
module.exports = router;