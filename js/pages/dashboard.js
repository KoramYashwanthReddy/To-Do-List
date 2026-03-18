import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

const store = {
  focusQueue: ["Finalize Life Map draft", "Ship Sprint plan", "Review focus logs"],
  signalStream: ["Focus up 12%", "Distraction down 9%", "Energy high in late afternoon"],
  microMissions: ["15-min declutter", "2-page deep work", "Inbox zero sweep"],
  rituals: ["Breathe", "Silence", "Water", "Stretch", "Journal"],
  energyMap: ["Low", "Rising", "Peak", "Stable", "Recover"],
  suggestions: [
    "Auto-schedule two low-energy tasks into micro slots",
    "Run a 25-min deep work sprint and log distraction score",
    "Decompose the highest priority task into 3 steps"
  ]
};

const commandList = [
  { name: "Start Focus Sprint", key: "F" },
  { name: "Pause Focus Sprint", key: "P" },
  { name: "Auto Schedule", key: "A" },
  { name: "Refresh AI Pulse", key: "R" },
  { name: "Engage Shield", key: "S" },
  { name: "Recalibrate Energy", key: "E" },
  { name: "Shuffle Focus Queue", key: "Q" },
  { name: "Refresh Signal Stream", key: "G" },
  { name: "Start Ritual", key: "T" },
  { name: "Start Mission", key: "M" },
  { name: "Quick Capture", key: "C" },
  { name: "Clear Backlog", key: "B" },
  { name: "Plan Day", key: "D" },
  { name: "Sync Goals", key: "Y" },
  { name: "Open Task Manager", key: "1" },
  { name: "Open Calendar", key: "2" },
  { name: "Open Focus Mode", key: "3" },
  { name: "Open Analytics", key: "4" },
  { name: "Open Settings", key: "5" },
  { name: "Open Profile", key: "6" },
  { name: "Toggle Theme", key: "X" },
  { name: "Log Experiment", key: "L" },
  { name: "Start Deep Work Block", key: "W" },
  { name: "Enable Distraction Guard", key: "H" },
  { name: "Record Mood Check", key: "K" },
  { name: "Export Backup", key: "O" },
  { name: "Import Backup", key: "I" },
  { name: "Generate Daily Summary", key: "U" },
  { name: "Review Weekly Goals", key: "V" },
  { name: "Clear Notifications", key: "N" },
  { name: "Boost Momentum", key: "Z" },
  { name: "Lock Focus Session", key: "L" },
  { name: "Start Micro Sprint", key: "J" },
  { name: "Activate Recovery Mode", key: "K" },
  { name: "Recompute Priority", key: "R" },
  { name: "Open Signal Gallery", key: "G" },
  { name: "Create Quick Task", key: "T" },
  { name: "Switch to Minimal Mode", key: "M" },
  { name: "Pin Current Focus", key: "P" },
  { name: "Run Habit Check", key: "H" },
  { name: "Sync Energy Map", key: "E" },
  { name: "Start Time Travel View", key: "X" },
  { name: "Launch Auto Review", key: "A" },
  { name: "Open Ritual Builder", key: "B" },
  { name: "Open Focus Queue", key: "Q" },
  { name: "Open Micro Missions", key: "M" },
  { name: "Show System Flags", key: "F" },
  { name: "Open Momentum Signals", key: "S" },
  { name: "Open Next Best Actions", key: "N" },
  { name: "Generate Insight Snapshot", key: "I" },
  { name: "Enable Ambient Sound", key: "A" },
  { name: "Disable Ambient Sound", key: "D" },
  { name: "Run Quick Diagnostics", key: "Q" },
  { name: "Reset Focus Timer", key: "R" },
  { name: "Start Auto Breakdown", key: "B" },
  { name: "Capture Learning Note", key: "L" },
  { name: "Launch Recovery Sprint", key: "S" },
  { name: "Open Command History", key: "H" },
  { name: "Log Energy Spike", key: "E" }
];

let shieldOn = true;
let focusInterval;
let focusRunning = false;
let focusSeconds = 0;

function updateStatus(message) {
  const status = document.querySelector("[data-hero-status]");
  if (status) status.textContent = message;
}

