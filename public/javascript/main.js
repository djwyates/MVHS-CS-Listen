/* declaring general variables */
var nav = document.querySelector(".nav");
var navHeight = window.getComputedStyle(nav).height;
navHeight = parseInt(navHeight.substring(0, navHeight.length - 2));
var bodywrapper = document.querySelector(".body-wrapper");
var bodywrapperMarginTop = window.getComputedStyle(bodywrapper).marginTop;
bodywrapperMarginTop = parseInt(bodywrapperMarginTop.substring(0, bodywrapperMarginTop.length - 2));
var bodywrapperMarginBottom = window.getComputedStyle(bodywrapper).marginBottom;
bodywrapperMarginBottom = parseInt(bodywrapperMarginBottom.substring(0, bodywrapperMarginBottom.length - 2));

/* setting heights for certain elements */
bodywrapper.style.minHeight = window.innerHeight - navHeight - bodywrapperMarginTop - bodywrapperMarginBottom + "px";
