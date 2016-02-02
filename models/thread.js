var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var User = require("./user");
var Comment = require("./comment");

var ThreadSchema = mongoose.Schema({
  topic: String,
  title: String,
  body: String,
  // _comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  //  comment: [Comment.Schema],
  //  user: [User.Schema]

});

 ThreadSchema.plugin(timestamps);


module.exports = mongoose.model('Thread', ThreadSchema);