const express = require("express"),
      router = express.Router(),
      shortid = require("shortid"),
      email = require("../services/email"),
      auth = require("../middleware/auth"),
      credentials = require("../config/credentials"),
      User = require("../models/user");

router.get("/", auth.isAdmin, function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    res.render("users/index", {users: users});
  });
});

router.get("/new", auth.isAdmin, function(req, res) {
  res.render("users/new");
});

router.post("/", auth.isAdmin, function(req, res) {
  if (req.body.password.length > 64) return res.redirect("/users/new");
  var newUser = {
    username: req.sanitize(req.body.username).trim(),
    password: req.body.password,
    email: req.sanitize(req.body.email).trim(),
    emailNotifsOn: req.body.emailNotifsOn,
    emailIsVerified: false,
    emailVerificationCode: shortid.generate(),
    isAdmin: true
  };
  User.create(newUser, function(err, user) {
    if (err) {
      console.error(err);
      if (err.code == 11000)
        req.flash("error", "You cannot have the same " + err.keyPattern.username ? "username" : "email" + " as another admin");
      return res.redirect("/users/new");
    }
    user.sendVerificationEmail();
    res.redirect("/users");
  });
});

router.get("/:id/edit", auth.isAdmin, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect("/users");
    }
    if (!user) return res.redirect("/users");
    res.render("users/edit", {user: user});
  });
});

router.put("/:id", auth.isAdmin, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect("/users");
    }
    if (!user) return res.redirect("/users");
    if (req.body.password.length > 64) return res.redirect("/users/" + req.params.id + "/edit");
    var editedUser = {
      username: req.sanitize(req.body.username).trim(),
      password: req.body.password,
      email: req.sanitize(req.body.email).trim(),
      emailNotifsOn: req.body.emailNotifsOn
    };
    if (editedUser.email != user.email) {
      editedUser.emailIsVerified = false;
      editedUser.emailVerificationCode = shortid.generate();
    }
    User.findByIdAndUpdate(req.params.id, editedUser, {new: true}, function(err, updatedUser) {
      if (err) console.error(err);
      var flashMsg = "Changes saved";
      if (editedUser.email != user.email) {
        updatedUser.sendVerificationEmail();
        flashMsg += "<br>Since you changed your email, be sure to re-verify it";
      }
      req.flash("success", flashMsg);
      res.redirect("/users/" + req.params.id + "/edit");
    });
  });
});

router.delete("/:id", auth.isAdmin, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect("/users");
    }
    if (!user) return res.redirect("/users");
    User.findByIdAndDelete(req.params.id, function(err, deletedUser) {
      if (err) console.error(err);
      res.redirect("/users");
    });
  });
});

router.get("/verify-email/:code", function(req, res) {
  if (!req.params.code) return res.redirect("back");
  User.findOne({emailVerificationCode: req.params.code}, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect("back");
    }
    if (!user) {
      req.flash("error", "The code you enetered is invalid or your email is already verified");
      return res.redirect("back");
    }
    if (req.user && req.user._id == user._id) {
      User.findOneAndUpdate({emailVerificationCode: req.params.code}, {emailIsVerified: true, $unset: {emailVerificationCode: ""}},
      function(err, updatedUser) {
        if (err) console.error(err);
        req.flash("success", "Successfully verified email");
        return res.redirect("/");
      });
    } else
      res.render("users/verify-email", {code: req.params.code});
  });
});

router.put("/verify-email/:code", function(req, res) {
  if (!req.params.code || !req.body.username) return res.redirect("back");
  User.findOne({emailVerificationCode: req.params.code}, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect("back");
    }
    if (!user) return res.redirect("back");
    if (user.username != req.body.username) {
      req.flash("error", "Incorrect username");
      return res.redirect("back");
    }
    User.findOneAndUpdate({emailVerificationCode: req.params.code}, {emailIsVerified: true, $unset: {emailVerificationCode: ""}},
    function(err, updatedUser) {
      if (err) console.error(err);
      req.flash("success", "Successfully verified email");
      res.redirect("/");
    });
  });
});

module.exports = router;
