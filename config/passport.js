// This is empty and needs filling - Caroline
var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
  	console.log("*******************************************")

    // Find a user with this email
    User.findOne({ email : email }, function(err, user) {
      console.log("loking for a user........." + user)
      if (err) return done(err, false, { message: "Something went wrong with passport strategy in passport.js." });

      // No error but already a user registered
      if (user) return done(null, false, { message: "Please choose another email." });
      console.log(email + " " + password)
      var newUser            = new User();
      //console.log(req.body) // is coming out
      //newUser.username = username;
      newUser.email    = email;
      console.log(newUser.email) // is coming out as email
      //newUser.username = req.body.user.username;
      newUser.password = User.encrypt(password);
      console.log(newUser.password) // is making password and encrypting it

      newUser.save(function(err, newUser) {
      	console.log(newUser.id) // is printing new user
      	console.log(newUser.username)
      	console.log(err + "this is the error") // dup key: { : null }this is the error
      	console.log("this is the user" + newUser) // user is undefined

      	// is erroring here
        // Error found
        if (err) return done(err, false, { message: "Something went wrong." });
        // New user created
        return done(null, newUser);
      });
    });
  }));
  
}

