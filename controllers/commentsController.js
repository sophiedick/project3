var Comment = require("../models/comment");
var Thread = require("../models/thread");
var methodOverride = require('method-override');


/* NEW COMMENT */ 
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

/* EDIT COMMENT */ 
 function editComment(req, res) { 
   var commentId = req.params._id;
   console.log(commentId);

   Comment.findByIdAndUpdate({_id: commentId}, { body: req.body.comment.body }, {new: true}, function(err, comment) {
     if (err) {
       return res.status(404).json({ message: 'Something went wrong trying to update thread.'})
     } else {
       res.status(200).send(comment);
     }
   });
 }

function updateComment(req, res) { 
  var commentId = req.params._id;
  console.log("hello!!!");
  console.log(commentId);

  console.log(req.body.body);


  Comment.findByIdAndUpdate({_id: commentId}, { body: req.body.body }, {new: true}, function(err, comment) {
    if (err) {
      return res.status(404).json({ message: 'Something went wrong trying to update thread.'})
    } else {
      res.status(200).send(comment);
    }
  });
}






module.exports = {
  newComment: newComment,
  editComment: editComment,
  updateComment: updateComment
  }