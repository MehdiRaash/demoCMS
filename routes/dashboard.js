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
 
    tag_model.getAllTagsName(null, function(tagsArr){ 

      var neatTagsArr = tagsArr.map(function(tagObj){
        return tagObj.name;
      });

      res.render('dashboard', {
        loggedIn : true, 
        jsFile: '/public/js/dashboard_client.js',
        serverTagsArr : JSON.stringify(neatTagsArr),
        config: config, 
        printName: function() {
           return sess.firstName + ' ' + sess.lastName;
        }
      });
    });   

}); 

router.get('/usersentposts', function(req, res){
  var sess = req.session; 
 
  post_model.getUserSentPosts(sess.user_id, 10)
  .then(function(result){
      
    res.render('userSentPosts', {
        posts: result, 
        loggedIn : true, 
        jsFile: null, 
        config: config, 
        printName: function() {
           return sess.firstName + ' ' + sess.lastName;
        }
      });

  });
 
});

router.post('/new_post', jsonParser, function(req, res){
  var sess = req.session;   
    
      if(req.body.length !== 0){

      var temp = {
          allowToShow : false,
          post_title: '',
          post_text: '',
          tagsArr: []
        }; 
        
      req.body.forEach(function(theInput) {

          switch (theInput.name) {
            case 'post_title':
              temp.post_title = theInput.value;
              break;
            case 'post_text':
              temp.post_text = theInput.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
              break;
            case 'allowToPublish':
              temp.allowToShow = true;
              break;
            case 'tags': 
              temp.tagsArr = theInput.value;
            default:
              break;
          }

        }, this);  

        var justInsertPost = function(temp){
          var dataObj = {
            title: temp.post_title,
            text: temp.post_text,
            createdAt : Date.now(),
            whoCreated_Id : sess.user_id,
            allowToShow : temp.allowToShow,
            tags : temp.tagsArr
          };  

          post_model.insert_post( dataObj, function(){ 
            res.json({ state: 1, msg: 'پست ارسال شد.'});
          });
        }; 
         
        if(temp.tagsArr.length === 0){ 
          justInsertPost(temp);
        }else {
          tag_model.ifTagExists(temp.tagsArr, function(){  
            justInsertPost(temp);
          });
        } 
    

    }else{ //if no body were provided
       res.sendStatus(404);
    } 
  
});

router.delete('/', jsonParser, function (req, res) {
  res.send('DELETE request to homepage');
})
module.exports = router;