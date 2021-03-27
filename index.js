const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      expressSanitizer = require("express-sanitizer"),
      favicon = require("serve-favicon"),
      mongoose = require("mongoose");

// requiring routes
const indexRoutes = require("./routes/index"),
      demoRoutes = require("./routes/demos");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(favicon(__dirname + "/public/images/favicon.ico"));
mongoose.connect("mongodb://localhost:27017/cs-listen", {useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true});

app.use("/demos", demoRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.info("The CS Listen server has started.");
});
