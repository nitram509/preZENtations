// require SlideAnimationController.js
// require jQuery.js

(function () {
  var running = false;

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      var up = false;

      function auto_toggle_mr_t(e) {
        if (!running) return;
        var bedcon = $('#we-need-you');
        if (bedcon.hasClass("active")) {
          bedcon.removeClass("active");
        } else {
          bedcon.addClass("active");
        }
        up = !up;
        if (up) {
          setTimeout(auto_toggle_mr_t, 500);
        } else {
          setTimeout(auto_toggle_mr_t, 3000);
        }
      }

      if (running) setTimeout(auto_toggle_mr_t, 3000);
    },
    onLeave: function (event) {
      running = false;
    }
  };

  registerSlideChangeHandler('animation-fun', slideChangeHandler);

})();
