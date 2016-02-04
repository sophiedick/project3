var Comment        = require("../models/comment");
var Thread         = require("../models/thread");
var User        = require("../models/user");
var methodOverride = require('method-override');


/* NEW COMMENT */ 
function newComment(req, res) {  
  var threadId = req.params.id;

  // console.log(threadId);
  Thread.findById(threadId, function(error, thread){

    if(error){
      console.log(error);
    } 
  
    // console.log('body:     ' + req.body.userID)
    var comment = new Comment ({

      body: req.body.theComment,
      thread_id: threadId,
      user: req.body.userID 
    });
    comment.save(function(error){ 
      if(error) console.log(error) 

      Comment.findOne({_id: comment._id})
        .populate('user')
        .exec(function(err, popComment){
          if(err) console.log(err);
          console.log(popComment);
          res.send(popComment);
        });
      })
      thread.save()
      thread.comments.push(comment);
    })
  };


/* SHOW COMMENT */ 
function showComment(req, res){

  var id = req.params.id;
  Comment.findById({_id: id}, function(err, comment){
    if(err) res.json({message: 'Could not find thread because:' + err});
    console.log(comment);

    Comment.findOne({_id: comment._id})
      .populate('user')
      .exec(function(err, popComment){
        if(err) console.log(err);
        console.log(popComment);
        res.send(popComment);
      });
    });
  };

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
// function deleteComment(req, res){
//   var commentId = req.params._id;
//   var threadId = req.params.id;
//   var topic = req.body;
//   // console.log(commentId);
//   // console.log(threadId);
//   // console.log(topic);
//   // var topic2 = topic.value;
//   // console.log(topic2);

//   Thread.findById(threadId, function(err, thread){
//     var topic = thread.topic;
//     console.log(thread);
//     Comment.findById(commentId, function(err, comment){
//       console.log(comment);
//       comment.remove();
//       res.redirect("/" + topic + "/" + threadId);
//     })
    
//     })
  function deleteComment(req, res){
    var id = req.params._id;

    Comment.remove({ _id: id }, function(err) {
      if (err) return res.status(500).send(err);
      res.status(200).send()
    })
  }
    




module.exports = {
  newComment: newComment,
  editComment: editComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
  showComment: showComment
  }