import { initTheme } from "./core/theme.js";
import { initReveal } from "./core/reveal.js";
import { initPageTransitions } from "./core/transitions.js";
import { initTicker } from "./core/ticker.js";
import { initCommon } from "./pages/common.js";
import { initDashboard } from "./pages/dashboard.js";
import { initTasks } from "./pages/tasks.js";
import { initCalendar } from "./pages/calendar.js";
import { initAnalytics } from "./pages/analytics.js";
import { initSettings } from "./pages/settings.js";
import { initProfile } from "./pages/profile.js";
import { initFocus } from "./pages/focus.js";
import { initLab } from "./pages/lab.js";
import { initAuth } from "./pages/auth.js";
import { initLanding } from "./pages/landing.js";

initTheme();
initPageTransitions();
initReveal();
initTicker();

const page = document.body.dataset.page;

if (page === "login" || page === "signup") {
  initAuth();
} else if (page === "landing") {
  initLanding();
} else {
  initCommon();
  if (page === "dashboard") initDashboard();
  if (page === "tasks") initTasks();
  if (page === "calendar") initCalendar();
  if (page === "analytics") initAnalytics();
  if (page === "settings") initSettings();
  if (page === "profile") initProfile();
  if (page === "focus") initFocus();
  if (page === "lab") initLab();
}
