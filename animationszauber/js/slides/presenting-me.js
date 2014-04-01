// require SlideAnimationController.js
// require jQuery.js

(function () {
  var running = false;
  var cssDuration = 10000;

  function rotateRight() {
    if (!running) return;
    $('img.thatsme').addClass('right-rotated');
    setTimeout(rotateLeft, cssDuration + (cssDuration >> 2));
  }

  function rotateLeft() {
    if (!running) return;
    $('img.thatsme').removeClass('right-rotated');
    setTimeout(rotateRight, cssDuration + (cssDuration >> 2));
  }

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      // delayed start
      setTimeout(rotateRight, (cssDuration >> 2));
    },
    onLeave: function (event) {
      running = false;
      rotateLeft();
    }
  };

  registerSlideChangeHandler('presenting-me', slideChangeHandler);

})();
