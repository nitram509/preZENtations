// require SlideAnimationController.js
// require jQuery.js
// require RequestAnimationFrame.js

(function () {

  "use strict";

  var x = 0;
  var running = false;
  var duration = 1000;

  function updateLineScroller(number) {
    var ps = $('.thanks-animation').find('p');
    var pslen = ps.length;
    var middle = 300 / 2 - 14;
    var delay = duration / pslen;


    for (var i = 0; i < pslen; i++) {
      var pos = -1;

      if (i * delay <= number) {
        var offs = number;
        while (offs > (i * delay + duration)) {
          offs -= duration;
        }
        pos = offs - i * delay;
      }

      if (pos > 0) {
        var y = Math.cos(pos * Math.PI / duration) * middle + middle;
        ps[i].style.top = y + 'px';

        var fontsize = Math.sin(pos * Math.PI / duration) * (1);
        ps[i].style['-webkit-transform'] = 'scale(' + (0.3 + fontsize) + ', ' + (0.3 + fontsize) + ')';
        ps[i].style['-moz-transform'] = 'scale(' + (0.3 + fontsize) + ', ' + (0.3 + fontsize) + ')';
        ps[i].style['transform'] = 'scale(' + (0.3 + fontsize) + ', ' + (0.3 + fontsize) + ')';

        var opacity = Math.min(Math.sin(pos * Math.PI / duration) + 0.1, 1);
        ps[i].style['opacity'] = '' + opacity;

      } else {
        ps[i].style['opacity'] = '0';
      }
    }
  }

  function anim() {
    x += 1;
    //x = x % (4 * duration + duration);   // TODO: why this breaks ? 
    updateLineScroller(x);
    if (running) {
      requestAnimationFrame(anim);
    }
  }

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      // delayed start
      setTimeout(anim, 3);
    },
    onLeave: function (event) {
      running = false;
    }
  };

  registerSlideChangeHandler('thanks-animation', slideChangeHandler);

})();
