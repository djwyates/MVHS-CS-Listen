var utils = {};

utils.arrayToSentence = function(array) {
  if (!Array.isArray(array)) return array;
  return array.slice(0, -2).join(", ") + (array.slice(0, -2).length ? ", " : "") + array.slice(-2).join(" and ");
}

module.exports = utils;
