
mosho.plugin({
  name: "scaleActiveSlide",
  preShow: function (evt) {
    var prevSlide = evt.detail.prevSlide;
    var nextSlide = evt.detail.nextSlide;
    if (prevSlide) { prevSlide.scale(0.25) }
    if (nextSlide) { nextSlide.scale(4) }
  }
});

mosho.plugin({
  name: "elements_fade_in",
  preShow: function(event) {
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
  name: "elements_fade_out",
  postShow: function(evt) {
    var prevSlide = evt.detail.prevSlide;
    if (prevSlide) {
      var fadeInElements = $("#" + prevSlide.id + " .fade-out");
      $(fadeInElements).each(function (index, element) {
        $(element).fadeTo('fast', 0);
      });
    }
  }
});

mosho.enter("nonlinear-more", function () {
  setTimeout(function () {
    document.getElementById("nonlinear-tag").innerHTML = "did I mention...";
  }, 250);
});

mosho.init();