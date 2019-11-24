// scroll.js by @bdc

document.addEventListener("DOMContentLoaded", function () {
  'use strict';
  
  var i, links, root, easeInOutCubic;

  links = document.querySelectorAll('a.scroll');
  i = links.length;
  root = /firefox|trident/i.test(navigator.userAgent) ? document.documentElement : document.body;
  easeInOutCubic = function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    } else {
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
  };

  while (i >= 0) {
    i -= 1;
    links.item(i).addEventListener('click', function (e) {
      var startTime, startPos, endPos, maxScroll, scrollEndValue, duration, scroll;
      
      startPos = root.scrollTop;
      endPos = document.getElementById(/[^#]+$/.exec(this.href)[0]).getBoundingClientRect().top;
      maxScroll = root.scrollHeight - window.innerHeight;
      scrollEndValue = startPos + endPos < maxScroll ? endPos : maxScroll - startPos;
      duration = 900;
      scroll = function (timestamp) {
        startTime = startTime || timestamp;
        var elapsed, progress;
        elapsed = timestamp - startTime;
        progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration);
        root.scrollTop = progress;
        elapsed < duration && requestAnimationFrame(scroll);
      };
      requestAnimationFrame(scroll);
      e.preventDefault();
    });
  }
});
