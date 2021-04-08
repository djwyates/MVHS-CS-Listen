const express = require("express"),
      router = express.Router(),
      passport = require("passport");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), function(req, res) {
  res.redirect("/");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("*", function(req, res) {
  res.render("404");
});

module.exports = router;
