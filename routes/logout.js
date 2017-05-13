var express = require('express'); 

var router = express.Router(); 


router.use(function timeLog (req, res, next) {
   //   req.session.destroy(function(err) {
  
  // })
  next();
});
 

module.exports = router;