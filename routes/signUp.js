var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config/index.json'); 

var signUp_model = require('../models/user_model');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res) {  
  var sess = req.session;

  if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    
    res.render('signUp', { loggedIn: false, config: config, hasError: false}); 

  } else{

    res.redirect('/'); 

  }
}); 

router.post('/submit', urlencodedParser, function (req, res) {  

  var errors = []; 
  var renderObj = {};
  
  renderObj.config = config;
  renderObj.loggedIn = false; 
  renderObj.errors = [];
  //we are gonna check if an input is not set
  function checkName(input, errorMsg){ 
    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(isNaN(input) === false){
      errors.push('داده ی غیر مرتبط!');
    }else if(input.length > 30){
      errors.push('داده ی غیر مرتبط!');
    }else{  
    } 
  };
  
  function checkEmail(input, errorMsg){

    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(input.length > 60){
      errors.push('داده ی غیر مرتبط!');
    }else if(input.indexOf('@') === -1){
      errors.push('ورودیه ایمیل اشتباه است.');
    }else{  
    }

  };

  function checkPassword(input, errorMsg){

    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(input.length > 60){
      errors.push('داده ی غیر مرتبط!');
    }else{  
    }

  }; 

  checkName(req.body.firstName, 'نام وارد نشده است.');
  checkName(req.body.lastName, 'نام خانوادگی وارد نشده است.');
  checkEmail(req.body.email, 'ایمیل وارد نشده است.');
  checkPassword(req.body.password, 'رمز عبور وارد نشده است.');

   
  if(errors.length !== 0){
    renderObj.errors = errors;
    renderObj.hasError = true;
    res.render('signUp', renderObj);
  }else{
    
    renderObj.hasError = false;

    signUp_model.do_signUp(req.body, function(){

      res.render('signUp_successful', renderObj);
    
    });
  
  }
}); 

router.post('/submit_ajax', urlencodedParser, function(req, res){
  var errors = [];  
    
  renderObj.errors = [];
  //we are gonna check if an input is not set
  function checkName(input, errorMsg){ 
    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(isNaN(input) === false){
      errors.push('داده ی غیر مرتبط!');
    }else if(input.length > 30){
      errors.push('داده ی غیر مرتبط!');
    }else{  
    } 
  };
  
  function checkEmail(input, errorMsg){

    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(input.length > 60){
      errors.push('داده ی غیر مرتبط!');
    }else if(input.indexOf('@') === -1){
      errors.push('ورودیه ایمیل اشتباه است.');
    }else{  
    }

  };

  function checkPassword(input, errorMsg){

    if(typeof input === 'undefined' || input.length === 0){
      errors.push(errorMsg);
    }else if(input.length > 60){
      errors.push('داده ی غیر مرتبط!');
    }else{  
    }

  }; 

  checkName(req.body.firstName, 'نام وارد نشده است.');
  checkName(req.body.lastName, 'نام خانوادگی وارد نشده است.');
  checkEmail(req.body.email, 'ایمیل وارد نشده است.');
  checkPassword(req.body.password, 'رمز عبور وارد نشده است.');

   
  if(errors.length !== 0){ 
    res.json({ signUpDone: false, errors: errors });
  }else{
     

    signUp_model.do_signUp(req.body, function(){

      res.json({ signUpDone : true });
    
    });
  
  }
})

module.exports = router;