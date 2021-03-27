const mongoose = require("mongoose"),
      shortid = require("shortid");

var demoSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  category: {type: String, enum: ["Demonstrations", "Recordings", "Other"], required: true, default: "Other"},
  title: {type: String, required: true},
  subtitle: {type: String, required: true},
  description: {type: String, required: true},
  tags: {type: [String], required: false, default: []},
  imageFileName: {type: String, required: true},
  videoID: {type: String, required: true} /* from YouTube */
});

module.exports = mongoose.model("Demo", demoSchema);
