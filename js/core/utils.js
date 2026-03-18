const Utils = {
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },
  throttle(fn, limit = 300) {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
  uid(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  },
  formatTime(date = new Date()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  },
  formatDate(date = new Date()) {
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  },
  toast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2600);
  },
  notify(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  },
  requestNotify() {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  },
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
};

export { Utils };
