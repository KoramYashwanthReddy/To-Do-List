const STORAGE_KEYS = {
  auth: "pulseos.auth",
  profile: "pulseos.profile",
  tasks: "pulseos.tasks",
  settings: "pulseos.settings",
  history: "pulseos.history",
  experiments: "pulseos.experiments",
  habits: "pulseos.habits",
  gamification: "pulseos.gamification"
};

const Storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  exportAll() {
    const payload = {};
    Object.values(STORAGE_KEYS).forEach((key) => {
      payload[key] = Storage.get(key, null);
    });
    return payload;
  },
  importAll(payload) {
    Object.entries(payload).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }
};

export { STORAGE_KEYS, Storage };
