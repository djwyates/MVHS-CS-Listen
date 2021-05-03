const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      expressSanitizer = require("express-sanitizer"),
      favicon = require("serve-favicon"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      expressSession = require("express-session"),
      credentials = require("./config/credentials");

// requiring routes
const indexRoutes = require("./routes/index"),
      demoRoutes = require("./routes/demos"),
      faqRoutes = require("./routes/faq");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/cs-listen", {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});
app.use(expressSession({secret: credentials.sessionSecret, resave: false, saveUninitialized: false, cookie: {maxAge: 3*24*60*60*1000}}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport-setup");
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.query = req.query;
  next();
});

User.create({username: "dyates", password: "dyates", email: "djfallbrookca@gmail.com", emailNotifsOn: true, isAdmin: true}, function(err, created){});

app.use("/faq", faqRoutes);
app.use("/demos", demoRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.info("The CS Listen server has started.");
});
