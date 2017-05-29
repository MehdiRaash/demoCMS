var express = require('express'); 

var router = express.Router(); 


router.use(function(req, res, next) {
  req.session.destroy();
  next();
});
 

module.exports = router;