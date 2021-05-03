const nodemailer = require("nodemailer"),
      credentials = require("../config/credentials"),
      googleapis = require("../services/googleapis"),
      Settings = require("../models/settings");

var email = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId: credentials.api.gmail.clientID,
    clientSecret: credentials.api.gmail.clientSecret
  }
});

email.send = function(to, subject, message) {
  Settings.findOne({active: true, "api.gmail.user": credentials.api.gmail.user}, function(err, settings) {
    if (!settings || !settings.api || !settings.api.gmail || !settings.api.gmail.refreshToken)
      throw new Error("No refresh token found in the MongoDB settings for gmail user " + credentials.api.gmail.user);
    var emailToSend = {
      from: credentials.api.gmail.user,
      bcc: to,
      subject: subject,
      text: message,
      auth: {
        user: credentials.api.gmail.user,
        refreshToken: settings.api.gmail.refreshToken
      }
    };
    transporter.sendMail(emailToSend, function(err, info) {
      if (err) console.error(err);
      console.info((err ? "Failed to send email: " : "Successfully sent email: ") + JSON.stringify(info));
    });
  });
}

module.exports = email;
