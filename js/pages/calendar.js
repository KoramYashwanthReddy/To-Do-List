import { State } from "../core/state.js";

function renderCalendar(offset = 0) {
  const calendar = document.querySelector("[data-calendar]");
  if (!calendar) return;
  calendar.innerHTML = "";
  const today = new Date();
  const current = new Date(today.getFullYear(), today.getMonth() + offset, 1);
  const monthLabel = document.querySelector("[data-calendar-label]");
  if (monthLabel) monthLabel.textContent = current.toLocaleString([], { month: "long", year: "numeric" });
  const startDay = current.getDay();
  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  for (let i = 0; i < startDay; i += 1) {
    const empty = document.createElement("div");
    empty.className = "day";
    calendar.appendChild(empty);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const cell = document.createElement("div");
    cell.className = "day";
    cell.innerHTML = `<strong>${day}</strong>`;
    const tasks = State.tasks.filter((t, index) => (index + day) % 7 === 0).slice(0, 2);
    tasks.forEach((task) => {
      const div = document.createElement("div");
      div.className = "chip";
      div.textContent = task.title.slice(0, 14);
      cell.appendChild(div);
    });
    calendar.appendChild(cell);
  }
}

function bindControls() {
  const prev = document.querySelector("[data-cal-prev]");
  const next = document.querySelector("[data-cal-next]");
  let offset = 0;
  renderCalendar(offset);
  if (prev) prev.addEventListener("click", () => renderCalendar(--offset));
  if (next) next.addEventListener("click", () => renderCalendar(++offset));

  const travel = document.querySelector("[data-time-travel]");
  const label = document.querySelector("[data-travel-label]");
  if (travel && label) {
    travel.addEventListener("input", () => {
      offset = Number(travel.value);
      label.textContent = offset === 0 ? "Now" : offset > 0 ? `+${offset} months` : `${offset} months`;
      renderCalendar(offset);
    });
  }
}

export function initCalendar() {
  bindControls();
}
