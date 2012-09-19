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

    function createBurger(element, top, left, a, b, c) {
      return {
        propA:a,
        propB:b,
        propC:c,
        posTop:top,
        posLeft:left,
        element:element
      }
    }

    function initBurgerPositionsToModel(imgElements) {

      var burgers = [];

      var ELEMENTS_PER_ROW = 3;
      $(imgElements).each(function (index, imgElement) {
        var propertyTop = '0px';
        if (index >= ELEMENTS_PER_ROW) {
          propertyTop = ($(imgElement.parentNode).height() - imgElement.height) + 'px';
        }
        var propertyLeft = ((index % ELEMENTS_PER_ROW) * 210) + 'px';
        imgElement.style.setProperty('top', propertyTop);
        imgElement.style.setProperty('left', propertyLeft);

        var burger = createBurger(imgElement, propertyTop, propertyLeft, index, 0, 0);
        burgers.push(burger)
      });

      return burgers;
    }

    var nextSlide = evt.detail.nextSlide;
    if (nextSlide) {
      var imgElements = $("#" + nextSlide.id + " .animated");
      if (imgElements.length > 0) {
        var burgers = initBurgerPositionsToModel(imgElements);
        $(burgers).each(function (idx, burger) {
          var swapIdx = (idx + 1) % 6;
          var swapBurger = burgers[swapIdx];
          $(imgElements[idx]).click(function(clickEvent) {
            clickEvent.target.style.top = swapBurger.posTop;
            clickEvent.target.style.left = swapBurger.posLeft;
          });
        });
      }
    }
  },
  postShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var elements = $("#" + prevSlide.id + " .animated");
      $(elements).each(function (index, element) {
        // by removing do restore back to CSS original styles
        element.style.removeProperty('top');
        element.style.removeProperty('left');
      });
    }
  }
});

mosho.init();