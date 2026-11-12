import { store } from "./store";

export type Theme = "dark" | "light";

const KEY = "theme";
const listeners = new Set<() => void>();

/**
 * Runs inline in <head> before first paint so there is never a flash of the
 * wrong theme. Falls back to the OS preference, then to dark.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function emit() {
  store.theme = getTheme();
  listeners.forEach((l) => l());
}

/** Re-reads the theme the init script chose (called once after hydration). */
export function syncTheme() {
  emit();
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode: the choice just won't persist */
  }
  emit();
  window.setTimeout(() => root.classList.remove("theme-transition"), 500);
}

export function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
