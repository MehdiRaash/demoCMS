var mongoose = require('mongoose'); 
var db = mongoose.connection;


var Schema = mongoose.Schema;

var tagSchema = Schema({
    name: String,
    number: Number,
    description: String,  
    createdAt: Date,
    whoCreated_Id: Schema.Types.ObjectId,
    allowToShow: Boolean 
});

var Tag = mongoose.model('tag', tagSchema, 'tag'); 

function getAllTags(arg, callback){

  Tag.find({}, function(tags){
    callback(tags);
  });
}

function insertNewTag(dataObj, callback){

  var newTag = new Tag(dataObj);
console.log(newTag);
  if(!newTag.createdAt){
    newTag.createdAt = Date.now();
  }
  if(typeof newTag.allowToShow === 'undefined'){
    newTag.allowToShow = false;
  }

  newTag.save(function(){
    callback();
  })
}

module.exports = {
    insertNewTag: insertNewTag 
};