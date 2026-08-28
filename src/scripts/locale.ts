import { resolveTranslation, type Locale } from "../i18n";

const STORAGE_KEY = "dichthat-locale";

function isLocale(value: string | null | undefined): value is Locale {
  return value === "vi" || value === "en";
}

function browserLocale(): Locale {
  return navigator.languages.some((locale) => locale.toLowerCase().startsWith("vi"))
    ? "vi"
    : "en";
}

function applyLocale(locale: Locale): void {
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    const value = resolveTranslation(locale, key);
    if (value) element.textContent = value.replace("{year}", String(new Date().getFullYear()));
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (!key) return;
    const value = resolveTranslation(locale, key);
    if (value) element.setAttribute("aria-label", value);
  });

  document.querySelectorAll<HTMLButtonElement>("[data-locale]").forEach((button) => {
    const active = button.dataset.locale === locale;
    button.setAttribute("aria-pressed", String(active));
    button.classList.toggle("is-active", active);
  });

  const title = resolveTranslation(locale, "meta.title");
  const description = resolveTranslation(locale, "meta.description");
  if (title) document.title = title;
  if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);

  document.dispatchEvent(new CustomEvent("dichthat:locale", { detail: { locale } }));
}

export function initializeLocale(): void {
  const saved = localStorage.getItem(STORAGE_KEY);
  const locale = isLocale(saved) ? saved : browserLocale();
  applyLocale(locale);

  document.querySelectorAll<HTMLButtonElement>("[data-locale]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.locale;
      if (!isLocale(selected)) return;
      localStorage.setItem(STORAGE_KEY, selected);
      applyLocale(selected);
    });
  });
}
