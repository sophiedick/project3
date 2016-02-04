var mongoose = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;

var Comment = require("./comment");
var Thread = require("./thread");

var userSchema = new mongoose.Schema({ 
  //local: {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: {type: String },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
    threads: { type: Schema.Types.ObjectId, ref: 'Thread' }
   // location: { type: String }
  //}
});
//

//PASSPORT AUTHENTICATION
userSchema.statics.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);