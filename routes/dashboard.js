var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config'); 

var post_model = require('../models/post_model');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var router = express.Router();
 
router.get('/', function (req, res) {
  var sess = req.session;

  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');
    res.sendStatus(404);

  }else{

    res.render('dashboard', {
      loggedIn : true, 
      jsFile: '/public/js/dashboard_client.js',
      site_name: config.site_name, 
      firstName: sess.firstName, 
      lastName : sess.lastName
    });

  }

});  

router.post('/new_post', urlencodedParser, function(req, res){
  var sess = req.session; 
  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');
    res.sendStatus(404); 
  }else{     

    
    if(req.body.post_text && req.body.post_title){

      var dataObj = {
      title: req.body.post_title,
      text: req.body.post_text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
      createdAt : Date.now(),
      whoCreated_Id : sess.user_id,
      allowToshow : true,
      tags : [3,4]
    };

    // post_model.insert_post( dataObj, function(){ 
    //   res.sendStatus(200);
    // });
    }else{
      res.sendStatus(404);
    } 
 
   }
})
module.exports = router;