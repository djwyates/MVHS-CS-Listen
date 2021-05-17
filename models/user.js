const mongoose = require("mongoose"),
      bcrypt = require("bcrypt"),
      shortid = require("shortid"),
      email = require("../services/email"),
      utils = require("../services/utils"),
      credentials = require("../config/credentials");

var userSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  username: {type: String, minLength: 3, maxLength: 30, unique: true, required: true},
  password: {type: String, required: true},
  email: {type: String, maxLength: 320, unique: true, required: true},
  emailNotifsOn: {type: Boolean, required: true, default: true},
  emailIsVerified: {type: Boolean, required: true, default: false},
  emailVerificationCode: {type: String, required: false},
  emailVerificationSentOn: {type: String, required: false},
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

userSchema.pre("findOneAndUpdate", function(next) {
  var user = this.getUpdate();
  if (!user.password) return next();
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function(guess, callback) {
  bcrypt.compare(guess, this.password, callback);
}

userSchema.methods.sendVerificationEmail = function(options) {
  if (!this.emailVerificationCode) return "error: no verification code found";
  options = options || {};
  if (this.emailVerificationSentOn && !options.overrideTimeout) {
    var currentDate = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}).replace(/\//g, "-"));
    var sentOn = new Date(this.emailVerificationSentOn);
    var timeoutEndDate = new Date(sentOn.setDate(sentOn.getDate() + 1));
    if (currentDate < timeoutEndDate) return utils.reformatDate(timeoutEndDate.toLocaleString()) + " at "
    + timeoutEndDate.toLocaleString().split(" ")[1] + " " + timeoutEndDate.toLocaleString().split(" ")[2];
  }
  email.send(this.email, "CS-Listen: Verify Your Email", "To verify your email with the MVHS CS-Listen website, click here: "
  + credentials.siteURL + "/users/verify-email/" + this.emailVerificationCode);
  this.emailVerificationSentOn = utils.getCurrentDate();
  this.save();
  return "success";
}

module.exports = mongoose.model("User", userSchema);
