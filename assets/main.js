
$(window).scroll(function(){$(".nav-container").offset().top>50?$(".navigation").addClass("navigation-drop"):$(".navigation").removeClass("navigation-drop")}),$(function(){$("a.page-scroll").bind("click",function(n){var a=$(this);$("html, body").stop().animate({scrollTop:$(a.attr("href")).offset().top},800,"swing"),n.preventDefault()})}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()}),$("a").mouseup(function(){$(this).blur()});

