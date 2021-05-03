const mongoose = require("mongoose"),
      shortid = require("shortid");

var settingsSchema = new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  active: {type: Boolean, required: true, default: false},
  emailNotifsOn: {type: Boolean, required: true, default: true},
  api: {
    gmail: {
      user: {type: String, required: false},
      refreshToken: {type: String, required: false}
    }
  }
});

module.exports = mongoose.model("Settings", settingsSchema);
