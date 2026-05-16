$(document).ready(function () {
  const $menuButton = $(".hamburger");
  const $menu = $("#primary-menu");

  function setMenu(open) {
    $menu.toggleClass("is-open", open);
    $menuButton.attr("aria-expanded", String(open));
  }

  $menuButton.on("click", function () {
    setMenu(!$menu.hasClass("is-open"));
  });

  $(".hamburger-close button").on("click", function () {
    setMenu(false);
    $menuButton.trigger("focus");
  });

  $menu.on("click", "a", function () {
    setMenu(false);
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      setMenu(false);
      $menuButton.trigger("focus");
    }
  });
});
