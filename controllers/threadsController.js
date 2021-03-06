// SD: Requiring Thread Model:
var Thread = require("../models/thread");
var methodOverride = require('method-override');
var moment = require('moment');
var topicsArray = ["tech", "business", "showbiz", "culture", "lifestyle", "world"];


// GET 
function home(req, res) {  
  res.render('index.ejs'); // { message: req.flash('errorMessage') });
};

/*  TOPIC INDEX url: localhost:3000/:category  */

function topicIndex(req, res) {
  var topic = req.params.category;
  var stuff = Thread.find({topic: topic}, function(err, data){
  var updatedAt = req.body.updatedAt;
   console.log(moment(updatedAt).fromNow()); // Will always be 'a few seconds ago'


   res.render('category.ejs', {threads: data, category: topic, moment: moment, currentUser: global.currentUser });
  });
   stuff.sort({'updatedAt': -1})
};

// Thread.findOne({_id: id})
//     .lean()
//     .populate({ path: 'comments' })
//     .exec(function(err, docs) {

//       var options = {
//         path: 'comments.user',
//         model: 'User'
//       };

//       if (err) return res.json(500);
//       Thread.populate(docs, options, function (err, threads) {
//         console.log(threads);
//         res.render('single', {thread: threads, currentUser: global.currentUser});
//         //res.send(threads);
//       });
//     });








/* POST NEW THREAD */
function createThread(req, res) {
  console.log(req.body.userID);

  var thread = new Thread ({
    title: req.body.title,
    topic: req.body.topic, 
    body: req.body.body,
    _user: req.body.userID 
    });

    thread.save(function(error, thread){
    if(error) console.log(error);

    Thread.findOne({_id: thread._id })
    .populate('user')
    .exec(function(err, popThread){
      if (err) console.log(err);
      console.log(popThread);
      res.send(popThread);
    })
    
  });
};



/* GET THREAD INDEX */
function threadIndex(req, res){
  Thread.find(function(err, threads){
    if (err) return res.status(404).json({ message: 'Something went wrong'});
    res.status(200).json({ threads: threads });
    res.render('category.ejs');
  })
};


/* SHOW SINGLE THREAD */
function showThread(req, res){

  var id = req.params.id;
  Thread.findOne({_id: id})
      .lean()
      .populate({ path: 'comments' })
      .exec(function(err, docs) {

        var options = {
          path: 'comments.user',
          model: 'User'
        };

        if (err) return res.json(500);
        Thread.populate(docs, options, function (err, threads) {
          console.log(threads);
          res.render('single', {thread: threads, currentUser: global.currentUser});
          //res.send(threads);
        });
      });


  //   res.render('single',{ thread: thread[0]});
  // })
};

/* But wait - where's the editThread function? */
// Edit thread form will be implemented with jQuery and Ajax in place - CB


/* UPDATE THREAD */
function updateThread(req, res){
  var id = req.params.id;
  console.log(id); // Checking it works 

  Thread.findByIdAndUpdate({_id: id}, { topic: req.body.threadTopic, title: req.body.threadTitle, body: req.body.threadBody, modifiedAt: req.body.threadModifiedAt }, {new: true}, function(err, thread){

    console.log("****")
    console.log(req.body.threadModifiedAt)

  //  console.log("***** After Saving: *****")
  //  console.log(req.body.threadTopic)
  //  console.log(req.body.threadTitle)
  //  console.log(req.body.threadBody)
  //  console.log("This is the id: " + id)
 
    if (err) {
      return res.status(404).json({ message: 'Something went wrong trying to update thread.'})
    } else {
      res.status(200).send(thread);
    }
    
  });
};

/* DELETE THREAD */
function deleteThread(req, res){
  var id = req.params.id;


  Thread.remove({_id: id}, function(err, thread){
    if (err) res.json({ message: 'Could not delete thread because: ' + err});
    console.log(thread);
    res.redirect('/');
    res.json({ message: 'Thread successfully deleted'});
    
  });
};


//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 
//HAVE YOU EXPORTED????? //HAVE YOU EXPORTED????? 


module.exports = {
  home:         home,
  topicIndex:   topicIndex,
  createThread: createThread,
  threadIndex:  threadIndex,
  updateThread: updateThread,
  showThread:   showThread,
  deleteThread: deleteThread,
}
