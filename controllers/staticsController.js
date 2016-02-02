// GET /
function home(req, res) {  
  res.render('index.ejs');
}

function noAccess(req,res){
  res.render('unauth.ejs', {message: 'Sorry, You have to be logged in to view this page!'})
}

module.exports = {
  home: home,
  noAccess: noAccess
}