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
  const navLinks = els("#main-nav a");
  const sectionByHash = new Map(navLinks.map((link) => [link.hash, link]));
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleSection) return;
      const activeLink = sectionByHash.get(`#${visibleSection.target.id}`);
      if (!activeLink) return;
      navLinks.forEach((link) => link.classList.toggle("active", link === activeLink));
    },
    { threshold: 0.15 },
  );
  els("main section[id]").forEach((section) => {
    if (sectionByHash.has(`#${section.id}`)) sectionObserver.observe(section);
  });
  window.addEventListener(
    "scroll",
    () => el(".site-header").classList.toggle("scrolled", scrollY > 20),
    { passive: true },
  );
}
