var express = require('express');
var config = require('../config');

var router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('a request for testPage.');
  next();
});

router.get('/:id', function (req, res) {
    res.render("index", { name :req.params.name , site_name: config.site_name}); 
}); 

router.get('/json', function(req, res){
    res.json({firstName:'ali', lastName:'kazemi'});
}) 

module.exports = router;