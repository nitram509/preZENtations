// require SlideAnimationController.js
// require jQuery.js

(function () {

  var running = false;
  var duration = 4000;
  var startDelay = 3000;

  var bedconLogo = $('#bedcon-anim-anim')[0];

  $(bedconLogo).click(function (e) {
    running = !running;
    startColorFading();
  });

  function startColorFading() {
    if (!running) return;

    var properties = {color: 255};
    $(bedconLogo).animate(properties, {
      duration: duration,
      easing: 'swing',
      step: function (now, tween) {
        var color = 255 - (now | 0);
        this.style.backgroundColor = 'rgb(' + color + ',' + color + ',' + color + ')'
      },
      complete: function () {
        setTimeout(function () {
          bedconLogo.style.backgroundColor = '#fff'
        }, (duration >> 1));
      }
    });

    setTimeout(restartFading, duration + (duration >> 2));
  }

  function restartFading() {
    if (!running) return;
    setTimeout(startColorFading, (startDelay * 0.8) | 0);
  }

  var slideChangeHandler = {
    onEnter: function (event) {
      running = true;
      setTimeout(startColorFading, startDelay);
    },
    onLeave: function (event) {
      running = false;
    }
  };

  registerSlideChangeHandler('js-jquery-beispiel', slideChangeHandler);

})();
