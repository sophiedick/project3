var mongoose = require('mongoose');

var User = require("./user");
var Comment = require("./comment");

var ThreadSchema = mongoose.Schema({
  topic: String,
  title: String,
  body: String,
  //Using to create time created and time when modified:
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
//  comment: [Comment.Schema],
//  user: [User.Schema]

});


module.exports = mongoose.model('Thread', ThreadSchema);