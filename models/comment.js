var mongoose = require('mongoose');

var User = require("./user");

var CommentSchema = mongoose.Schema({
  body: String,
  thread_id: String,
  user: [User.schema]
});


module.exports = mongoose.model('Comment', CommentSchema);