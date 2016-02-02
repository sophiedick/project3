var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
var commentsController = require('../controllers/commentsController')
var authenticationsController = require('../controllers/authenticationsController');

//// make root route
//router.route('/')
// // .get(threadsController.home);
// 	.post(usersController.usersCreate);

//******************* THREAD CONTROLLER (SOPHIE AND CAROLINE) ********************
 
router.route('/:category')
  .get(threadsController.topicIndex);

router.route('/api/category/:id')
  .put(threadsController.updateThread)
  .delete(threadsController.deleteThread);

router.route('/category/:id')
  .get(threadsController.showThread)


//************** USER ROUTES (ANGUS) ***********************

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);
 
router.route('/users')
  .get(usersController.getAll)
//  .post(usersController.createUser) //is now being handled by authenticationController register

// will now be handled by register
router.route('/signup')
  .get(usersController.userSignUp);

router.route('/users/:id') 
 .get(usersController.userShow)
 .put(usersController.userUpdate)
 .delete(usersController.userDelete)

router.route('/users/:id/edit')
  .get(usersController.editUser)



// *************** EXPORT *********************
module.exports = router;