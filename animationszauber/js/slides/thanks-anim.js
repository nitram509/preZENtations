// require SlideAnimationController.js
// require jQuery.js
// require RequestAnimationFrame.js

(function () {

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

        var fontsize = Math.sin(pos * Math.PI / duration) * (60);
        ps[i].style['font-size'] = ((40 + fontsize) | 0) + '%';

        var opacity = Math.min(Math.sin(pos * Math.PI / duration) + 0.1, 1);
        ps[i].style['opacity'] = '' + opacity;

      } else {
        ps[i].style['opacity'] = '0';
      }
    }
  }

  function anim() {
    x += 1;
    x = x % (4 * duration);
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
