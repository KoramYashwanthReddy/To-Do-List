import { State } from "../core/state.js";
import { Storage } from "../core/storage.js";
import { Utils } from "../core/utils.js";

function bindSettings() {
  const form = document.querySelector("[data-settings-form]");
  if (!form) return;
  form.focusLength.value = State.settings.focusLength;
  form.breakLength.value = State.settings.breakLength;
  form.soundscape.value = State.settings.soundscape;
  form.autoSchedule.checked = State.settings.autoSchedule;
  form.notifications.checked = State.settings.notifications;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    State.settings.focusLength = Number(form.focusLength.value);
    State.settings.breakLength = Number(form.breakLength.value);
    State.settings.soundscape = form.soundscape.value;
    State.settings.autoSchedule = form.autoSchedule.checked;
    State.settings.notifications = form.notifications.checked;
    State.save();
    Utils.toast("Settings saved");
  });
}

function bindExportImport() {
  const exportBtn = document.querySelector("[data-export]");
  const importInput = document.querySelector("[data-import]");
  const backupBtn = document.querySelector("[data-backup]");

  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const payload = Storage.exportAll();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "pulseos-backup.json";
      link.click();
      URL.revokeObjectURL(url);
    });
  }

  if (backupBtn) {
    backupBtn.addEventListener("click", () => {
      localStorage.setItem("pulseos.backup.snapshot", JSON.stringify(Storage.exportAll()));
      Utils.toast("Backup snapshot stored locally");
    });
  }

  if (importInput) {
    importInput.addEventListener("change", () => {
      const file = importInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const payload = JSON.parse(reader.result);
          Storage.importAll(payload);
          Utils.toast("Data imported. Refreshing...");
          window.location.reload();
        } catch (err) {
          Utils.toast("Invalid backup file");
        }
      };
      reader.readAsText(file);
    });
  }
}

export function initSettings() {
  bindSettings();
  bindExportImport();
}
