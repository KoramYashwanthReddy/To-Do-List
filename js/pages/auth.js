import { Auth } from "../core/auth.js";
import { Utils } from "../core/utils.js";

function bindLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = Auth.login({
      email: data.get("email"),
      password: data.get("password")
    });
    if (result.ok) {
      Utils.toast("Welcome back");
      window.location.href = "dashboard.html";
    } else {
      Utils.toast(result.message);
    }
  });
}

function bindSignup() {
  const form = document.querySelector("[data-signup-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = Auth.signup({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password")
    });
    if (result.ok) {
      Utils.toast("Account created");
      window.location.href = "dashboard.html";
    } else {
      Utils.toast(result.message);
    }
  });
}

export function initAuth() {
  bindLogin();
  bindSignup();
}
