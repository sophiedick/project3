var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
<<<<<<< HEAD
//var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
var commentsController = require('../controllers/commentsController')
=======
var usersController   = require('../controllers/usersController');
//var threadsController = require('../controllers/threadsController');
//var commentsController = require('../controllers/commentsController')
var authenticationsController = require('../controllers/authenticationsController');
>>>>>>> c69e00a987eba829ac384255493f166414858c52

//// make root route
//router.route('/')
// // .get(threadsController.home);
// 	.post(usersController.usersCreate);

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);
 
router.route('/users')
	.get(usersController.getAll)
//	.post(usersController.createUser) //is now being handled by authenticationController register

<<<<<<< HEAD
router.route('/:category')
  .get(threadsController.topicIndex);

// router.route('/:category/:id')
//   .get(threadsController.showThread)

router.route('/:category')
  .get(threadsController.topicIndex);


router.route('/tech/:id')
  .get(threadsController.showThread)

router.route('/business/:id')
  .get(threadsController.showThread)

router.route('/showbiz/:id')
  .get(threadsController.showThread)

router.route('/culture/:id')
  .get(threadsController.showThread)

router.route('/lifestyle/:id')
  .get(threadsController.showThread)

router.route('/world/:id')
  .get(threadsController.showThread)
=======
// will now be handled by register
router.route('/signup')
 	.get(usersController.userSignUp);
>>>>>>> c69e00a987eba829ac384255493f166414858c52

router.route('/users/:id/edit')
	.get(usersController.editUser)

<<<<<<< HEAD
router.route('/api/category/:id')
  .put(threadsController.updateThread)
  .delete(threadsController.deleteThread);


  
 //********* COMMENT ROUTES *********

router.route('/newcomment')
   .get(commentsController.newComment)

router.route('/api/category/:id/newcomment') 
   .post(commentsController.newComment)



=======
router.route('/users/:id') 
	 .get(usersController.userShow)
	 .put(usersController.userUpdate)
	 .delete(usersController.userDelete)
//
//router.route('/category')
//  .get(threadsController.category)
//
//router.route('/api/category')
//  .get(threadsController.threadIndex)
//  .post(threadsController.createThread)
//
>>>>>>> c69e00a987eba829ac384255493f166414858c52

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