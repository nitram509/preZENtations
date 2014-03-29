// require SlideAnimationController.js
// require jQuery.js

(function () {

  var running = false;
  var bedcon = $('#we-need-you');
  var up = false;
  var startDelay = 3000;

  function auto_toggle_mr_t(e) {
    if (!running) return;
    if (bedcon.hasClass("active2")) {
      bedcon.removeClass("active2");
    } else {
      bedcon.addClass("active2");
    }
    up = !up;
    if (up) {
      setTimeout(auto_toggle_mr_t, 500);
    } else {
      setTimeout(auto_toggle_mr_t, 3000);
    }
  }

  function bringToFront() {
    bedcon.addClass("active1");
  }

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      if (running) {
        setTimeout(bringToFront, startDelay);
        setTimeout(auto_toggle_mr_t, startDelay*2);
      }
    },
    onLeave: function (event) {
      running = false;
      bedcon.removeClass("active1");
      bedcon.removeClass("active2");
    }
  };

  registerSlideChangeHandler('animation-fun', slideChangeHandler);

})();
