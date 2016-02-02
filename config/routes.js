var express           = require('express');
var router            = express.Router();
var passport          = require("passport");

var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
var commentsController = require('../controllers/commentsController')
var authenticationsController = require('../controllers/authenticationsController');
//var staticsController = require('../controllers/staticsController');

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next(); 
  res.redirect('/unauth');                        
}
//// make root route
router.route('/')
 .get(threadsController.home);

//router.route('/unauth')
//  .get(staticsController.noAccess)
//************** USER ROUTES (ANGUS) ***********************

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

// will now be handled by register
router.route('/signup')
  .get(usersController.userSignUp);

router.route('/users/:id') 
 .get(usersController.userShow)
 .put(usersController.userUpdate)
 .delete(usersController.userDelete)

router.route('/users/:id/edit')
  .get(usersController.editUser)



//******************* THREAD CONTROLLER (SOPHIE AND CAROLINE) ********************


router.route('/users')
	.get(usersController.getAll)

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

//router.route('/category/:id')
//  .get(threadsController.showThread)

router.route('/api/category')
  .get(threadsController.threadIndex)
  .post(threadsController.createThread)

router.route('/api/category/:id')
   .put(threadsController.updateThread)
   .delete(threadsController.deleteThread);
  
 //********* COMMENT ROUTES (SOPHIE)*********

router.route('/newcomment')
   .get(commentsController.newComment)

router.route('/api/category/:id/newcomment') 
   .post(commentsController.newComment)



// *************** EXPORT *********************
module.exports = router;