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
  var newFaq = {
    question: req.sanitize(req.body.question).trim(),
    email: req.sanitize(req.body.email).trim(),
    isPublic: false
  };
  if (req.user && req.user.isAdmin) {
    newFaq.answer = req.sanitize(req.body.answer).trim();
    newFaq.isPublic = req.body.isPublic;
    newFaq.order = req.sanitize(req.body.order).trim();
  }
  if (!newFaq.question || newFaq.question.length == 0 || newFaq.question.length > 200)
    return res.redirect("/faq/new");
  Faq.create(newFaq, function(err, faq) {
    if (err) console.error(err);
    res.redirect("/faq");
  });
});

module.exports = router;
