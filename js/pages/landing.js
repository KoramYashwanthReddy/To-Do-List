const featureList = [
  "Predictive task suggestions",
  "Adaptive focus timer",
  "Life-map constellation view",
  "Goal decomposition engine",
  "Mood-aware task routing",
  "Energy level matching",
  "Time travel workload",
  "Auto-scheduling slots",
  "Cognitive load meter",
  "Burnout detection",
  "Deep work analytics",
  "Habit evolution tracker",
  "Gamification XP",
  "Badge unlocks",
  "Distraction heatmap",
  "Ambient soundscape",
  "Context switch radar",
  "Priority gravity",
  "Decision fatigue monitor",
  "Recovery budget",
  "Flow state logger",
  "Focus streaks",
  "Micro-reward injector",
  "Memory recall tasks",
  "Spaced repetition",
  "Anti-procrastination mode",
  "Momentum planner",
  "Weekly reflection",
  "Project constellation",
  "Risk/impact matrix",
  "Commitment vault",
  "Insight journal",
  "Chaos buffer",
  "Learning loop capture",
  "Vision sprint board",
  "Auto-priority engine",
  "Task DNA patterns",
  "Energy-habit coupling",
  "Focus vs distraction",
  "Auto review cycles",
  "Adaptive break coach",
  "Time horizon planner",
  "Skill stack mapper",
  "Mood resonance filter",
  "Goal orbit tracker",
  "Outcome scorecards",
  "Experiment lab",
  "Personalized dashboards",
  "Mind-map canvas",
  "Timeline intelligence",
  "Minimal command palette",
  "Quick-capture inbox",
  "One-click deferral",
  "Context-aware reminders",
  "Priority lens",
  "Goal milestone radar",
  "Distraction budget",
  "Focus warmup ritual",
  "Weekly auto-review",
  "Sprint energy plan"
];

function setStatus(text) {
  const status = document.querySelector("[data-landing-status]");
  if (status) status.textContent = text;
}

function bindCards() {
  const cards = document.querySelectorAll("[data-card-action]");
  cards.forEach((card) => {
    card.classList.add("netflix-card");
    card.addEventListener("click", () => {
      cards.forEach((el) => el.classList.remove("active"));
      card.classList.add("active");
      setStatus(`Active module: ${card.dataset.cardAction}`);
    });
  });
}

function initLanding() {
  const grid = document.querySelector("[data-feature-grid]");
  if (!grid) return;
  grid.innerHTML = "";
  featureList.slice(0, 60).forEach((feature) => {
    const tile = document.createElement("div");
    tile.className = "feature-tile netflix-card reveal";
    tile.innerHTML = `<strong>${feature}</strong><p>Auto-calibrated in real time.</p>`;
    tile.addEventListener("click", () => {
      grid.querySelectorAll(".feature-tile").forEach((el) => el.classList.remove("active"));
      tile.classList.add("active");
      setStatus(`Highlighted: ${feature}`);
    });
    grid.appendChild(tile);
  });
  bindCards();
}

export { initLanding };
