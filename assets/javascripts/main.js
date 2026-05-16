const nav = document.querySelector("nav");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateNavBackground() {
  if (!nav) {
    return;
  }

  if (window.scrollY > 50) {
    nav.style.background = "rgba(0,0,0,0.5)";
  } else if (nav.classList.contains("home")) {
    nav.style.background = "rgba(0,0,0,0.65)";
  } else {
    nav.style.background = "rgba(0,0,0,0)";
  }
}

window.addEventListener("scroll", updateNavBackground, { passive: true });
updateNavBackground();

document.querySelectorAll("a.page-scroll").forEach((link) => {
  link.addEventListener("click", (event) => {
    const anchor = link.getAttribute("href");
    const target = anchor ? document.querySelector(anchor) : null;

    if (!target) {
      return;
    }

    event.preventDefault();

    if (prefersReducedMotion.matches) {
      window.location.hash = anchor;
    } else {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", anchor);
    }
  });
});
