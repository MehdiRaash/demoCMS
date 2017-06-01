var mongoose = require('mongoose'); 
var db = mongoose.connection;


var Schema = mongoose.Schema;

var postSchema = Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated_Id: Schema.Types.ObjectId,
    allowToshow: Boolean,
    tags: [ Number ]
});

var Post = mongoose.model('post', postSchema, 'post'); 

function insert_post( dataObj, callback ){

    var newPost = new Post(dataObj);
    newPost.save(callback);
}
module.exports = {
    insert_post: insert_post
};