var mongoose = require('mongoose');

var User = require("./user");
var Comment = require("./comment");

var ThreadSchema = mongoose.Schema({
  title: String,
  body: String,
  comment: [Comment.Schema],
  user: [User.Schema]

});


module.exports = mongoose.model('Thread', ThreadSchema);