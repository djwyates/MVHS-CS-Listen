const mongoose = require("mongoose"),
      bcrypt = require("bcrypt"),
      shortid = require("shortid");

var userSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  emailNotifsOn: {type: Boolean, required: true, default: true},
  isAdmin: {type: Boolean, required: true, default: true /* <-- so far only admins can login */}
});

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password = hash;
    next();
  });
});

userSchema.methods.checkPassword(function(guess, next) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    next(err, isMatch);
  });
});

module.exports = mongoose.model("User", userSchema);
