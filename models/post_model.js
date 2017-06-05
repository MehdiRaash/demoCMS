var mongoose = require('mongoose'); 
var db = mongoose.connection;


var Schema = mongoose.Schema;

var postSchema = Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated_Id: Schema.Types.ObjectId,
    allowToshow: Boolean,
    tags: [ String ]
});

var Post = mongoose.model('post', postSchema, 'post'); 

function insert_post( dataObj, callback ){

    var newPost = new Post(dataObj);
    newPost.save(function (err) {
    if (err) return handleError(err);
      callback();
    });
};

function getLastPost( by ){
    
  Post.find({} ,function(err,result) {
    console.log(result)
    // Result is an array of documents
  });
};
function getTheMainPost(){
  
};

module.exports = {
  getTheMainPost: getTheMainPost,
  insert_post: insert_post,
  getLastPost: getLastPost
};