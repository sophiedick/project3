var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var timestamps = require('mongoose-timestamp');


var User = require("./user");
var Comment = require("./comment");

var ThreadSchema = mongoose.Schema({
  topic: String,
  title: String,
  body: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],  
  _user:{ type: Schema.Types.ObjectId, ref: 'User' }

});

ThreadSchema.plugin(timestamps);

module.exports = mongoose.model('Thread', ThreadSchema);