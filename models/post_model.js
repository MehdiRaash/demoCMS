var mongoose = require('mongoose'); 
var db = mongoose.connection;

var moment = require('moment-jalaali');


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

function getUserSentPosts(userId, limit){
  return new Promise(function(resolve, reject){ 

    Post.find({ whoCreated_Id : userId })
    .sort({ createdAt : -1 })
    .limit(limit || 100)
    .exec(function(err,result) {
      if (err) reject(err);

      var newArr = result.map(function(post){
        post.createdAt_fa = moment(post.createdAt).format('jYYYY/jM/jD') // 1981/07/17 
        return post;
      })
      resolve(newArr);
    });
    
  });
};

function getLatestPosts( limit ){
  
  return new Promise(function(resolve, reject){ 

    Post.find({allowToShow : true})
    .sort( { createdAt: -1 } )
    .limit(limit || 10)
    .exec(function(err,result) {
      if (err) reject(err); 

      resolve(result);
    });
    
  });
};

function getTheMainPost(){
  return new Promise(function(resolve, reject){ 

    Post.findOne({ mainPost: true } ,function(err,result) {
      if (err) reject(err);
      var arr = [];
      if(result === null){
        resolve(arr);
      }else{
        arr.push(result);
        resolve(arr);
      } 
    });
    
  });
};

function getLastPostsByTag(tagName, limit){  

  return new Promise(function(resolve, reject){ 
      Post
      .find({ tags : { $in: [tagName] } , allowToShow : true }, { })
      .sort( { createdAt: -1 } )
      .limit(limit)
      .exec(function(err,result) {
        if (err) reject(err);

        resolve(result);
      }); 
  });
};

function findById(id, callback){
    return new Promise(function(resolve, reject){ 

    Post.findOne({ _id : id } ,function(err,result) {
      if (err) reject(err);

      resolve(result);
    });
    
  });
};

function findByTag(tagNameArr){
  return new Promise(function(resolve, reject){ 

    Post.find({ tags : { $in: tagNameArr } , allowToShow : true }).distinct('_id', function(err,result) {
      if (err) reject(err);

      resolve(result);
    }); 
  });
};

function deletePostByWhoCreated(Obj){
  return new Promise(function(resolve, reject){ 

    Post.find( { _id: Obj.postId , whoCreated_Id: Obj.ownerId }, function(err,docs){
      if (err) reject(err);
      if (!docs || !Array.isArray(docs) || docs.length === 0) reject('no docs found');

      docs.forEach( function (doc) {
        doc.remove();
        resolve(true);
      });
      
    });
 
  });
};

module.exports = {
  findById: findById,
  findByTag: findByTag,
  getLastPostsByTag: getLastPostsByTag,
  getTheMainPost: getTheMainPost,
  insert_post: insert_post,
  getUserSentPosts: getUserSentPosts, 
  getLatestPosts:getLatestPosts,
  deletePostByWhoCreated: deletePostByWhoCreated
};