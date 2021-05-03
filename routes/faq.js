const express = require("express"),
      router = express.Router(),
      email = require("../services/email"),
      auth = require("../middleware/auth"),
      Faq = require("../models/faq"),
      User = require("../models/user");

router.get("/", function(req, res) {
  Faq.find({}, function(err, faqs) {
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
    email: req.body.email ? req.sanitize(req.body.email).trim() : null,
    isPublic: false
  };
  if (req.user && req.user.isAdmin) {
    newFaq.answer = req.body.answer ? req.sanitize(req.body.answer).trim() : null;
    newFaq.isPublic = req.body.isPublic;
    if (req.body.order) newFaq.order = req.sanitize(req.body.order).trim();
  } else {
    User.find({}, function(err, users) {
      var emailRecipients = [];
      users.forEach(function(user) {
        if (user.isAdmin && user.email && user.emailNotifsOn)
          emailRecipients.push(user.email);
      });
      email.send(emailRecipients.join(), "CS Listen: New Question", "This is an automated email to inform you that a new question has been asked"
      + " on the CS Listen website.\n\nQuestion: " + newFaq.question + "\nEmail: " + (newFaq.email ? newFaq.email : "None provided"));
    });
  }
  if (!newFaq.question || newFaq.question.length == 0 || newFaq.question.length > 200 || (newFaq.answer && newFaq.answer.length > 400))
    return res.redirect("/faq/new");
  Faq.create(newFaq, function(err, faq) {
    if (err) console.error(err);
    res.redirect("/faq");
  });
});

router.get("/:id/edit", auth.isAdmin, function(req, res) {
  Faq.findById(req.params.id, function(err, faq) {
    if (err) {
      console.error(err);
      return res.redirect("/faq");
    }
    if (!faq) return res.redirect("/faq");
    res.render("faq/edit", {faq: faq});
  });
});

router.put("/:id", auth.isAdmin, function(req, res) {
  Faq.findById(req.params.id, function(err, faq) {
    if (err) {
      console.error(err);
      return res.redirect("/faq");
    }
    if (!faq) return res.redirect("/faq");
    var editedFaq = {
      question: req.sanitize(req.body.question).trim(),
      email: req.body.email ? req.sanitize(req.body.email).trim() : null,
      answer: req.body.answer ? req.sanitize(req.body.answer).trim() : null,
      isPublic: req.body.isPublic,
      order: req.body.order ? req.sanitize(req.body.order).trim() : 0,
    };
    Faq.findByIdAndUpdate(req.params.id, editedFaq, function(err, updatedFaq) {
      if (err) console.error(err);
      res.redirect("/faq");
    });
  });
});

router.delete("/:id", auth.isAdmin, function(req, res) {
  Faq.findById(req.params.id, function(err, faq) {
    if (err) {
      console.error(err);
      return res.redirect("/faq");
    }
    if (!faq) return res.redirect("/faq");
    Faq.findByIdAndDelete(req.params.id, function(err, deletedFaq) {
      if (err) console.error(err);
      res.redirect("/faq");
    });
  });
});

module.exports = router;
