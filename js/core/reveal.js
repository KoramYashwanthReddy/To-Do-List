function initReveal() {
  const autoSelectors = [
    ".card",
    ".feature-tile",
    ".task-card",
    ".kanban-column",
    ".calendar .day",
    ".auth-card",
    ".auth-hero",
    ".hero-glow",
    ".widgets .card",
    ".analytics-grid .card"
  ];

  autoSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });
  });

  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
}

export { initReveal };
