$(document).ready(function() {
  $('.hamburger').on('click', function() {
    $('.hamburger').toggle(function() {
      $('.main-nav').css('display', 'none');
    }, function() {
      $('.main-nav').css('display', 'block');
    });
  })
  $('.hamburger-close').on('click', function() {
    $('.main-nav').css('display', 'none');
    $('.hamburger').css('display', 'inline-grid');
  });
});
