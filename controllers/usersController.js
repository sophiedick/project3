// AI error statuses
// 200 = the server has responded and all is ok
// 404 = page not found
// 500 = internal error on the server
var User = require('../models/user');

/////////////PLAN//////////////////////////
// Problem1: need user to be able to create an account
// -A-need a URL address for client Signup page
// -- need to make a localhost - ie a server that can receive a GET request - HTTP server
// -- done in app.js - app.listen(3000),  
// --- GET request should render the page with form 
// ---- requires route to handle request and match to action
// ---- need controller with action to render form - getSignup
// -----------------DONE -----------------------
// Problem2: Form not submitting to anywhere
// - need storage space to post to
// -- data structure needed - created in model
// -- need to create new instance of model each time
// -- need to pass data from form into mongoose.Schema for creation
// --- HOW to check what data is being submitted - console.log(req.body)
//----- nothing coming out in console- form isnt submitting but is routing to right place
// --- need to require model in here to utilise its schema/data-structure
// -- is console.logging out but now stuck in infinite loop 
// -- is not saving - otherwise would have sent 'success'
//////////////////////
// ACTION ON FORM IS KEY 
//////////////
// -- redirect elsewhere
// -- make additional view
// --- POST request will create a user
//- need a form to register details
// -- write in views
// --- where will this view be accessible - on index page - later for ajax slide down
//- need a data structure to contain this information
// -- written in model: username, email password
// -- need some data to be unique - written in model - unique: true, required: true
//- data needs to be stored over time
// 
// Problem2: need user to be able to login


///////////////////////////////////////////

//.populate explained (sort-of): http://davestewart.io/resources/javascript/jQuery/demos/populate-demo.html
//var User = require("../models/user");


function getAll(request, response){
  User.find({}, function(err, users) {
    if (err) return response.status(404).send(err);

    response.render('index', {users: users})
  });
}

//////////////////////////////////////////
// render userSignUp page
function userSignUp(req, res){
	res.render('signup')
};
///////////////////////////////////////////
// AI function to create user
function createUser(request, response){
  // create user with new instance of User model. Schema is populated by request on body.user
  // this will count as one request.body not 3
	var newUser = new User({
		username: request.body.user.username,
		email: request.body.user.email,
		password: request.body.user.password
	});

	console.log(newUser); //object is coming out
	newUser.save(function(error) {
	  if(error) console.log('user not saved' + error)
	});
	// must be outside error function
	response.redirect('/users');
}
//////////////////////////////////////////////////////////
function editUser(request, response){
	  var id = request.params.id;

	  User.findById(id, function(error, user) {
	    if(error) console.log(error)

	    response.render('editUser', {"user": user});
	  });
	}

//////////////////////////////////////////////////////////
//// AI function to show User profile
function userShow(req, res){
//  // select user particular to input URL
  var id = req.params.id;
//
  // find by ID 
//  //populate users comments (corresponding to comments in users model)
//  // error check and send user data on success
  User.findById({ _id: id }).exec(function(err, user) {
//    //include error messages
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
//
//    // if all ok then send user data in json
    //res.status(200).send(user);
    res.render('showUser', {"user": user})
  })
}
//// AI edit profile
//function userUpdate(req, res){
//  var id = req.params.id;
//  //mongoose command
//  //Model.findByIdAndUpdate(id, [update], [options], [callback])
//  // {new: true} - cannot claim i understand this part
//  User.findByIdAndUpdate({ _id: id }, req.body.user, {new: true}, function(err, user){
//    if (err) return res.status(500).send(err);
//    if (!user) return res.status(404).send(err);
//    res.status(200).send(user);
//  })
//};
//
//// AI delete their profile
//function userDelete(req, res){
//  var id = req.params.id;
//  //find by id and remove 
//  User.remove({ _id: id }, function(err) {
//    if (err) return res.status(500).send(err);
//    res.status(200).send()
//  })
//}

//// AI: make all actions available in scope
module.exports = {	
	getAll : getAll,
	userSignUp : userSignUp,
	//usersIndex: usersIndex,

	createUser: createUser,
	//indexPage: indexPage
	userShow:   userShow,
	editUser: editUser,
	//userUpdate: userUpdate,
////  usersDelete: usersDelete,
};