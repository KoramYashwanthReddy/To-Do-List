function initPageTransitions() {
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.body.classList.add("page-ready");
    return;
  }

  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });

  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
    if (link.target === "_blank") return;

    link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => {
        window.location.href = link.href;
      }, 220);
    });
  });
}

export { initPageTransitions };
