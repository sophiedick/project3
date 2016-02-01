// SD: Requiring Thread Model:
var Thread = require("../models/thread");
var methodOverride = require('method-override');

// GET 

function home(req, res) {  
  res.render('index.ejs'); // { message: req.flash('errorMessage') });
};

function category(req, res) {
  res.render('category.ejs');
};

/* POST NEW THREAD */
function createThread(req, res) {
  var thread = new Thread(req.body.thread);
  thread.save(function(err, thread){
    if (err) res.status(500).send(err);
    res.status(201).send(thread);
    res.render('category.ejs')
  });
};

/* GET THREAD INDEX */
function threadIndex(req, res){
  Thread.find(function(err, threads){
    if (err) return res.status(404).json({ message: 'Something went wrong'});
    res.status(200).json({ threads: threads });
    res.render('category.ejs');
  });
};


/* SHOW SINGLE THREAD */
function showThread(req, res){
  var id = req.params.id;
  Thread.findById({_id: id}, function(err, thread){
    if(err) res.json({message: 'Could not find thread because:' + err});
    var thread2 = thread
    res.render('single',{ thread: thread})
  });
};

/* But wait - where's the editThread function? */
// Edit thread form will be implemented with jQuery and Ajax in place - CB


/* UPDATE THREAD */
function updateThread(req, res){
  var id = req.params.id;
  console.log(id)
  console.log("** Before Saving: **")
  console.log(req.body.threadTopic)
  console.log(req.body.threadTitle)
  console.log(req.body.threadBody)

//  Thread.findByIdAndUpdate({ _id: id }, req.body.thread, function(err, thread){
//    if (err) return res.status(500).send(err);
//    if (!thread) return res.status(404).send(err);
//    res.status(200).send(thread);
//  });

  Thread.findByIdAndUpdate({_id: id}, { topic: req.body.threadTopic, title: req.body.threadTitle, body: req.body.threadBody }, function(err, thread){

    console.log("***** After Saving: *****")
    console.log(req.body.threadTopic)
    console.log(req.body.threadTitle)
    console.log(req.body.threadBody)
    console.log("This is the id: " + id)
 
    if (err) return res.status(404).json({ message: 'Something went wrong trying to update thread.'});
  //  if (req.body.topic) thread.topic = req.body.topic;
  //  if (req.body.title) thread.title = req.body.title;
  //  if (req.body.body)  thread.body  = req.body.body;
  //  thread.modifiedAt = Date.now;   // This updates the moifiedAt column to current time
  //  
//
  //  thread.save(function(err){
  //    console.log("Is this here?")
  //    if (err) res.status(400).json({ message: 'Could not update thread because: ' + err });
  //    res.send("Success");
  //    // res.json({ message: 'Thread successfully updated.' });
  //  });
    });
};

/* DELETE THREAD */
function deleteThread(req, res){
  var id = req.params.id;

  Thread.remove({_id: id}, function(err, thread){
    if (err) res.json({ message: 'Could not delete thread because: ' + err});
    res.json({ message: 'Thread successfully deleted'})
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
  category:     category,
  createThread: createThread,
  threadIndex:  threadIndex,
  updateThread: updateThread,
  showThread:   showThread,
  deleteThread: deleteThread,
}

