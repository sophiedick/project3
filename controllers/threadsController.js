// SD: Requiring Thread Model:
//var Thread = require("../models/thread");

// GET 

function home(req, res) {  
  res.render('index.ejs'); // { message: req.flash('errorMessage') });
}

module.exports = {
  home: home,
}

// function threadIndex(req, res){
//   Thread.find({}, function(err, users) {
//     if (err) return res.status(404).send(err);

//     res.status(200).send(users);
//   });
// }