mosho.plugin({
  name:"scaleActiveSlide",
  preShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    var nextSlide = evt.detail.nextSlide;
    if (prevSlide) {
      prevSlide.scale(0.25)
    }
    if (nextSlide) {
      nextSlide.scale(4)
    }
  }
});

mosho.plugin({
  name:"elements_fade_in",
  preShow:function (event) {
    var nextSlide = event.detail.nextSlide;
    if (nextSlide) {
      var fadeInElements = $("#" + nextSlide.id + " .fade-in");
      $(fadeInElements).each(function (index, element) {
        $(element).delay((1 + index) * 750).fadeTo('normal', 1)
      });
    }
  }
});

mosho.plugin({
  name:"elements_fade_out",
  postShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var fadeInElements = $("#" + prevSlide.id + " .fade-out");
      $(fadeInElements).each(function (index, element) {
        $(element).fadeTo('fast', 0);
      });
    }
  }
});

mosho.plugin({
  name:"manage-burger-ordering",
  preShow:function (evt) {
    var nextSlide = evt.detail.nextSlide;
    if (nextSlide) {
      var elements = $("#" + nextSlide.id + " .animated");
      var ELEMENTS_PER_ROW = 3;
      $(elements).each(function (index, element) {
        var propertyTop = '0px';
        if (index >= ELEMENTS_PER_ROW) {
          propertyTop =  ($(element.parentNode).height() - element.height) + 'px';
        }
        var propertyLeft = ((index % ELEMENTS_PER_ROW) * 210) + 'px';
        element.style.setProperty('top', propertyTop);
        element.style.setProperty('left', propertyLeft);
      });
    }
  },
  postShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var elements = $("#" + prevSlide.id + " .animated");
      $(elements).each(function (index, element) {
        element.style.removeProperty('top');
        element.style.removeProperty('left');
      });
    }
  }
});

mosho.init();