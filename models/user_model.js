var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: Boolean,
    createdAt: Date,
    active: Boolean
});
var User = mongoose.model('user', UserSchema, 'user'); 




function do_signUp(input, callback){

  User.findOne({ email: input.email }, function(err, obj){
    if (err) return handleError(err);

    if(!obj){
      var newUser = new User({ 
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
        createdAt: Date.now(),
        admin: false,
        active: true
      });

      newUser.save(function (err) {
        if (err) return handleError(err);
        callback();
      });
    }else{

    } 

  });
  
};

function do_logIn(user_email, user_password, callback){

  User.findOne({ email: user_email, password: user_password }, function(err, user){
      if (err) return handleError(err);

      if(user){
        callback(user);
      }
  });

};

module.exports = {
  do_signUp: do_signUp,
  do_logIn: do_logIn
};