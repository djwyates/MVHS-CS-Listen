const mongoose = require("mongoose"),
      shortid = require("shortid");

var faqSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  question: {type: String, maxLength: 200, required: true},
  answer: {type: String, required: false},
  email: {type: String, required: false},
  isPublic: {type: Boolean, required: true, default: false},
  order: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model("Faq", faqSchema);
