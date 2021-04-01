const express = require("express"),
      router = express.Router(),
      Demo = require("../models/demo");

router.get("/", function(req, res) {
  Demo.find({}, function(err, demos) {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    res.render("demos/index", {demos: demos});
  });
});

router.get("/new", function(req, res) {
  res.render("demos/new");
});

router.post("/", function(req, res) {
  var newDemo = {
    category: req.sanitize(req.body.category).trim(),
    title: req.sanitize(req.body.title).trim(),
    subtitle: req.sanitize(req.body.subtitle).trim(),
    description: req.sanitize(req.body.description).trim(),
    tags: req.sanitize(req.body.tags).trim().split(","),
    imageFileName: req.sanitize(req.body.imageFileName).trim(),
    videoID: req.sanitize(req.body.videoID).trim()
  };
  Demo.create(newDemo, function(err, demo) {
    if (err) console.error(err);
    res.redirect("/demos/" + demo._id);
  });
});

router.get("/:id", function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (err) {
      console.error(err);
      return res.redirect("/demos");
    }
    if (!demo) return res.redirect("/demos");
    res.render("demos/show", {demo: demo});
  });
});

module.exports = router;
