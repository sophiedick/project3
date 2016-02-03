var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, function(req, email, password, done) {
      //console.log("*******************************************")

    // Find a user with this email
    User.findOne({ email : email }, function(err, user) {
      if (err) return done(err, false, { message: "Something went wrong with passport strategy in passport.js." });

      // if no error but already a user registered
      if (user) return done(null, false, { message: "Please choose another email." });
      var newUser            = new User();
      console.log(req.body);
      console.log(user);
      newUser.username = req.body.username;
      newUser.email    = email;
      newUser.password = User.encrypt(password);
      newUser.avatar   = req.body.avatar;

      newUser.save(function(err, newUser) {
      
        // Error found
        if (err) return done(err, false, { message: "Something went wrong." });
        // New user created
        return done(null, newUser);
      });
    });
  }));
  
}