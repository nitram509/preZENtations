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
  name:"elements_fade_in_very_slow",
  preShow:function (event) {
    var nextSlide = event.detail.nextSlide;
    if (nextSlide) {
      var fadeInElements = $("#" + nextSlide.id + " .fade-in-very-slow");
      $(fadeInElements).each(function (index, element) {
        $(element).delay((1 + index) * 5000).fadeTo('normal', 1)
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

    function renderBurgers(burgers) {
      var ELEMENTS_PER_ROW = 3;
      burgers.forEach(function (burger, index) {
        var propertyTop = '0px';
        if (index >= ELEMENTS_PER_ROW) {
          propertyTop = ($(burger.element.parentNode).height() - burger.element.height) + 'px';
        }
        var propertyLeft = ((index % ELEMENTS_PER_ROW) * 210) + 'px';
        burger.element.style.setProperty('top', propertyTop);
        burger.element.style.setProperty('left', propertyLeft);
      });
    }

    function createBurgersFromHtmlData(htmlElements) {
      var burgers = [];
      $(htmlElements).each(function (idx, elem) {
        var burgerData = elem.dataset['burger']
        if (burgerData) {
          var meat = parseFloat(burgerData.match(/meat=(\d+[.]*\d*)/)[1]);
          var vegetables = parseFloat(burgerData.match(/vegetables=(\d+[.]*\d*)/)[1]);
          var bakedColor = parseFloat(burgerData.match(/bakedcolor=(\d+[.]*\d*)/)[1]);
          burgers.push(createBurger(meat, vegetables, bakedColor, elem));
        }
      });
      renderBurgers(burgers);
      return burgers;
    }

    function updateBurgerControls(burger) {
      $("#slider-Meat").slider("value", burger.meat);
      $("#slider-Vegetables").slider("value", burger.vegetables);
      $("#slider-BakedColor").slider("value", burger.bakedColor);
    }

    function initBurgerControlSliders() {
      $("#slider-Meat").slider({max:30, min:1, step:1});
      $("#slider-Meat").bind("slidechange", function (event, ui) {
        $("#meat-value").text(ui.value);
      });
      $("#slider-Vegetables").slider({max:30, min:1, step:1});
      $("#slider-Vegetables").bind("slidechange", function (event, ui) {
        $("#vegetables-value").text(ui.value);
      });
      $("#slider-BakedColor").slider({max:2, min:1, step:0.1});
      $("#slider-BakedColor").bind("slidechange", function (event, ui) {
        $("#baked-color-value").text(ui.value);
      });
      updateBurgerControls(createBurger(1, 1, 1.0, null));
    }

    function sortAndRenderBurgerByReference(refBurger, burgers) {
      var comparator = createBurgerComparator_withReference(refBurger.meat, refBurger.vegetables, refBurger.bakedColor);
      burgers.sort(comparator);
      renderBurgers(burgers);
      updateBurgerControls(refBurger);
    }

    function onSlideChange(burgers) {
      return function(event, ui) {
        if (typeof event.originalEvent == 'undefined') {
          return;
        }
        var meat = $("#slider-Meat").slider("value");
        var vegetables = $("#slider-Vegetables").slider("value");
        var bakedColor = $("#slider-BakedColor").slider("value");
        var refBurger = createBurger(meat, vegetables, bakedColor, null);
        sortAndRenderBurgerByReference(refBurger, burgers);
      }
    }

    var nextSlide = evt.detail.nextSlide;
    if (nextSlide) {
      var imgElements = $("#" + nextSlide.id + " .burger");
      if (imgElements.length > 0) {
        var burgers = createBurgersFromHtmlData(imgElements);
        initBurgerControlSliders();
        $(burgers).each(function (idx, burger) {
          $(imgElements[idx]).click(function (clickEvent) {
            var refBurger = createBurgersFromHtmlData([clickEvent.target])[0];
            sortAndRenderBurgerByReference(refBurger, burgers);
          });
        });
        $("#slider-Meat").bind("slidechange", onSlideChange(burgers));
        $("#slider-Vegetables").bind("slidechange", onSlideChange(burgers));
        $("#slider-BakedColor").bind("slidechange", onSlideChange(burgers));
      }
    }
  },
  postShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var elements = $("#" + prevSlide.id + " .burger");
      $(elements).each(function (index, element) {
        // by removing do restore back to CSS original styles
        element.style.removeProperty('top');
        element.style.removeProperty('left');
      });
    }
  }
});

mosho.plugin({
  name:"Super_Duper_Burger_Sorting_Controls",
  preShow:function (event) {
    var nextSlide = event.detail.nextSlide;
    if (nextSlide) {
      var hasShowBurgerControlsClass = $("#" + nextSlide.id + " .show-burger-controls");
      if (hasShowBurgerControlsClass.length > 0) {
        $("#burger-sort-controls").delay(750).fadeIn();
      }
    }
  },
  postShow:function (evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var hasShowBurgerControlsClass = $("#" + prevSlide.id + " .show-burger-controls");
      if (hasShowBurgerControlsClass.length > 0) {
        $("#burger-sort-controls").fadeOut();
      }
    }
  }
});

mosho.init();