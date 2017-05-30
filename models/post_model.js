var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demoCMS');
var db = mongoose.connection;
 

var postSchema = mongoose.Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated: ObjectId
});
var Post = mongoose.model('post', postSchema, 'post'); 

module.exports = {

};