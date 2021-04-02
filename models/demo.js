const mongoose = require("mongoose"),
      shortid = require("shortid");

var demoSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  category: {type: String, enum: ["Demonstrations", "Recordings", "Other"], required: true, default: "Other"},
  title: {type: String, maxLength: 25, required: true},
  subtitle: {type: String, maxLength: 40, required: true},
  description: {type: String, maxLength: 100, required: true},
  tags: {type: [String], required: false, default: []},
  imageFileName: {type: String, required: true},
  videoID: {type: String, required: true} /* from YouTube */
});

module.exports = mongoose.model("Demo", demoSchema);
