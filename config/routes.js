var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
//var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
//var commentsController = require('../controllers/commentsController')


// make root route
router.route('/')
  .get(threadsController.home);

module.exports = router