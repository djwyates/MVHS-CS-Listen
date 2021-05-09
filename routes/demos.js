const express = require("express"),
      router = express.Router(),
      auth = require("../middleware/auth"),
      Demo = require("../models/demo");

router.get("/", function(req, res) {
  Demo.find({}, function(err, demos) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving all demos");
      return res.redirect("/");
    }
    res.render("demos/index", {demos: demos});
  });
});

router.get("/new", auth.isAdmin, function(req, res) {
  res.render("demos/new");
});

router.post("/", auth.isAdmin, function(req, res) {
  var newDemo = {
    category: req.sanitize(req.body.category).trim(),
    title: req.sanitize(req.body.title).trim(),
    subtitle: req.sanitize(req.body.subtitle).trim(),
    description: req.sanitize(req.body.description).trim(),
    tags: req.body.tags ? req.sanitize(req.body.tags).split(",").map(t => t.trim()) : null,
    imageFileName: req.sanitize(req.body.imageFileName).trim(),
    videoID: req.sanitize(req.body.videoID).trim()
  };
  Demo.create(newDemo, function(err, demo) {
    if (err) console.error(err);
    else req.flash("success", "Created demo");
    res.redirect("/demos/" + demo._id);
  });
});

router.get("/:id", function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the demo");
      return res.redirect("/demos");
    }
    if (!demo) return res.redirect("/demos");
    res.render("demos/show", {demo: demo});
  });
});

router.get("/:id/edit", auth.isAdmin, function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the demo to edit");
      return res.redirect("/demos");
    }
    if (!demo) return res.redirect("/demos");
    res.render("demos/edit", {demo: demo});
  });
});

router.put("/:id", auth.isAdmin, function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the demo to update");
      return res.redirect("/demos");
    }
    if (!demo) return res.redirect("/demos");
    var editedDemo = {
      category: req.sanitize(req.body.category).trim(),
      title: req.sanitize(req.body.title).trim(),
      subtitle: req.sanitize(req.body.subtitle).trim(),
      description: req.sanitize(req.body.description).trim(),
      tags: req.body.tags ? req.sanitize(req.body.tags).split(",").map(t => t.trim()) : null,
      imageFileName: req.sanitize(req.body.imageFileName).trim(),
      videoID: req.sanitize(req.body.videoID).trim()
    };
    Demo.findByIdAndUpdate(req.params.id, editedDemo, function(err, updatedDemo) {
      if (err) console.error(err);
      else req.flash("success", "Changes saved");
      res.redirect("/demos/" + req.params.id);
    });
  });
});

router.delete("/:id", auth.isAdmin, function(req, res) {
  Demo.findById(req.params.id, function(err, demo) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the demo to delete");
      return res.redirect("/demos");
    }
    if (!demo) return res.redirect("/demos");
    Demo.findByIdAndDelete(req.params.id, function(err, deletedDemo) {
      if (err) console.error(err);
      else req.flash("success", "Deleted demo");
      res.redirect("/demos");
    });
  });
});

module.exports = router;
