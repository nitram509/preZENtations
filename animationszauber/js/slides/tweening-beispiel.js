// require SlideAnimationController.js
// require jQuery.js
// require tween.js

(function () {

  var startDelay = 3000;
  var duration = 3000;

  var running = false;
  var bedconLogo = document.getElementById("bedcon-tween");

  function init() {

    var animModel = {
      x: 10,
      y: 260,
      minX : 10,
      minY : 0,
      maxX : 190,
      maxY : 260
    };

    var tween1 = new TWEEN.Tween(animModel)
        .to({ x: animModel.maxX }, duration)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween2 = new TWEEN.Tween(animModel)
        .to({ y: animModel.minY }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });
    var tween3 = new TWEEN.Tween(animModel)
        .to({ x: animModel.minX }, duration)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween4 = new TWEEN.Tween(animModel)
        .to({ y: animModel.maxY }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });

    tween1.chain(tween2);
    tween2.chain(tween3);
    tween3.chain(tween4);
    tween4.chain(tween1);

    function startStopAnimation() {
      if (running) {
        tween1.start();
      } else {
        tween1.stop();
      }
      animate();
    }

    var slideChangeHandler = {
      onEnter: function (event) {
        running = true;
        setTimeout(startStopAnimation, startDelay);
      },
      onLeave: function (event) {
        running = false;
      }
    };

    registerSlideChangeHandler('tweening-beispiel', slideChangeHandler);

    $(bedconLogo).click(function (event) {
      running = !running;
      startStopAnimation();
    });

  }

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    TWEEN.update();
  }

  init();

})();

