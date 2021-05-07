const mongoose = require("mongoose"),
      bcrypt = require("bcrypt"),
      shortid = require("shortid"),
      email = require("../services/email"),
      credentials = require("../config/credentials");

var userSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  username: {type: String, minLength: 3, maxLength: 30, unique: true, required: true},
  password: {type: String, required: true},
  email: {type: String, maxLength: 320, unique: true, required: true},
  emailNotifsOn: {type: Boolean, required: true, default: true},
  emailIsVerified: {type: Boolean, required: true, default: false},
  emailVerificationCode: {type: String, required: false},
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

userSchema.methods.checkPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, callback);
}

userSchema.methods.sendVerificationEmail = function() {
  if (!this.emailVerificationCode) return;
  email.send(this.email, "CS-Listen: Verify Your Email", "To verify your email with the MVHS CS-Listen website, click here: "
  + credentials.siteURL + "/users/verify-email/" + this.emailVerificationCode);
}

module.exports = mongoose.model("User", userSchema);
