const passport = require("passport"),
      LocalStrategy = require("passport-local"),
      credentials = require("./credentials"),
      User = require("../models/user");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) console.error(err);
    if (err || !user) return done(null, false);
    user.checkPassword(password, function(err, isMatch) {
      if (isMatch) done(null, user);
      else done(null, false);
    });
  });
}));
