function registerSlideChangeHandler(slideId, slideChangeHandler) {
  Reveal.addEventListener('slidechanged', function (event) {
    var e = {};
    if (slideId === event.previousSlide.id) {
      e.isVisible = false;
      e.slideId = slideId;
      slideChangeHandler.onLeave(e);
    }
    if (slideId === event.currentSlide.id) {
      e.isVisible = false;
      e.slideId = slideId;
      slideChangeHandler.onEnter(e);
    }
  });
}
