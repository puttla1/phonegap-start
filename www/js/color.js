$(document).ready(function()  {
  var color;
  if (typeof window.localStorage.getItem('colortheme')!== 'undefined' &&  window.localStorage.getItem('colortheme') != null) {
    color = window.localStorage.getItem('colortheme');
  }
  else color = "b";

  var bar = "ui-bar-" + color;
  var button = "ui-btn-up-" + color;
  $("#header").attr("data-theme", color).addClass(bar);
  $("#butto").attr("data-theme", color).addClass(button);
});
