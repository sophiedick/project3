var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
//var commentsController = require('../controllers/commentsController')


// make root route
router.route('/')
  .get(threadsController.home);

router.route('/users')
   .get(usersController.usersIndex)
   .post(usersController.usersCreate)


router.route('/users/:id') 
   .get(usersController.usersShow)
//   .patch(usersController.usersUpdate)
//   .delete(usersController.usersDelete)

module.exports = router