function initAnimations() {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-enabled");

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const revealItems = document.querySelectorAll(
      ".hero-copy > *, .hero-art, .section:not(.hero) > *, .hero-winner-grid > article, .best-team-grid > article",
    );
    revealItems.forEach((item, index) => {
      item.classList.add("motion-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 210)}ms`);
      if (item.closest(".hero")) {
        requestAnimationFrame(() => item.classList.add("is-visible"));
      } else {
        observer.observe(item);
      }
    });
  }

  if (reduceMotion || !matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  if (!cursorDot || !cursorRing) return;

  let pointerFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  document.addEventListener(
    "pointermove",
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        const transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
        cursorDot.style.transform = transform;
        cursorRing.style.transform = transform;
        pointerFrame = 0;
      });
    },
    { passive: true },
  );
}
