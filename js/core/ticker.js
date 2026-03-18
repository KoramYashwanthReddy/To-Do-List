function initTicker() {
  const messages = {
    landing: "PulseOS: Minimal, intelligent focus. Auto-priority enabled • Theme: dark/light/system • Local-first data",
    login: "Secure local session • No backend required • Your data stays on device",
    signup: "Create your architecture • Start with starter data • Customize instantly",
    dashboard: "Live focus • Auto-schedule • Energy-aware queue • Deep work ready",
    tasks: "Task DNA • Dependencies • Recurrence • Auto-prioritization engaged",
    calendar: "Time travel view • Capacity forecast • Smart scheduling",
    analytics: "Clarity over charts • Signal-based insights • Weekly momentum",
    focus: "Deep work shield • Ambient sound • Distraction filter",
    lab: "Experiment engine • Habit evolution • Insight capture",
    profile: "Identity hub • Avatar generator • Skill stack",
    settings: "Backup vault • Export/Import • Theme + notifications"
  };

  const page = document.body.dataset.page || "landing";
  const text = messages[page] || messages.landing;

  const ticker = document.createElement("div");
  ticker.className = "ticker";
  ticker.innerHTML = `
    <div class="ticker-track">
      <span>${text}</span>
      <span>${text}</span>
    </div>
  `;

  const target = document.querySelector(".app-content") || document.querySelector(".landing .container") || document.querySelector(".auth-hero") || document.body;
  target.prepend(ticker);
}

export { initTicker };
