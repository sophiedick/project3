var Comment = require("../models/comment");
var methodOverride = require('method-override');



function newComment(req, res) {  

  Comment.find({}, function(err, data){
    if (!err) {
      console.log("hello");
    }

  });

};


module.exports = {
  newComment: newComment
  }