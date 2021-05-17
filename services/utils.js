var utils = {};

utils.getCurrentDate = function(format) {
  format = format || "mm-dd-yyyy, 00:00:00";
  if (format == "mm-dd-yyyy") {
    var currentDate = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}).replace(/\//g, "-").split(" ")[0];
    return currentDate.substring(0, currentDate.length-1);
  } else {
    return new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"}).replace(/\//g, "-");
  }
}

utils.reformatDate = function(date) {
  if (!date) return null;
  if (date.length <= 10) date += ", 12:00:00 AM";
  var date = new Date(date);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return(months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
}

module.exports = utils;
