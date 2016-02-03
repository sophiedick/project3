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

/* DELETE COMMENT */
function deleteComment(req, res){
  var commentId = req.params._id;
  var threadId = req.params.id;
  var topic = req.body;
  // console.log(commentId);
  // console.log(threadId);
  // console.log(topic);
  // var topic2 = topic.value;
  // console.log(topic2);

  Thread.findById(threadId, function(err, thread){
    var topic = thread.topic;
    console.log(thread);
    Comment.findById(commentId, function(err, comment){
      console.log(comment);
      comment.remove();
      res.redirect("/" + topic + "/" + threadId);
    })
    
    })
    // if (err) res.json({ message: 'Could not delete thread because: ' + err});
    // res.redirect("/topic/threadId");
    // res.json({ message: 'Comment successfully deleted'});
    
};




module.exports = {
  newComment: newComment,
  editComment: editComment,
  updateComment: updateComment,
  deleteComment: deleteComment
  }