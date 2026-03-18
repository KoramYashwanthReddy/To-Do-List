import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

function renderExperiments() {
  const list = document.querySelector("[data-experiments]");
  if (!list) return;
  list.innerHTML = "";
  State.experiments.forEach((exp) => {
    const card = document.createElement("div");
    card.className = "card glass";
    card.innerHTML = `
      <strong>${exp.name}</strong>
      <p>Status: ${exp.status}</p>
      <p>Outcome: ${exp.outcome}</p>
      <p>Days: ${exp.days}</p>
    `;
    list.appendChild(card);
  });
}

function bindExperimentForm() {
  const form = document.querySelector("[data-exp-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    State.experiments.unshift({
      id: Utils.uid("exp"),
      name: data.get("name"),
      status: data.get("status"),
      outcome: "?",
      days: Number(data.get("days"))
    });
    State.save();
    renderExperiments();
    Utils.toast("Experiment logged");
    form.reset();
  });
}

export function initLab() {
  renderExperiments();
  bindExperimentForm();
}
