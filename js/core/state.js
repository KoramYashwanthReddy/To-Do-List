import { STORAGE_KEYS, Storage } from "./storage.js";

const State = {
  profile: null,
  tasks: [],
  settings: null,
  history: [],
  experiments: [],
  habits: [],
  gamification: null,
  load() {
    State.profile = Storage.get(STORAGE_KEYS.profile, null);
    State.tasks = Storage.get(STORAGE_KEYS.tasks, []);
    State.settings = Storage.get(STORAGE_KEYS.settings, null);
    State.history = Storage.get(STORAGE_KEYS.history, []);
    State.experiments = Storage.get(STORAGE_KEYS.experiments, []);
    State.habits = Storage.get(STORAGE_KEYS.habits, []);
    State.gamification = Storage.get(STORAGE_KEYS.gamification, null);
  },
  save() {
    Storage.set(STORAGE_KEYS.profile, State.profile);
    Storage.set(STORAGE_KEYS.tasks, State.tasks);
    Storage.set(STORAGE_KEYS.settings, State.settings);
    Storage.set(STORAGE_KEYS.history, State.history);
    Storage.set(STORAGE_KEYS.experiments, State.experiments);
    Storage.set(STORAGE_KEYS.habits, State.habits);
    Storage.set(STORAGE_KEYS.gamification, State.gamification);
  }
};

export { State };
