// require Reveal.js

function registerSlideChangeHandler(slideId, slideChangeHandler) {
  var listener = function (event) {
    var e = {};
    if (slideId === event.currentSlide.id) {
      e.isVisible = false;
      e.slideId = slideId;
      slideChangeHandler.onEnter(e);
    }
    if (event.previousSlide && slideId === event.previousSlide.id) {
      e.isVisible = false;
      e.slideId = slideId;
      slideChangeHandler.onLeave(e);
    }
  };
  Reveal.addEventListener('slidechanged', listener);
  Reveal.addEventListener('ready', listener);
}
