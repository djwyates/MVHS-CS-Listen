const express = require("express"),
      router = express.Router(),
      googleapis = require("../services/googleapis"),
      auth = require("../middleware/auth"),
      passport = require("passport");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/further-info", function(req, res) {
  res.render("further-info");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res) {
  req.flash("success", "Logged in" + (req.user.isAdmin ? " as an admin" : ""));
  res.redirect("/");
});

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
});

router.get("/google/login", auth.isAdmin, function(req, res) {
  res.redirect(googleapis.getOAuth2URL());
});

router.get("/google/oauth2callback", auth.isAdmin, function(req, res) {
  if (!req.query.code) return res.redirect("back");
  googleapis.retrieveAccessToken(req.query.code).then(function(tokens) {
    if (tokens) req.flash("success", "Authenticated with Google");
    res.redirect("/");
  });
});

router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;