function renderList(selector, items) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = items.map((text) => `<li>${text}</li>`).join("");
}

function renderChips(selector, items) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    chip.addEventListener("click", () => chip.classList.toggle("active"));
    el.appendChild(chip);
  });
}

function initScore() {
  const scoreEl = document.querySelector("[data-score]");
  const tasks = State.tasks;
  const completed = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length || 1;
  const score = Math.round((completed / total) * 100);
  if (scoreEl) scoreEl.textContent = `${score}`;
}

function initSuggestions() {
  renderList("[data-suggestions]", store.suggestions);
  const mood = document.querySelector("[data-mood]");
  if (mood) mood.textContent = State.settings?.moodFilter || "All";
}

function initFocusTimer() {
  const timerEl = document.querySelector("[data-focus-timer]");
  const triggers = document.querySelectorAll("[data-action='Focus Sprint']");
  if (!timerEl || !triggers.length) return;
  focusSeconds = (State.settings?.focusLength || 45) * 60;

  const render = () => {
    const min = String(Math.floor(focusSeconds / 60)).padStart(2, "0");
    const sec = String(focusSeconds % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;
  };

  const toggle = () => {
    focusRunning = !focusRunning;
    triggers.forEach((btn) => (btn.textContent = focusRunning ? "Pause" : "Start Sprint"));
    if (focusRunning) {
      focusInterval = setInterval(() => {
        focusSeconds = Math.max(0, focusSeconds - 1);
        render();
        if (focusSeconds === 0) {
          clearInterval(focusInterval);
          focusRunning = false;
          triggers.forEach((btn) => (btn.textContent = "Start Sprint"));
          Utils.toast("Focus session complete");
          Utils.notify("PulseOS", "Focus session complete");
        }
      }, 1000);
      updateStatus("Focus sprint running");
    } else {
      clearInterval(focusInterval);
      updateStatus("Focus sprint paused");
    }
  };

  triggers.forEach((btn) => btn.addEventListener("click", toggle));
  render();
}

function initBoards() {
  renderList("[data-focus-queue]", store.focusQueue);
  renderList("[data-signal-stream]", store.signalStream);
  renderList("[data-micro-missions]", store.microMissions);
  renderChips("[data-rituals]", store.rituals);
  renderChips("[data-energy-map]", store.energyMap);
}

function shuffleArray(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function updateNextSlot() {
  const slot = document.querySelector("[data-next-slot]");
  if (!slot) return;
  const now = new Date();
  now.setMinutes(now.getMinutes() + 45);
  const next = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  slot.textContent = `Next slot: ${next}`;
}

function toggleShield() {
  shieldOn = !shieldOn;
  const strength = document.querySelector("[data-shield]");
  const state = document.querySelector("[data-shield-state]");
  if (strength) strength.textContent = shieldOn ? "82%" : "45%";
  if (state) state.textContent = shieldOn ? "Focus lock armed" : "Shield cooling";
}

function clearActiveCards() {
  document.querySelectorAll(".card.active, .netflix-card.active, .kpi-card.active, .rail-card.active").forEach((card) => {
    card.classList.remove("active");
  });
}

function initRail() {
  const rail = document.querySelector("[data-rail]");
  const left = document.querySelector("[data-rail-left]");
  const right = document.querySelector("[data-rail-right]");
  if (!rail || !left || !right) return;
  left.addEventListener("click", () => rail.scrollBy({ left: -(rail.clientWidth * 0.8), behavior: "smooth" }));
  right.addEventListener("click", () => rail.scrollBy({ left: rail.clientWidth * 0.8, behavior: "smooth" }));
}

function initCmdPanel() {
  const overlay = document.querySelector("[data-cmd-overlay]");
  const input = document.querySelector("[data-cmd-input]");
  const list = document.querySelector("[data-cmd-list]");
  const openBtn = document.querySelector("[data-open-cmd]");
  const closeBtn = document.querySelector("[data-cmd-close]");

  if (!overlay || !input || !list) return;

  const renderCommands = (query = "") => {
    const q = query.toLowerCase();
    list.innerHTML = "";
    commandList.filter((cmd) => cmd.name.toLowerCase().includes(q)).forEach((cmd) => {
      const row = document.createElement("div");
      row.className = "cmd-item";
      row.innerHTML = `<span>${cmd.name}</span><span class="cmd-kbd">${cmd.key}</span>`;
      row.addEventListener("click", () => {
        updateStatus(`Command executed: ${cmd.name}`);
        Utils.toast(`${cmd.name} executed`);
        close();
      });
      list.appendChild(row);
    });
  };

  const open = () => {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    input.value = "";
    renderCommands();
    setTimeout(() => input.focus(), 50);
  };

  const close = () => {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
  };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  input.addEventListener("input", () => renderCommands(input.value));

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      open();
    }
    if (event.key === "Escape") {
      close();
      clearActiveCards();
      updateStatus("Selection cleared");
    }
  });
}

