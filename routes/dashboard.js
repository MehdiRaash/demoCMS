var express = require('express');
var bodyParser = require('body-parser');
var config = require('../config'); 

var post_model = require('../models/post_model');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var router = express.Router();
 
router.get('/', function (req, res) {
  var sess = req.session;

  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    res.redirect('/');  

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

router.post('/new_post', jsonParser, function(req, res){
  var sess = req.session;   
   
  if(typeof sess.loggedIn === "undefined" || sess.loggedIn === false){  
    //res.redirect('/');
    res.sendStatus(404); 
  }else{        
    console.log(req.body)
      if(req.body.length !== 0){

      var temp = {
          allowToPublish : false,
          post_title: '',
          post_text: ''
        };

      req.body.forEach(function(element) {

          switch (element.name) {
            case 'post_title':
              temp.post_title = element.value;
              break;
            case 'post_text':
              temp.post_text = element.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
              break;
            case 'allowToPublish':
              temp.allowToPublish = true;
              break;

            default:
              break;
          }

        }, this); 

      var dataObj = {
      title: temp.post_title,
      text: temp.post_text,
      createdAt : Date.now(),
      whoCreated_Id : sess.user_id,
      allowToshow : temp.allowToPublish,
      tags : [3,4]
    }; 
    post_model.insert_post( dataObj, function(){ 
      res.json({ state: 1, msg: 'پست ارسال شد.'});
    });
    }else{
     // res.sendStatus(404);
    } 
 
   }
})
module.exports = router;