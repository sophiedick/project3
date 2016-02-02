var Comment = require("../models/comment");
var Thread = require("../models/thread");

var methodOverride = require('method-override');


function newComment(req, res) {
  console.log(req.params)
  var threadId = req.params.id;
  // console.log(threadId);

  Thread.findById(threadId, function(error, thread){

    var comment = new Comment({
      body: req.body.body, 
      thread_id: threadId 
      //user:
    });

    comment.save(function(err, comment){
      if (err) {
        res.status(500).send(err);
      }else {
        thread.comments.push(comment);
        thread.save(function(err, thread){
          if(err) {
            console.log(err);
          }else{
          res.status(200).send(thread);
          //res.render('single.ejs')
          }
        });
      };
    });
  })
};



// HAVE YOU EXPORTED????????


module.exports = {
  newComment: newComment
  }

 