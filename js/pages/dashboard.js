import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

function initWidgetsDrag() {
  const widgets = document.querySelectorAll(".widget");
  widgets.forEach((widget) => {
    widget.draggable = true;
    widget.addEventListener("dragstart", () => widget.classList.add("dragging"));
    widget.addEventListener("dragend", () => widget.classList.remove("dragging"));
  });

  document.querySelectorAll(".widgets").forEach((grid) => {
    grid.addEventListener("dragover", (event) => {
      event.preventDefault();
      const dragging = document.querySelector(".widget.dragging");
      const after = getDragAfterElement(grid, event.clientY);
      if (!after) {
        grid.appendChild(dragging);
      } else {
        grid.insertBefore(dragging, after);
      }
    });
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".widget:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function initScore() {
  const scoreEl = document.querySelector("[data-score]");
  const tasks = State.tasks;
  const completed = tasks.filter((t) => t.status === "done").length;
  const total = tasks.length || 1;
  const score = Math.round((completed / total) * 100);
  if (scoreEl) scoreEl.textContent = `${score}`;
  const ring = document.querySelector(".score-ring");
  if (ring) ring.style.background = `conic-gradient(var(--accent-0) 0deg, var(--accent-1) ${score * 3.6}deg, rgba(255,255,255,0.08) ${score * 3.6}deg)`;
}

function initSuggestions() {
  const list = document.querySelector("[data-suggestions]");
  if (!list) return;
  const energy = State.settings?.moodFilter || "All";
  const suggestions = [
    "Auto-schedule two low-energy tasks into micro slots",
    "Run a 25-min deep work sprint and log distraction score",
    "Decompose the highest priority task into 3 steps",
    "Start a micro-experiment: no context switching for 60 minutes"
  ];
  list.innerHTML = "";
  suggestions.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  const mood = document.querySelector("[data-mood]");
  if (mood) mood.textContent = energy;
}

function initFocusTimer() {
  const timerEl = document.querySelector("[data-focus-timer]");
  const startBtn = document.querySelector("[data-focus-start]");
  if (!timerEl || !startBtn) return;
  let seconds = (State.settings?.focusLength || 45) * 60;
  let running = false;
  const render = () => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    timerEl.textContent = `${min}:${sec}`;
  };
  render();
  let interval;
  startBtn.addEventListener("click", () => {
    running = !running;
    startBtn.textContent = running ? "Pause" : "Start";
    if (running) {
      interval = setInterval(() => {
        seconds = Math.max(0, seconds - 1);
        render();
        if (seconds === 0) {
          clearInterval(interval);
          running = false;
          startBtn.textContent = "Start";
          Utils.toast("Focus session complete");
          Utils.notify("PulseOS", "Focus session complete");
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
  });
}

function initMindmap() {
  const canvas = document.querySelector("#mindmap");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  ctx.fillStyle = "#6fffe9";
  ctx.beginPath();
  ctx.arc(center.x, center.y, 32, 0, Math.PI * 2);
  ctx.fill();
  const nodes = [
    { label: "Health", angle: 0.2 },
    { label: "Craft", angle: 1.4 },
    { label: "Relationships", angle: 2.6 },
    { label: "Wealth", angle: 3.8 },
    { label: "Adventure", angle: 5.1 }
  ];
  nodes.forEach((node) => {
    const x = center.x + Math.cos(node.angle) * 120;
    const y = center.y + Math.sin(node.angle) * 90;
    ctx.strokeStyle = "rgba(122,108,255,0.7)";
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(122,108,255,0.9)";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#c9d3ea";
    ctx.font = "12px Sora";
    ctx.fillText(node.label, x - 22, y - 24);
  });
}

function initFeaturesList() {
  const list = document.querySelector("[data-features]");
  if (!list) return;
  const features = [
    "Predictive task suggestions",
    "Focus mode with ambient soundscape",
    "Goal decomposition engine",
    "Habit evolution tracker",
    "Life map visual goal tree",
    "Mood-aware task filtering",
    "Time travel workload view",
    "Productivity experiments lab",
    "Gamification system (XP, levels, badges)",
    "Burnout detection logic",
    "Auto-scheduling into free slots",
    "Cognitive load meter",
    "Auto-prioritization engine",
    "Puzzle-based productivity challenges",
    "Ambient sound generator",
    "Spaced repetition memory tasks",
    "Direction system (next best action)",
    "Anti-procrastination mode",
    "Task DNA patterns",
    "Deep work session tracker",
    "Energy-matched task queue",
    "Skill stack mapper",
    "Context switching radar",
    "Distraction heatmap",
    "Weekly reflection ritual",
    "Micro-reward injector",
    "Momentum streak engine",
    "Flow state logger",
    "Time horizon planner",
    "Adaptive break coach",
    "Chaos buffer allocator",
    "Risk/impact matrix",
    "Commitment vault",
    "Learning loop capture",
    "Project constellation view",
    "Decision fatigue monitor",
    "Priority gravity score",
    "Recovery budget tracker",
    "Insight journal",
    "Vision sprint board"
  ];
  list.innerHTML = "";
  features.slice(0, 40).forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    list.appendChild(li);
  });
}

export function initDashboard() {
  initWidgetsDrag();
  initScore();
  initSuggestions();
  initFocusTimer();
  initMindmap();
  initFeaturesList();
  Utils.requestNotify();
}
