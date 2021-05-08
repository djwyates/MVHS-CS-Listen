const sidebar = document.querySelector(".info__sidebar");
const infoRows = document.querySelectorAll(".info__row");
function constructSidebar() {
  if (!sidebar || !infoRows) return;
  /* set fullscreen info row heights */
  sidebar.innerHTML = "";
  var sidebarMaxHeight = Math.max(window.innerHeight - nav.offsetHeight - getElementMargins(nav, ["top", "bottom"]) - footerMarginTop, 330);
  document.querySelector(".info__row--full-screen").style.height = Math.max(sidebarMaxHeight, 500) - 70 + "px";
  /* construct the sidebar */
  var sidebarCircleHeight = window.innerWidth > 760 ? 37 : 29;
  var sidebarLineHeight = sidebarMaxHeight - document.querySelectorAll(".info__row").length * sidebarCircleHeight;
  var totalInfoHeight = 0;
  var rowHeight = 0;
  for (var i = 0; i < infoRows.length-1; i++)
    totalInfoHeight += infoRows[i].offsetHeight + getElementMargins(infoRows[i], ["top", "bottom"]); /* besides the last row */
  for (var i = 0; i < infoRows.length; i++) {
    infoRows[i].id = "P" + (i + 1);
    var propOfTotalHeight = (infoRows[i].offsetHeight + getElementMargins(infoRows[i], ["top", "bottom"])) / totalInfoHeight;
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
    if (i != infoRows.length-1) {
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
}

/* change the sidebar's positioning when the footer is in view */
const sidebarYOffset = 154;
function sidebarOnScroll() {
  if (!sidebar || !infoRows) return;
  var sidebarMaxHeight = window.innerHeight - nav.offsetHeight - getElementMargins(nav, ["top", "bottom"]) - footerMarginTop;
  var maxYPosOfSidebar = getTotalDocumentHeight() - footer.offsetHeight - getElementMargins(footer, ["top", "bottom"]) - sidebarMaxHeight;
  var yScrollDistance = window.pageYOffset;
  if (yScrollDistance >= maxYPosOfSidebar-sidebarYOffset) {
    sidebar.style.position = "absolute";
    sidebar.style.top = maxYPosOfSidebar + "px";
  } else {
    sidebar.style.position = "fixed";
    sidebar.style.top = sidebarYOffset + "px";
  }
}
