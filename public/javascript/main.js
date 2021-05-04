/* declaring general variables & functions */
const nav = document.querySelector(".nav");
const footer = document.querySelector(".footer");
const bodyWrapper = document.querySelector(".body-wrapper");
var footerMarginTop = window.getComputedStyle(document.querySelector(".footer")).marginTop;
footerMarginTop = parseInt(footerMarginTop.substring(0, footerMarginTop.length - 2));

function getElementHeight(element, options) {
  options = options || {};
  var height = window.getComputedStyle(element).height;
  height = parseInt(height.substring(0, height.length - 2));
  if (options.includeMargins) {
    var marginTop = window.getComputedStyle(element).marginTop;
    marginTop = parseInt(marginTop.substring(0, marginTop.length - 2));
    var marginBottom = window.getComputedStyle(element).marginBottom;
    marginBottom = parseInt(marginBottom.substring(0, marginBottom.length - 2));
    height = height + marginTop + marginBottom;
  }
  return height;
}

function getTotalDocumentHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}

/* setting heights for certain elements */
bodyWrapper.style.minHeight = window.innerHeight - getElementHeight(nav, {includeMargins: true}) - footerMarginTop + "px";
