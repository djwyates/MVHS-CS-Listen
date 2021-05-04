const sidebar = document.querySelector(".info__sidebar");
if (sidebar) {
  const sidebarMaxHeight = window.innerHeight - getElementHeight(nav, {includeMargins: true}) - footerMarginTop;
  document.querySelector(".info__row--full-screen").style.height = Math.max(sidebarMaxHeight, 340) - 70 + "px";
  /* construct the sidebar */
  var sidebarLineHeight = sidebarMaxHeight - document.querySelectorAll(".info__row").length * 37; /* 37px is height of a sidebar circle */
  var totalInfoHeight = 0;
  const rows = document.querySelectorAll(".info__row");
  var rowHeight = 0;
  for (var i = 0; i < rows.length-1; i++)
    totalInfoHeight += getElementHeight(rows[i], {includeMargins: true}); /* besides the last row */
  for (var i = 0; i < rows.length; i++) {
    rows[i].id = "P" + (i + 1);
    var propOfTotalHeight = getElementHeight(rows[i], {includeMargins: true}) / totalInfoHeight;
    var lineHeight = Math.floor(propOfTotalHeight * sidebarLineHeight);
    var sidebarCircle = document.createElement("div");
    sidebarCircle.classList.add("info__sidebar-circle");
    var sidebarText = document.createElement("div");
    sidebarText.classList.add("info__sidebar-text");
    sidebarText.innerText = "P" + (i + 1);
    var sidebarAnchor = document.createElement("a");
    sidebarAnchor.href = window.location.pathname + "#P" + (i + 1);
    var sidebarLink = document.createElement("span");
    sidebarLink.classList.add("div-link");
    sidebarAnchor.appendChild(sidebarLink);
    if (i != rows.length-1) {
      var sidebarLine = document.createElement("div");
      sidebarLine.classList.add("info__sidebar-line");
      sidebarLine.style.height = lineHeight + "px";
      sidebarCircle.style.marginBottom = lineHeight + "px";
      sidebarCircle.appendChild(sidebarLine);
    }
    sidebarCircle.appendChild(sidebarAnchor);
    sidebarCircle.appendChild(sidebarText);
    sidebar.appendChild(sidebarCircle);
  }
  /* change the sidebar's positioning when the footer is in view */
  const sidebarYOffset = sidebar.offsetTop;
  const maxYPosOfSidebar = getTotalDocumentHeight()-getElementHeight(footer, {includeMargins: true})-sidebarMaxHeight;
  window.onscroll = function() {
    var yScrollDistance = window.pageYOffset;
    if (yScrollDistance >= maxYPosOfSidebar-sidebarYOffset) {
      sidebar.style.position = "absolute";
      sidebar.style.top = maxYPosOfSidebar + "px";
    } else {
      sidebar.style.position = "fixed";
      sidebar.style.top = sidebarYOffset + "px";
    }
  }
}
