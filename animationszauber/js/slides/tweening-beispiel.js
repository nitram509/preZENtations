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
      y: 280,
      r: 0,

      xFrom: 10,
      yFrom: 20,
      rFrom: 0,
      xTo: 190,
      yTo: 280,
      rTo: 360
    };

    var tween1 = new TWEEN.Tween(animModel)
        .to({ x: animModel.xTo }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween1r = new TWEEN.Tween(animModel)
        .to({ r: animModel.rTo }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style['-webkit-transform'] = 'rotate(' + this.r + 'deg)';
          bedconLogo.style['-moz-transform'] = 'rotate(' + this.r + 'deg)';
          bedconLogo.style['transform'] = 'rotate(' + this.r + 'deg)';
        });
    var tween2 = new TWEEN.Tween(animModel)
        .to({ y: animModel.yFrom }, duration)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });
    var tween3 = new TWEEN.Tween(animModel)
        .to({ x: animModel.xFrom }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style.left = this.x + 'px';
        });
    var tween3r = new TWEEN.Tween(animModel)
        .to({ r: animModel.rFrom }, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(function () {
          bedconLogo.style['-webkit-transform'] = 'rotate(' + this.r + 'deg)';
          bedconLogo.style['-moz-transform'] = 'rotate(' + this.r + 'deg)';
          bedconLogo.style['transform'] = 'rotate(' + this.r + 'deg)';
        })
        /*.onComplete(function() {
          animModel.r = animModel.rFrom;
        })*/;
    var tween4 = new TWEEN.Tween(animModel)
        .to({ y: animModel.yTo }, duration)
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate(function () {
          bedconLogo.style.bottom = this.y + 'px';
        });

    tween1.chain(tween2);
    tween2.chain(tween3, tween3r);
    tween3.chain(tween4);
    tween4.chain(tween1, tween1r);

    function startStopAnimation() {
      if (running) {
        tween1.start();
        tween1r.start();
      } else {
        tween1.stop();
        tween1r.stop();
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

