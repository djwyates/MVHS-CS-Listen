const express = require("express"),
      router = express.Router(),
      email = require("../services/email"),
      auth = require("../middleware/auth"),
      credentials = require("../config/credentials"),
      Faq = require("../models/faq"),
      User = require("../models/user"),
      Settings = require("../models/settings");

router.get("/", function(req, res) {
  Faq.find({}, function(err, faqs) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving all Q/A entries");
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
    newFaq.isPublic = req.body.isPublic ? true : false;
    if (req.body.order) newFaq.order = req.sanitize(req.body.order).trim();
  } else {
    Settings.findOne({active: true}, function(err, settings) {
      if (!settings.emailNotifsOn) return;
      User.find({}, function(err, users) {
        var emailRecipients = [];
        users.forEach(function(user) {
          /* max. email recipients is 15 to prevent max. gmail sending restrictions */
          if (user.isAdmin && user.email && user.emailIsVerified && user.emailNotifsOn && emailRecipients.length < 15)
            emailRecipients.push(user.email);
        });
        if (emailRecipients.length > 0) {
          email.send(emailRecipients.join(), "CS-Listen: New Question", "This is an automated email to inform you that a new question has been asked"
          + " on the CS-Listen website. Answer it after logging in as an admin: " + credentials.siteURL + "\n\nQuestion: " + newFaq.question
          + "\n\nEmail of Asker: " + (newFaq.email ? newFaq.email : "None provided"));
        }
      });
    });
  }
  if (!newFaq.question || newFaq.question.length <= 3 || newFaq.question.length > 200 || newFaq.email && newFaq.email.length > 320
      || (newFaq.answer && newFaq.answer.length > 400))
    return res.redirect("/faq/new");
  Faq.create(newFaq, function(err, faq) {
    if (err) console.error(err);
    else if (req.user && req.user.isAdmin) req.flash("success", "Created Q/A");
    else req.flash("success", "You will hear back from us soon!");
    res.redirect("/faq");
  });
});

router.get("/:id/edit", auth.isAdmin, function(req, res) {
  Faq.findById(req.params.id, function(err, faq) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the Q/A to edit");
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
      req.flash("error", "Failed retrieving the Q/A to update");
      return res.redirect("/faq");
    }
    if (!faq) return res.redirect("/faq");
    var editedFaq = {
      question: req.sanitize(req.body.question).trim(),
      email: req.body.email ? req.sanitize(req.body.email).trim() : null,
      answer: req.body.answer ? req.sanitize(req.body.answer).trim() : null,
      isPublic: req.body.isPublic ? true : false,
      order: req.body.order ? req.sanitize(req.body.order).trim() : 0
    };
    Faq.findByIdAndUpdate(req.params.id, editedFaq, function(err, updatedFaq) {
      if (err) console.error(err);
      else req.flash("success", "Changes saved");
      res.redirect("/faq");
    });
  });
});

router.delete("/:id", auth.isAdmin, function(req, res) {
  Faq.findById(req.params.id, function(err, faq) {
    if (err) {
      console.error(err);
      req.flash("error", "Failed retrieving the Q/A to delete");
      return res.redirect("/faq");
    }
    if (!faq) return res.redirect("/faq");
    Faq.findByIdAndDelete(req.params.id, function(err, deletedFaq) {
      if (err) console.error(err);
      else req.flash("success", "Deleted Q/A");
      res.redirect("/faq");
    });
  });
});

module.exports = router;
