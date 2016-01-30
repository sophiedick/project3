var mongoose = require('mongoose');

var User = require("./user");
var Thread = require("./thread");

var CommentSchema = mongoose.Schema({
  body: String,
  thread_id: String,
  user: [User.schema],
  //thread: [Thread.schema]
});


module.exports = mongoose.model('Comment', CommentSchema);