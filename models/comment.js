var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = require("./user");
var Thread = require("./thread");

var CommentSchema = mongoose.Schema({
  body: String,
  thread_id: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  thread: { type: Schema.Types.ObjectId, ref: 'Thread' }
});


module.exports = mongoose.model('Comment', CommentSchema);