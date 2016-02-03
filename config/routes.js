var express           = require('express');
var router            = express.Router();
var passport          = require("passport");

var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
var commentsController = require('../controllers/commentsController')
var authenticationsController = require('../controllers/authenticationsController');


//// make root route
// router.route('/')
//   .get(threadsController.home);
	//.post(usersController.usersCreate);

//************** USER ROUTES (ANGUS) ***********************

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);
 
// will now be handled by register
router.route('/signup')
  .get(usersController.userSignUp);
 
router.route('/loginform')
  .get(usersController.userLogin);

router.route('/users/:id') 
 .get(usersController.userShow)
 .put(usersController.userUpdate)
 .delete(usersController.userDelete)

router.route('/users/:id/edit')
  .get(usersController.editUser)

// router.route('/users')
//   .get(usersController.getAll)


//******************* THREAD CONTROLLER (SOPHIE AND CAROLINE) ********************


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


router.route('/api/category')
  .get(threadsController.threadIndex)
  .post(threadsController.createThread)

router.route('/api/category/:id')
  .put(threadsController.updateThread)
  .delete(threadsController.deleteThread);


 //******************* COMMENT CONTROLLER (SOPHIE AND CAROLINE) ********************


router.route('/newcomment')
   .get(commentsController.newComment)

router.route('/api/category/:id/newcomment') 
   .post(commentsController.newComment)

router.route('/api/category/:id/comment/:_id')
   .put(commentsController.editComment)
   .put(commentsController.updateComment)
   .delete(commentsController.deleteComment);

/* ******** ROOT *********** */
 router.route('/')
   .get(threadsController.home);


// *************** EXPORT *********************
module.exports = router;







