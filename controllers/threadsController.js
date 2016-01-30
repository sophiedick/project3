 // SD: Requiring Thread Model:
var Thread = require("../models/thread");

// GET 

function home(req, res) {  
  res.render('index.ejs'); // { message: req.flash('errorMessage') });
}

function category(req, res) {
  res.render('category.ejs');
}

function createThread(req, res) {
  var thread = new Thread(req.body.thread);
  thread.save(function(err, thread){
    if (err) res.status(500).send(err);
    res.status(201).send(thread);
    res.render('category.ejs')
  });
}

function threadIndex(req, res){
  Thread.find(function(err, threads){
    if (err) return res,status(404).json({message: 'Something went wrong'});
    res.status(200).json({ threads: threads });
    res.render('category.ejs');
  })
}

//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????
//HAVE YOU EXPORTED?????

module.exports = {
  home:         home,
  category:     category,
  createThread: createThread,
  threadIndex:  threadIndex
}

