const {google} = require("googleapis"),
      credentials = require("../config/credentials"),
      Settings = require("../models/settings");

const oauth2Client = new google.auth.OAuth2(
  credentials.api.gmail.clientID,
  credentials.api.gmail.clientSecret,
  credentials.api.gmail.redirectURL
);

oauth2Client.on("tokens", function(tokens) {
  if (tokens.refresh_token) {
    Settings.findOneAndUpdate({"api.gmail.user": credentials.api.gmail.user}, {"api.gmail.refreshToken": tokens.refresh_token},
    function(err, settings) {
      if (err) console.error(err);
    });
  }
});

const url = oauth2Client.generateAuthUrl({access_type: "offline", scope: "https://mail.google.com/"});

var googleapis = {};

googleapis.getOAuth2URL = function() {
  return url;
}

googleapis.retrieveAccessToken = function(code) {
  return new Promise(function(resolve, reject) {
    if (!code) return resolve(null);
    oauth2Client.getToken(code).then(function(tokens) {
      tokens = {tokens};
      oauth2Client.setCredentials(tokens);
      resolve(tokens);
    });
  });
}

module.exports = googleapis;
