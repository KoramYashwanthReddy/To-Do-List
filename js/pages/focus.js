import { State } from "../core/state.js";
import { Utils } from "../core/utils.js";

let audioCtx;
let oscillator;

function initAmbient() {
  const toggle = document.querySelector("[data-ambient]");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (!oscillator) {
      oscillator = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 140;
      gain.gain.value = 0.04;
      oscillator.connect(gain);
      gain.connect(audioCtx.destination);
      oscillator.start();
      toggle.textContent = "Stop Ambient";
    } else {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
      toggle.textContent = "Start Ambient";
    }
  });
}

function initFocusSession() {
  const start = document.querySelector("[data-focus-go]");
  const meter = document.querySelector("[data-focus-meter]");
  const distraction = document.querySelector("[data-distraction]");
  if (!start) return;
  let running = false;
  let score = 100;
  start.addEventListener("click", () => {
    running = !running;
    start.textContent = running ? "End Session" : "Start Session";
    if (running) {
      score = 100;
      const interval = setInterval(() => {
        if (!running) {
          clearInterval(interval);
          return;
        }
        score = Utils.clamp(score - Math.random() * 4, 40, 100);
        if (meter) meter.textContent = `${Math.round(score)}%`;
        if (distraction) distraction.textContent = score < 70 ? "High" : "Low";
      }, 1200);
    } else {
      Utils.toast("Deep work session logged");
    }
  });
}

export function initFocus() {
  Utils.requestNotify();
  initAmbient();
  initFocusSession();
  const profile = document.querySelector("[data-focus-style]");
  if (profile) profile.textContent = State.profile.focusStyle;
}
