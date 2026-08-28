const REVEAL_SELECTOR = "main > section, body > footer";

export function initializeRevealMotion(): void {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
  if (!elements.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -7%",
    },
  );

  elements.forEach((element) => {
    element.classList.add("reveal-ready");
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.9) {
      requestAnimationFrame(() => element.classList.add("is-visible"));
    } else {
      observer.observe(element);
    }
  });
}
