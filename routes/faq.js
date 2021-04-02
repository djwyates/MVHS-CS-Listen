const express = require("express"),
      router = express.Router(),
      Faq = require("../models/faq");

router.get("/", function(req, res) {
  Faq.find({isPublic: true}, function(err, faqs) {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }
    res.render("faq/index", {faqs: faqs});
  });
});

router.get("/new", function(req, res) {
  res.render("faq/new");
});

router.post("/", function(req, res) {
  var question = req.sanitize(req.body.question).trim();
  if (!question || question.length == 0 || question.length > 200) return res.redirect("/faq/new");
  Faq.create({question: question, email: req.sanitize(req.body.email).trim(), isPublic: false}, function(err, faq) {
    if (err) console.error(err);
    res.redirect("/faq");
  });
});

module.exports = router;