function initActions() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action) {
      const label = action.dataset.action;

      if (label === "Refresh Pulse") {
        store.suggestions = shuffleArray(store.suggestions);
        renderList("[data-suggestions]", store.suggestions);
        updateStatus("AI pulse refreshed");
      }

      if (label === "Auto Schedule") {
        updateNextSlot();
        updateStatus("Auto schedule updated");
      }

      if (label === "Shield") {
        toggleShield();
        updateStatus(shieldOn ? "Shield engaged" : "Shield cooling");
      }

      if (label === "Shuffle Queue") {
        store.focusQueue = shuffleArray(store.focusQueue);
        renderList("[data-focus-queue]", store.focusQueue);
        updateStatus("Focus queue shuffled");
      }

      if (label === "Signal") {
        store.signalStream = shuffleArray(store.signalStream);
        renderList("[data-signal-stream]", store.signalStream);
        updateStatus("Signal stream refreshed");
      }

      if (label === "Ritual") {
        const ritual = store.rituals[Math.floor(Math.random() * store.rituals.length)];
        updateStatus(`Ritual started: ${ritual}`);
      }

      if (label === "Mission") {
        const mission = store.microMissions.shift();
        if (mission) {
          Utils.toast(`Mission started: ${mission}`);
          updateStatus(`Mission started: ${mission}`);
          store.microMissions.push(mission);
          renderList("[data-micro-missions]", store.microMissions);
        }
      }

      if (label === "Energy") {
        store.energyMap = shuffleArray(store.energyMap);
        renderChips("[data-energy-map]", store.energyMap);
        updateStatus("Energy map recalibrated");
      }

      if (label === "Quick Capture") {
        store.focusQueue.unshift("Captured: New task");
        renderList("[data-focus-queue]", store.focusQueue);
        updateStatus("Quick capture added to queue");
      }

      if (label === "Clear Backlog") {
        store.focusQueue = ["Queue cleared. Add new focus tasks."];
        renderList("[data-focus-queue]", store.focusQueue);
        updateStatus("Backlog cleared");
      }

      if (label === "Plan Day") {
        store.signalStream.unshift("Day plan locked: 3 sprints");
        renderList("[data-signal-stream]", store.signalStream);
        updateStatus("Day planned");
      }

      if (label === "Sync Goals") {
        store.signalStream.unshift("Goals synced with priorities");
        renderList("[data-signal-stream]", store.signalStream);
        updateStatus("Goals synced");
      }

      Utils.toast(`${label} executed`);
    }

    const card = event.target.closest("[data-card]");
    if (card) {
      clearActiveCards();
      card.classList.add("active");
      updateStatus(`Card opened: ${card.dataset.card}`);
    }
  });
}

function initInsights() {
  renderList("[data-next-actions]", [
    "Start a 40-min deep work block",
    "Schedule a recovery break",
    "Clarify the top priority deliverable"
  ]);
  renderList("[data-signals]", [
    "High momentum detected",
    "Energy curve trending upward",
    "Low context switching"
  ]);
  renderList("[data-flags]", [
    "Two tasks awaiting dependencies",
    "One overdue experiment",
    "Potential burnout risk: low"
  ]);
}

export function initDashboard() {
  initScore();
  initSuggestions();
  initFocusTimer();
  initBoards();
  initInsights();
  initActions();
  initRail();
  initCmdPanel();
  updateNextSlot();
  Utils.requestNotify();
}
