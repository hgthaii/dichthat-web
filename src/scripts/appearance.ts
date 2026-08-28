export type ThemePreference = "system" | "light" | "dark";

const STORAGE_KEY = "dichthat-theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

function isTheme(value: string | null | undefined): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function preference(): ThemePreference {
  const saved = localStorage.getItem(STORAGE_KEY);
  return isTheme(saved) ? saved : "system";
}

function resolvedTheme(value: ThemePreference): "light" | "dark" {
  return value === "system" ? (media.matches ? "dark" : "light") : value;
}

function applyTheme(value: ThemePreference): void {
  const resolved = resolvedTheme(value);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = value;
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content",
    resolved === "dark" ? "#0d0d0d" : "#f7f7f7",
  );

  document.querySelectorAll<HTMLButtonElement>("[data-theme-option]").forEach((button) => {
    const active = button.dataset.themeOption === value;
    button.setAttribute("aria-checked", String(active));
    button.classList.toggle("is-selected", active);
  });
}

export function initializeAppearance(): void {
  const root = document.querySelector<HTMLElement>("[data-appearance-root]");
  const trigger = root?.querySelector<HTMLButtonElement>("[data-appearance-trigger]");
  const menu = root?.querySelector<HTMLElement>("[data-appearance-menu]");
  if (!root || !trigger || !menu) return;

  const close = (): void => {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  const open = (): void => {
    menu.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    menu.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
  };

  applyTheme(preference());
  trigger.addEventListener("click", () => (menu.hidden ? open() : close()));

  root.querySelectorAll<HTMLButtonElement>("[data-theme-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.themeOption;
      if (!isTheme(selected)) return;
      localStorage.setItem(STORAGE_KEY, selected);
      applyTheme(selected);
      close();
      trigger.focus();
    });
  });

  document.addEventListener("pointerdown", (event) => {
    if (!root.contains(event.target as Node)) close();
  });

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
      trigger.focus();
    }
  });

  media.addEventListener("change", () => {
    if (preference() === "system") applyTheme("system");
  });
}
