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
  setTimeout(() => el(".page-loader").classList.add("done"), 900);
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
