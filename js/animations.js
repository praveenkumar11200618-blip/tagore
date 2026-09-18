function initAnimations() {
  let reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero-copy>*", {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      delay: 0.35,
    });
    gsap.from(".hero-art", {
      scale: 0.75,
      opacity: 0,
      duration: 1,
      delay: 0.45,
    });
    gsap.utils
      .toArray(".section:not(.hero)")
      .forEach((s) =>
        gsap.from(s.children, {
          scrollTrigger: { trigger: s, start: "top 82%" },
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.65,
        }),
      );
  }
  runLoader();
  if (!reduce) {
    document.addEventListener("mousemove", (e) => {
      el(".cursor-dot").style.cssText =
        `left:${e.clientX}px;top:${e.clientY}px`;
      el(".cursor-ring").style.cssText =
        `left:${e.clientX}px;top:${e.clientY}px`;
    });
    els(".tilt,.track-card,.team-card").forEach((c) => {
      c.addEventListener("mousemove", (e) => {
        let r = c.getBoundingClientRect();
        c.style.setProperty("--x", `${e.clientX - r.left}px`);
        c.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
      c.addEventListener("mouseenter", () => c.classList.add("hover"));
    });
    els(".magnetic").forEach((b) =>
      b.addEventListener("mousemove", (e) => {
        let r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.1}px,${(e.clientY - r.top - r.height / 2) * 0.13}px)`;
      }),
    );
    els(".magnetic").forEach((b) =>
      b.addEventListener("mouseleave", () => (b.style.transform = "")),
    );
  }
  els("[data-count]").forEach((n) => {
    let target = +n.dataset.count;
    if (target && window.gsap)
      ScrollTrigger.create({
        trigger: n,
        start: "top 90%",
        once: true,
        onEnter: () =>
          gsap.to(n, {
            innerText: target,
            duration: 1.2,
            snap: { innerText: 1 },
          }),
      });
  });
}
/* --------------------------------------------------------------------------
 * Fusion Boot Sequence — drives the page-loader:
 * progress bar (0→100%), percentage readout, and a typewriter status log.
 * -------------------------------------------------------------------------- */
function runLoader() {
  const loader = el(".page-loader");
  if (!loader) return;
  const status = el(".loader-status", loader);
  const barFill = el(".loader-bar i", loader);
  const pctEl = el(".loader-pct", loader);
  const lines = [
    "INITIALIZING INNOVATION SYSTEM...",
    "BOOTING NEURAL FUSION CORE...",
    "LOADING TRACK DATASET...",
    "SYNCING LEADERSHIP GRID...",
    "CALIBRATING ARENA PROTOCOLS...",
    "FUSION ONLINE ✦",
  ];

  /* Progress 0 → 100% with an ease-out curve (~1.5s). */
  const start = Date.now();
  const dur = 1500;
  const tickProgress = () => {
    const t = Math.min(1, (Date.now() - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const p = Math.round(eased * 100);
    if (pctEl) pctEl.textContent = `${p}%`;
    if (barFill) barFill.style.width = `${p}%`;
    if (t < 1) requestAnimationFrame(tickProgress);
  };

  /* Typewriter walk through the boot log. */
  let li = 0;
  let ci = 1;
  const typeLine = () => {
    const line = lines[Math.min(li, lines.length - 1)];
    if (ci < line.length) {
      ci++;
      if (status) status.textContent = line.slice(0, ci);
      setTimeout(typeLine, 24 + Math.random() * 30);
    } else if (li < lines.length - 1) {
      li++;
      ci = 1;
      setTimeout(typeLine, 220);
    }
  };

  requestAnimationFrame(tickProgress);
  setTimeout(typeLine, 80);

  /* Mark complete, snap to final line, then fade out. */
  setTimeout(() => {
    loader.classList.add("complete");
    if (status) status.textContent = lines[lines.length - 1];
    setTimeout(() => loader.classList.add("done"), 520);
  }, dur);
}
