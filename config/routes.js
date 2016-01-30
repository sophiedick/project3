// This is empty and needs filling - Caroline
var express           = require('express');
var router            = express.Router();
var passport          = require("passport");
var usersController   = require('../controllers/usersController');
var threadsController = require('../controllers/threadsController');
var commentsController = require('../controllers/commentsController')
// MIDDLEWARE FUNCTION TO CHECK FOR USER LOGGED IN STATUS
//function authenticatedUser(req, res, next) {
//  // If the user is authenticated, then we can continue with next
//  // https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
//  if (req.isAuthenticated()) return next();
//
//  // Otherwise
//  req.flash('errorMessage', 'Login to access!');
//  return res.redirect('/login');
//}
//
//// MIDDLEWARE FUNCTION TO REDIRECT IF USER TRIES TO LOG IN OR SIGN UP AGAIN
//function unAuthenticatedUser(req, res, next) {
//  if (!req.isAuthenticated()) return next();
//
//  // Otherwise
//  req.flash('errorMessage', 'You are already logged in!');
//  return res.redirect('/');
//}

// make root route
router.route('/')
  .get(threadsController.home);

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
module.exports = router//