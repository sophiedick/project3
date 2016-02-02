var Comment = require("../models/comment");
var Thread = require("../models/thread");
var methodOverride = require('method-override');



function newComment(req, res) {  
  var threadId = req.params.id;
  console.log(threadId);
  Thread.findById(threadId, function(error, thread){

    if(error){
      console.log(error);
    } 

    var comment = new Comment ({

      body: req.body.comments.body,
      thread_id: threadId
      //user: 
    });
    comment.save(function(error){ if(error) console.log(error) });
    thread.save()
    thread.comments.push(comment);
    console.log(comment);
    res.send(comment);

  });
}



module.exports = {
  newComment: newComment
  }