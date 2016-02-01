var express           = require('express');
var router            = express.Router();
//var passport          = require("passport");
var usersController   = require('../controllers/usersController');
//var threadsController = require('../controllers/threadsController');
//var commentsController = require('../controllers/commentsController')

//// make root route
//router.route('/')
// // .get(threadsController.home);
// 	.post(usersController.usersCreate);

 
router.route('/users')
	.get(usersController.getAll)
	.post(usersController.createUser)

router.route('/users/new')
 	.get(usersController.userSignUp);
 	//.get(usersController.indexPage)


router.route('/users/:id/edit')
	.get(usersController.editUser)

router.route('/users/:id') 
	 .get(usersController.userShow)
	// .put(usersController.userUpdate)
//	 .delete(usersController.userDelete)
//
//router.route('/category')
//  .get(threadsController.category)
//
//router.route('/api/category')
//  .get(threadsController.threadIndex)
//  .post(threadsController.createThread)
//

//router.route('/signup')
//  .get(unAuthenticatedUser, usersController.getSignup)
//  .post(usersController.postSignup)
//
//// We can call a function before calling the controller to make sure the user is not logged in by passing in two functions
//router.route('/login')
//  .get(unAuthenticatedUser, usersController.getLogin)
//  .post(usersController.postLogin)
//
//router.route("/logout")
//  .get(usersController.getLogout)
//
//
//// We can call a function before calling the controller to see if the user is logged in by passing in two functions
//router.route("/secret")
//  .get(authenticatedUser, usersController.getSecret)
//
module.exports = router;