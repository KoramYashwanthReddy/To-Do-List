import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

function renderProfile() {
  const name = document.querySelector("[data-profile-name]");
  const title = document.querySelector("[data-profile-title]");
  const xp = document.querySelector("[data-profile-xp]");
  const level = document.querySelector("[data-profile-level]");
  if (name) name.textContent = State.profile.name;
  if (title) title.textContent = State.profile.title;
  if (xp) xp.textContent = `${State.profile.xp} XP`;
  if (level) level.textContent = `Level ${State.profile.level}`;
}

function drawAvatar(seed = 42) {
  const canvas = document.querySelector("#avatar");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = 120;
  canvas.height = 120;
  ctx.clearRect(0, 0, 120, 120);
  const colors = ["#6fffe9", "#7a6cff", "#ffb86b", "#ff6b9a"];
  for (let i = 0; i < 6; i += 1) {
    const color = colors[(seed + i) % colors.length];
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(60, 60, 50 - i * 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.font = "28px Space Grotesk";
  ctx.fillText(State.profile.name.slice(0, 2).toUpperCase(), 42, 70);
}

function bindProfileForm() {
  const form = document.querySelector("[data-profile-form]");
  if (!form) return;
  form.name.value = State.profile.name;
  form.title.value = State.profile.title;
  form.email.value = State.profile.email;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    State.profile.name = form.name.value;
    State.profile.title = form.title.value;
    State.profile.email = form.email.value;
    State.save();
    drawAvatar(State.profile.name.length * 9);
    renderProfile();
    Utils.toast("Profile updated");
  });

  const regen = document.querySelector("[data-avatar-refresh]");
  if (regen) regen.addEventListener("click", () => drawAvatar(Math.floor(Math.random() * 100)));
}

export function initProfile() {
  renderProfile();
  drawAvatar(State.profile.name.length * 7);
  bindProfileForm();
}
