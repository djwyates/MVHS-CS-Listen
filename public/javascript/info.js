var sidebar = document.querySelector(".info__sidebar");
if (sidebar) {
  var sidebarMaxHeight = window.innerHeight - navHeight - bodywrapperMarginTop - bodywrapperMarginBottom - 50;
  var sidebarLineHeight = sidebarMaxHeight - document.querySelectorAll(".info__row").length * 37; /* 37px is height of a sidebar circle */
  var totalInfoHeight = 0;
  var rows = document.querySelectorAll(".info__row"), rowHeight = 0;
  for (var i = 0; i < rows.length-1; i++) {
    totalInfoHeight += getRowHeight(rows[i]); /* besides the last row */
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i].id = "P" + (i + 1);
    var propOfTotalHeight = getRowHeight(rows[i]) / totalInfoHeight;
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
}

function getRowHeight(row) {
  var rowHeight = 0, rowMarginTop = 0, rowMarginBottom = 0;
  rowHeight = window.getComputedStyle(row).height;
  rowHeight = parseInt(rowHeight.substring(0, rowHeight.length - 2));
  rowMarginTop = window.getComputedStyle(row).marginTop;
  rowMarginTop = parseInt(rowMarginTop.substring(0, rowMarginTop.length - 2));
  rowMarginBottom = window.getComputedStyle(row).marginBottom;
  rowMarginBottom = parseInt(rowMarginBottom.substring(0, rowMarginBottom.length - 2));
  return rowHeight + rowMarginTop + rowMarginBottom;
}
