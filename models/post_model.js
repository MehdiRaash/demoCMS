var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/demoCMS');
var db = mongoose.connection;
 
var Schema = mongoose.Schema;
var postSchema = Schema({
    title: String,
    text: String,  
    createdAt: Date,
    whoCreated: Schema.ObjectId
});
var Post = mongoose.model('post', postSchema, 'post'); 

function getPost(){
    
}
module.exports = {

};