var mongoose = require('mongoose'); 
var db = mongoose.connection;


var Schema = mongoose.Schema;

var postSchema = Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated_Id: Schema.Types.ObjectId,
    allowToshow: Boolean,
    tags: [ Schema.Types.ObjectId ]
});

var Post = mongoose.model('post', postSchema, 'post'); 

function insert_post( dataObj, callback ){

    var newPost = new Post(dataObj);
    newPost.save(function (err) {
    if (err) return handleError(err);
      callback();
    });
};

function show_last_post( by ){
    
    Post.aggregate(
        [ 
            // Sorting pipeline
            { "$sort": { "createdAt": -1 } },
            // Optionally limit results
            { "$limit": 1 }
        ],
        function(err,result) {
            console.log(result)
        // Result is an array of documents
        }
    );
};
module.exports = {
    insert_post: insert_post,
    show_last_post: show_last_post
};