function refreshAllStyles() {
  if (sidebar && infoRows) constructSidebar();
  constructDemos();
}

window.onload = refreshAllStyles;

window.onresize = refreshAllStyles;

window.onscroll = function() {
  sidebarOnScroll();
}
