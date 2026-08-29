type LayoutUpdater = (root: HTMLElement) => void;

export function observeResponsiveLayout(
  rootSelector: string,
  imageSelector: string,
  update: LayoutUpdater,
): void {
  const roots = Array.from(document.querySelectorAll<HTMLElement>(rootSelector));
  if (!roots.length) return;

  let frame = 0;
  const schedule = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => roots.forEach(update));
  };

  schedule();
  void document.fonts.ready.then(schedule);

  document.querySelectorAll<HTMLImageElement>(imageSelector).forEach((image) => {
    if (!image.complete) image.addEventListener("load", schedule, { once: true });
  });

  const observer = new ResizeObserver(schedule);
  roots.forEach((root) => observer.observe(root));
}
