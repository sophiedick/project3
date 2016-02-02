var passport = require("passport");
var User     = require('../models/user');
var secret   = require('../config/config').secret 
var jwt      = require('jsonwebtoken');

function register(req, res, next) {

  var localStrategy = passport.authenticate('local-signup', function(err, user, info) {
    if (err) return res.status(500).json({ message: 'Something went wrong with localStrategy in authentications controller!' });
    console.log(err + "this is the error") // is printing null
    console.log(user + "this be the user") //is printing false hence the next line
    console.log(info)
    if (info) return res.status(401).json({ message: info.message });
    if (!user) return res.status(401).json({ message: 'User already exists!' });
    console.log("authenticated")
    // User has authenticated so issue token 
    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });
    
    // Send back the token to the front-end to store
    return res.status(200).json({ 
      success: true,
      message: "Thank you for authenticating",
      token: token,
      user: user
    });
  });

  console.log(req.body)

  return localStrategy(req, res, next);
};



function login(req, res, next) {
  User.findOne({
    "email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'No user found.' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Authentication failed. Wrong password.' });

    var token = jwt.sign(user, secret, { expiresIn: 10440 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token
    });
  });
};

module.exports = {
  login: login,
  register: register
}