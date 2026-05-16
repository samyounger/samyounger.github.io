// jQuery to collapse the navbar on scroll
$(window).scroll(function () {
  if ($("nav").offset().top > 50) {
    $("nav").css({ background: "rgba(0,0,0,0.5)" });
  } else if ($("nav").hasClass("home")) {
    $("nav").css({ background: "rgba(0,0,0,0.65)" });
  } else {
    $("nav").css({ background: "rgba(0,0,0,0)" });
  }
});

// jQuery for page scrolling feature - requires jQuery ui
$(function () {
  $("a.page-scroll").bind("click", function (event) {
    var $anchor = $(this).attr("href");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.hash = $anchor;
    } else {
      $("html,body").animate({ scrollTop: $($anchor).offset().top }, "fast");
    }
    event.preventDefault();
  });
});

// Closes the Responsive Menu on Menu Item Click
$(".navbar-collapse ul li a").click(function () {
  $(".navbar-toggle:visible").click();
});
