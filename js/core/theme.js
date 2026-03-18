const THEME_KEY = "pulseos.theme";
const modes = ["dark", "light", "system"];

function resolveSystemTheme() {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "system") {
    root.dataset.theme = resolveSystemTheme();
  } else {
    root.dataset.theme = mode;
  }
}

function renderButton(mode) {
  const button = document.querySelector("[data-theme-toggle]");
  if (button) {
    const label = mode.charAt(0).toUpperCase() + mode.slice(1);
    button.textContent = `Theme: ${label}`;
  }
}

function cycleTheme() {
  const current = localStorage.getItem(THEME_KEY) || "system";
  const next = modes[(modes.indexOf(current) + 1) % modes.length];
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
  renderButton(next);
}

function ensureButton() {
  if (document.querySelector(".theme-fab")) return;
  const wrap = document.createElement("div");
  wrap.className = "theme-fab";
  wrap.innerHTML = `<button type="button" data-theme-toggle>Theme: System</button>`;
  document.body.appendChild(wrap);
  wrap.querySelector("button").addEventListener("click", cycleTheme);
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY) || "system";
  applyTheme(stored);
  ensureButton();
  renderButton(stored);

  if (window.matchMedia) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", () => {
      const mode = localStorage.getItem(THEME_KEY) || "system";
      if (mode === "system") {
        applyTheme("system");
        renderButton("system");
      }
    });
  }
}

export { initTheme };
