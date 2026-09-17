function initNavigation() {
  let nav = el("#main-nav");
  nav.innerHTML = NAV_DATA.map((x) => `<a href="#${x[1]}">${x[0]}</a>`).join(
    "",
  );
  let menu = el(".menu-button");
  const closeMenu = () => {
    nav.classList.remove("open");
    menu.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  };
  menu.onclick = () => {
    const open = nav.classList.toggle("open");
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", open);
  };
  els("#main-nav a").forEach((a) => (a.onclick = closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  let sections = els("main section[id]");
  new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          els("#main-nav a").forEach((a) =>
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + e.target.id,
            ),
          );
        }
      }),
    { threshold: 0.35 },
  ).observe
    ? sections.forEach((s) =>
        new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting)
                els("#main-nav a").forEach((a) =>
                  a.classList.toggle("active", a.hash === "#" + e.target.id),
                );
            }),
          { threshold: 0.35 },
        ).observe(s),
      )
    : 0;
  window.addEventListener(
    "scroll",
    () => el(".site-header").classList.toggle("scrolled", scrollY > 20),
    { passive: true },
  );
}
