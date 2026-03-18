import { Utils } from "../core/utils.js";
import { Auth } from "../core/auth.js";
import { State } from "../core/state.js";

function setActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll(".sidebar a, .bottom-nav a").forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
  });
}

function initTopbar() {
  const clock = document.querySelector("[data-clock]");
  if (clock) {
    clock.textContent = Utils.formatTime();
    setInterval(() => (clock.textContent = Utils.formatTime()), 1000);
  }
  const date = document.querySelector("[data-date]");
  if (date) date.textContent = Utils.formatDate();

  const greeting = document.querySelector("[data-greeting]");
  if (greeting && State.profile) {
    const hour = new Date().getHours();
    const slice = hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
    greeting.textContent = `Good ${slice}, ${State.profile.name}`;
  }

  const logout = document.querySelector("[data-logout]");
  if (logout) logout.addEventListener("click", () => Auth.logout());
}

function initCommon() {
  Auth.requireAuth();
  State.load();
  setActiveNav();
  initTopbar();
}

export { initCommon };
