import { STORAGE_KEYS, Storage } from "./storage.js";
import { Utils } from "./utils.js";
import { sampleProfile, sampleSettings, sampleTasks, sampleExperiments, sampleHabits, sampleGamification } from "./data.js";

const Auth = {
  isLoggedIn() {
    const auth = Storage.get(STORAGE_KEYS.auth, null);
    return auth && auth.loggedIn;
  },
  requireAuth() {
    if (!Auth.isLoggedIn()) {
      window.location.href = "login.html";
    }
  },
  login({ email, password }) {
    if (!email || !password) return { ok: false, message: "Enter credentials" };
    Storage.set(STORAGE_KEYS.auth, { loggedIn: true, email });
    if (!Storage.get(STORAGE_KEYS.profile)) {
      Storage.set(STORAGE_KEYS.profile, { ...sampleProfile, email, name: email.split("@")[0] });
      Storage.set(STORAGE_KEYS.settings, sampleSettings);
      Storage.set(STORAGE_KEYS.tasks, sampleTasks);
      Storage.set(STORAGE_KEYS.experiments, sampleExperiments);
      Storage.set(STORAGE_KEYS.habits, sampleHabits);
      Storage.set(STORAGE_KEYS.gamification, sampleGamification);
      Storage.set(STORAGE_KEYS.history, []);
    }
    return { ok: true };
  },
  signup({ name, email, password }) {
    if (!name || !email || !password) return { ok: false, message: "Complete all fields" };
    Storage.set(STORAGE_KEYS.auth, { loggedIn: true, email });
    Storage.set(STORAGE_KEYS.profile, { ...sampleProfile, name, email });
    Storage.set(STORAGE_KEYS.settings, sampleSettings);
    Storage.set(STORAGE_KEYS.tasks, sampleTasks);
    Storage.set(STORAGE_KEYS.experiments, sampleExperiments);
    Storage.set(STORAGE_KEYS.habits, sampleHabits);
    Storage.set(STORAGE_KEYS.gamification, sampleGamification);
    Storage.set(STORAGE_KEYS.history, []);
    return { ok: true };
  },
  logout() {
    Storage.set(STORAGE_KEYS.auth, { loggedIn: false });
    Utils.toast("Session closed");
    window.location.href = "login.html";
  }
};

export { Auth };
