const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      expressSanitizer = require("express-sanitizer"),
      favicon = require("serve-favicon"),
      methodOverride = require("method-override"),
      mongoose = require("mongoose");

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
app.use(function(req, res, next) {
  res.locals.query = req.query;
  next();
});

app.use("/faq", faqRoutes);
app.use("/demos", demoRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.info("The CS Listen server has started.");
});
