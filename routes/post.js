var express = require('express');
var bodyParser = require('body-parser'); 
var config = require('../config'); 

var user_model = require('../models/post_model');

var router = express.Router();
 

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
 

router.get('/:postId', urlencodedParser, function (req, res) {
  res.send(req.params.postId)
  res.sendStatus(200)
}); 

module.exports = router;