var Thread = require('../models/thread')
// GET 

function home(req, res) {  
  res.render('index.ejs'); //, { message: req.flash('errorMessage') });
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



module.exports = {
  home:         home,
  category:     category,
  createThread: createThread,
}