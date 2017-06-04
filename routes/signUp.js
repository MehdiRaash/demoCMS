var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config'); 

var signUp_model = require('../models/user_model');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/', function (req, res) {  
  var sess = req.session;

  if(typeof sess.loggedIn === 'undefined' || sess.loggedIn === false){
    
    res.render('signUp', { loggedIn: false, site_name: config.site_name, hasError: false}); 

  } else{

    res.redirect('/'); 

  }
}); 

router.post('/submit', urlencodedParser, function (req, res) {  

  var errors = [];  
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
    res.render('signUp', {
      title: 'دمو سی ام اس | ثبت نام',
      site_name: config.site_name,
      errors: errors,
      hasError: true 
    });
  }else{
 
    signUp_model.do_signUp(req.body, function(){

      res.render('signUp_successful', {
        title: 'دمو سی ام اس | ثبت نام',
        site_name: config.site_name
      });
    
    });
  
  }
}); 



module.exports = router;