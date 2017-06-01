var express = require('express'); 

var router = express.Router(); 


router.use(function(req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  next();
});
 

module.exports = router;