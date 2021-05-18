var auth = {};

auth.isAdmin = function(req, res, next) {
  if (!req.isAuthenticated() || !req.user.isAdmin) {
    req.flash("error", "Insufficient permissions");
    res.redirect("back");
  } else {
    next();
  }
}

module.exports = auth;
