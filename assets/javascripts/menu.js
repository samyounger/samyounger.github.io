document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".hamburger");
  const menu = document.querySelector("#primary-menu");
  const closeButton = document.querySelector(".hamburger-close button");

  if (!menuButton || !menu) {
    return;
  }

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }

  menuButton.addEventListener("click", () => {
    setMenu(!menu.classList.contains("is-open"));
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      setMenu(false);
      menuButton.focus();
    });
  }

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      menuButton.focus();
    }
  });
});
