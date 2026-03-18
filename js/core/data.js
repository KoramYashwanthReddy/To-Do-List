const sampleTasks = [
  {
    id: "task-1",
    title: "Design Life Map",
    status: "active",
    priority: "Quantum",
    energy: "High",
    estimate: 120,
    mood: "Curious",
    tags: ["Vision", "Canvas"],
    due: null,
    dependencies: [],
    recurring: "weekly",
    subtasks: [
      { id: "task-1-1", title: "Gather life pillars", done: true, subtasks: [] },
      { id: "task-1-2", title: "Draft map nodes", done: false, subtasks: [] }
    ],
    dna: "Explorer",
    createdAt: Date.now() - 86400000
  },
  {
    id: "task-2",
    title: "Ship focus mode audio",
    status: "queued",
    priority: "Nebula",
    energy: "Medium",
    estimate: 60,
    mood: "Calm",
    tags: ["Focus", "Audio"],
    due: null,
    dependencies: ["task-1"],
    recurring: "none",
    subtasks: [],
    dna: "Maker",
    createdAt: Date.now() - 56000000
  },
  {
    id: "task-3",
    title: "Review weekly experiments",
    status: "done",
    priority: "Pulse",
    energy: "Low",
    estimate: 30,
    mood: "Reflective",
    tags: ["Experiment"],
    due: null,
    dependencies: [],
    recurring: "monthly",
    subtasks: [],
    dna: "Analyst",
    createdAt: Date.now() - 180000000
  }
];

const sampleProfile = {
  name: "Nova",
  email: "nova@pulseos.ai",
  title: "Productivity Architect",
  theme: "Aurora",
  xp: 1280,
  level: 7,
  streak: 12,
  focusStyle: "Deep Wave"
};

const sampleSettings = {
  focusLength: 50,
  breakLength: 10,
  soundscape: "Nebula Drift",
  notifications: true,
  autoSchedule: true,
  moodFilter: "All"
};

const sampleExperiments = [
  { id: "exp-1", name: "90-min Deep Work", status: "Running", outcome: "?", days: 4 },
  { id: "exp-2", name: "Zero-Context Switch", status: "Completed", outcome: "+18%", days: 14 }
];

const sampleHabits = [
  { id: "habit-1", name: "Morning Planning", streak: 9, trend: "up" },
  { id: "habit-2", name: "Evening Review", streak: 6, trend: "flat" }
];

const sampleGamification = {
  badges: ["Quantum Starter", "Focus Scout", "Chaos Tamer"],
  xp: 1280,
  level: 7
};

export { sampleTasks, sampleProfile, sampleSettings, sampleExperiments, sampleHabits, sampleGamification };
