const passport = require("passport"),
      LocalStrategy = require("passport-local"),
      bcrypt = require("bcrypt"),
      credentials = require("./credentials");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  bcrypt.compare(password, credentials.adminPassword, function(err, isCorrectPassword) {
    if (username.toLowerCase() == "admin" && isCorrectPassword) return done(null, {isAdmin: true});
    else return done(null, false);
  });
}));
