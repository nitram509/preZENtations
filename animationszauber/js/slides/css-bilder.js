// require SlideAnimationController.js
// require jQuery.js

(function () {

  var running = false;
  var cssDuration = 1000;
  var startDelay = 5000;

  var bedconLogo = $('#bedcon-anim-3d');

  bedconLogo.click(function (e) {
    running = !running;
    moveImageUp();
  });

  function moveImageUp() {
    if (!running) return;
    bedconLogo.addClass("active");
    setTimeout(moveImageDown, cssDuration + (cssDuration >> 2));
  }

  function moveImageDown() {
    if (!running) return;
    bedconLogo.removeClass("active");
    setTimeout(moveImageUp, (startDelay * 0.8) | 0);
  }

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      setTimeout(moveImageUp, startDelay);
    },
    onLeave: function (event) {
      running = false;
    }
  };

  registerSlideChangeHandler('css-bilder', slideChangeHandler);

})();
