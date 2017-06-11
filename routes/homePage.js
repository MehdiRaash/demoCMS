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
    post_model.getTheMainPost(),
    post_model.getLastPostsByTag('ورزشی', 4),
    post_model.getLastPostsByTag('سیاسی', 4),
    post_model.getLastPostsByTag('اجتمائی', 4),
    post_model.getLastPostsByTag('اجتماdfئی', 4) 

    ])
    .then(function(result){  
    //   var postManager = {
    //     allPostId : [],
    //     addId : function(arr){ 
    //       arr.forEach(function(eachPost){ 
    //         this.allPostId.push( eachPost['_id'].toString() ); 
    //       }, this); 
    //     },
    //     removeId: function(id){
    //       this.allPostId = this.allPostId.filter(function(eachId){
    //         if(eachId === id){
    //           return false
    //         }else{
    //           return true;
    //         }
    //       } ,this);
    //     },
    //     removeDuplicate: function(arr){  
    //     var newArr = arr.filter(function(obj){  
    //       if(this.allPostId.indexOf(obj['_id'].toString()) !== -1){ 
    //         this.removeId(obj['_id'].toString());
    //         return true;
    //       }else{
    //         return false;
    //       }
    //     }, this); 
    //     return newArr;
    //   }

    // }; 
    // postManager.addId(result[1]);
    // postManager.addId(result[2]);
    // postManager.addId(result[3]);


      var allPostId = [];
      var gatherAllPostId = function(mainQueryArr){
        if(Array.isArray(mainQueryArr) && mainQueryArr.length !== 0){
          mainQueryArr.forEach(function(queryResult){

            if(Array.isArray(queryResult) && queryResult.length !== 0){
              queryResult.forEach(function(eachPost){  
                allPostId.push(eachPost['_id'].toString()); 
              });  
            }
          }); 
        } 
      }; 
      var removeId  = function(id){
        allPostId = allPostId.filter(function(eachId){
          if(eachId === id){
            return false
          }else{
            return true;
          }
        });
      }; 
      var removeDuplicate = function(arr){
        var newArr = []; 
        if( !Array.isArray(arr) ){
          var temp = arr;
          arr = [];
          arr.push(temp);
        } 

        if(arr.length !== 0){
          newArr = arr.filter(function(obj){  
          if(obj['_id']){
            if(allPostId.indexOf(obj['_id'].toString()) !== -1){ 
              removeId(obj['_id'].toString());
              return true;
            }else{
              return false;
            }
          } 
        });
        }else{
          newArr = [];
        } 
         
        return newArr;
      };  
      gatherAllPostId(result);
          

      renderObj.mainPost = { title: "خبر اصلی", posts: removeDuplicate(result[0]) };
      renderObj.sport    = { title: "ورزشی", posts: removeDuplicate(result[1]) };
      renderObj.politic  = { title: "سیاسی", posts: removeDuplicate(result[2]) };
      renderObj.social   = { title: "اجتمائی", posts: removeDuplicate(result[3]) };
      renderObj.ss   =     { title: "اجتمائی", posts: removeDuplicate(result[4]) };

      res.render('homePage', renderObj); 
       
  }).catch(function(err){
    console.log(err)
  });
}); 

module.exports = router;