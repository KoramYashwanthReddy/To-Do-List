import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

const statusColumns = ["queued", "active", "review", "done"];

function renderTasks() {
  const list = document.querySelector("[data-task-list]");
  if (!list) return;
  list.innerHTML = "";
  State.tasks.forEach((task) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
      <div class="flex" style="justify-content: space-between;">
        <strong>${task.title}</strong>
        <span class="badge">${task.priority}</span>
      </div>
      <div class="task-meta">
        <span class="chip">Energy: ${task.energy}</span>
        <span class="chip">Mood: ${task.mood}</span>
        <span class="chip">${task.estimate} min</span>
        <span class="chip">DNA: ${task.dna}</span>
      </div>
      <div class="task-meta">
        ${task.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div>${renderSubtasks(task.subtasks)}</div>
      <div class="flex" style="justify-content: space-between;">
        <small>Depends on: ${task.dependencies.length ? task.dependencies.join(", ") : "None"}</small>
        <button class="btn ghost" data-task-done="${task.id}">Toggle Done</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderSubtasks(subtasks, depth = 0) {
  if (!subtasks || !subtasks.length) return "<em class=\"chip\">No subtasks</em>";
  return `
    <div style="margin-left:${depth * 12}px; display:grid; gap:0.3rem;">
      ${subtasks
        .map((sub) => `
          <div class="flex">
            <input type="checkbox" ${sub.done ? "checked" : ""} disabled />
            <span>${sub.title}</span>
          </div>
          ${renderSubtasks(sub.subtasks || [], depth + 1)}
        `)
        .join("")}
    </div>
  `;
}

function bindTaskActions() {
  const list = document.querySelector("[data-task-list]");
  if (!list) return;
  list.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-task-done]");
    if (!btn) return;
    const id = btn.dataset.taskDone;
    const task = State.tasks.find((t) => t.id === id);
    if (!task) return;
    if (task.dependencies.length) {
      const unmet = task.dependencies.filter((dep) => {
        const depTask = State.tasks.find((t) => t.id === dep);
        return depTask && depTask.status !== "done";
      });
      if (unmet.length) {
        Utils.toast("Complete dependencies first");
        return;
      }
    }
    task.status = task.status === "done" ? "active" : "done";
    State.save();
    renderTasks();
    renderKanban();
  });
}

function bindCreateTask() {
  const form = document.querySelector("[data-task-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const task = {
      id: Utils.uid("task"),
      title: data.get("title"),
      status: "queued",
      priority: data.get("priority"),
      energy: data.get("energy"),
      estimate: Number(data.get("estimate")),
      mood: data.get("mood"),
      tags: data.get("tags").split(",").map((t) => t.trim()).filter(Boolean),
      due: data.get("due") || null,
      dependencies: data.get("dependencies").split(",").map((t) => t.trim()).filter(Boolean),
      recurring: data.get("recurring"),
      subtasks: [],
      dna: data.get("dna"),
      createdAt: Date.now()
    };
    State.tasks.unshift(task);
    State.save();
    renderTasks();
    renderKanban();
    Utils.toast("Task created");
    form.reset();
  });
}

function renderKanban() {
  const board = document.querySelector("[data-kanban]");
  if (!board) return;
  board.innerHTML = "";
  statusColumns.forEach((status) => {
    const column = document.createElement("div");
    column.className = "kanban-column";
    column.dataset.status = status;
    column.innerHTML = `<h4>${status.toUpperCase()}</h4>`;
    const tasks = State.tasks.filter((t) => t.status === status);
    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.draggable = true;
      card.dataset.taskId = task.id;
      card.innerHTML = `<strong>${task.title}</strong><div class="task-meta"><span class="chip">${task.priority}</span><span class="chip">${task.energy}</span></div>`;
      column.appendChild(card);
    });
    board.appendChild(column);
  });

  board.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("dragstart", () => card.classList.add("dragging"));
    card.addEventListener("dragend", () => card.classList.remove("dragging"));
  });

  board.querySelectorAll(".kanban-column").forEach((column) => {
    column.addEventListener("dragover", (event) => {
      event.preventDefault();
      const dragging = board.querySelector(".task-card.dragging");
      if (!dragging) return;
      column.appendChild(dragging);
    });
    column.addEventListener("drop", (event) => {
      const dragging = board.querySelector(".task-card.dragging");
      if (!dragging) return;
      const id = dragging.dataset.taskId;
      const task = State.tasks.find((t) => t.id === id);
      if (task) {
        task.status = column.dataset.status;
        State.save();
      }
    });
  });
}

function initTimeline() {
  const wrap = document.querySelector("[data-timeline]");
  if (!wrap) return;
  wrap.innerHTML = "";
  State.tasks.slice(0, 6).forEach((task) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `<strong>${task.title}</strong><p>${task.priority} • ${task.estimate} min • ${task.recurring}</p>`;
    wrap.appendChild(item);
  });
}

export function initTasks() {
  renderTasks();
  renderKanban();
  initTimeline();
  bindTaskActions();
  bindCreateTask();
}
