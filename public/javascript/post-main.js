function refreshAllStyles() {
  constructSidebar();
  constructDemos();
  if (flash) flash.style.left = window.innerWidth - getElementMargins(bodyWrapper, ["right"]) - flash.offsetWidth + "px";
}

window.onload = function() {
  refreshAllStyles();
};

window.onresize = function() {
  refreshAllStyles();
};

window.onscroll = function() {
  sidebarOnScroll();
};
