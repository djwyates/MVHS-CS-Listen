/* declaring general variables & functions */
const nav = document.querySelector(".nav");
const footer = document.querySelector(".footer");
const bodyWrapper = document.querySelector(".body-wrapper");
const flash = document.querySelector(".flash");
const footerMarginTop = getElementMargins(footer, ["top"]);

function getElementMargins(element, margins) {
  if (!element || !margins || !Array.isArray(margins)) return;
  var totalMargin = 0;
  if (margins.includes("top")) {
    var marginTop = window.getComputedStyle(element).marginTop;
    marginTop = parseInt(marginTop.substring(0, marginTop.length - 2));
    totalMargin += marginTop;
  } if (margins.includes("bottom")) {
    var marginBottom = window.getComputedStyle(element).marginBottom;
    marginBottom = parseInt(marginBottom.substring(0, marginBottom.length - 2));
    totalMargin += marginBottom;
  } if (margins.includes("left")) {
    var marginLeft = window.getComputedStyle(element).marginLeft;
    marginLeft = parseInt(marginLeft.substring(0, marginLeft.length - 2));
    totalMargin += marginLeft;
  } if (margins.includes("right")) {
    var marginRight = window.getComputedStyle(element).marginRight;
    marginRight = parseInt(marginRight.substring(0, marginRight.length - 2));
    totalMargin += marginRight;
  }
  return totalMargin;
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}

function getTotalDocumentHeight() {
  return Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
}

/* setting heights for certain elements */
bodyWrapper.style.minHeight = window.innerHeight - nav.offsetHeight - getElementMargins(nav, ["top", "bottom"]) - footerMarginTop + "px";

/* flash message configuration */
const flashCloseIcon = document.querySelector(".flash__close-icon");
if (flash && flashCloseIcon) {
  flashCloseIcon.addEventListener("click", function() {
    flash.style.display = "none";
  });
}
