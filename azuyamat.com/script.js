topBTN = document.getElementById("top");
window.onscroll = function(){
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    topBTN.style.display = "block";
  } else {
    topBTN.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
