var mongoose = require('mongoose'); 
var db = mongoose.connection;


var Schema = mongoose.Schema;

var postSchema = Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated_Id: Schema.Types.ObjectId,
    allowToShow: Boolean,
    mainPost: Boolean,
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
  return new Promise(function(resolve, reject){ 
    Post.findOne({ } ,function(err,result) {
      if (err) reject(err);

      resolve(result);
    });
  });
};

function getLastPostsByTag(tagName, limit){  

  return new Promise(function(resolve, reject){ 
      Post
      .find({ tags : { $in: ['سیاسی'] } , allowToShow : true }, { _id: 0 })
      .sort( { createdAt: 1 } )
      .limit(limit || 1)
      .exec(function(err,result) {
        if (err) reject(err);

        resolve(result);
      });
  });
};

module.exports = {
  getLastPostsByTag: getLastPostsByTag,
  getTheMainPost: getTheMainPost,
  insert_post: insert_post,
  getLastPost: getLastPost
};