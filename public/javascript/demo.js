const demoTitles = document.querySelectorAll(".demos__category-title");
const demoCards = document.querySelectorAll(".demos__card");
function constructDemos() {
  if (demoTitles) {
    demoTitles.forEach(function(demoTitle) {
      const demoLine = demoTitle.children[1] || demoTitle.children[0];
      demoLine.style.width = window.innerWidth - getElementMargins(bodyWrapper, ["left"]) - demoTitle.offsetWidth - getScrollbarWidth() + "px";
    });
  } if (demoCards) { // TODO: ADJUST CARD MARGINS FOR MOBILE
    demoCards.forEach(function(demoCard) {
      if (demoCard.offsetLeft + demoCard.offsetWidth > window.innerWidth)
        demoCard.style.marginLeft = "-10px";
    });
  }
}
