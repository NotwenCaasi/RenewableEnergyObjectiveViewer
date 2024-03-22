document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded');
document.getElementById('scrollable-rectangle').addEventListener('scroll', function() {
  console.log('Scroll event triggered');
  var scrollableHeight = this.scrollHeight - this.clientHeight;
  var scrollPosition = this.scrollTop;
  var fillPercentage = (scrollPosition / scrollableHeight) * 100;

  document.getElementById('green-fill').style.width = `${fillPercentage}%`;
});
});
