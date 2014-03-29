// require SlideAnimationController.js
// require jQuery.js
// require tween.js

(function () {

  var running = false;
  var bedconLogo = document.getElementById("bedcon-tween");

  $(bedconLogo).click(function (event) {
    running = !running;
    animate();
  });

  function init() {
    var tween1 = new TWEEN.Tween({ x: 10 })
        .to({ x: 190 })
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween2 = new TWEEN.Tween({ y: 260 })
        .to({ y: 0 })
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });
    var tween3 = new TWEEN.Tween({ x: 190 })
        .to({ x: 10 })
        .easing(TWEEN.Easing.Quintic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween4 = new TWEEN.Tween({ y: 0 })
        .to({ y: 260 })
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });
    tween1.chain(tween2);
    tween2.chain(tween3);
    tween3.chain(tween4);
    tween4.chain(tween1);
    tween1.start();

    var slideChangeHandler = {
      onEnter: function (event) {
        running = true;
        animate();
      },
      onLeave: function (event) {
        running = false;
      }
    };

    registerSlideChangeHandler('tweening-beispiel', slideChangeHandler);

  }

  function animate() {
    if (!running) return;
    requestAnimationFrame(animate);
    TWEEN.update();
  }

  init();

})();

