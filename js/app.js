function renderApp() {
  document.title = `${EVENT_DATA.name} | ${EVENT_DATA.tagline}`;
  initAnnouncement();
  els("[data-register]").forEach((a) => {
    a.href = EVENT_DATA.registrationUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
  el(".hero-tagline").textContent = EVENT_DATA.tagline;
  el(".event-date").textContent = EVENT_DATA.date;
  el(".event-time").textContent = EVENT_DATA.time;
  el(".hero-place").textContent = EVENT_DATA.institution.toUpperCase();
  el(".event-fee").textContent = EVENT_DATA.registrationFee;
  initCountdown();
  el("#stats").innerHTML = [
    ["06", "AI TRACKS"],
    ["04", "MEMBERS / TEAM"],
    ["01", "DAY"],
    [EVENT_DATA.registrationFee, "PER TEAM"],
  ]
    .map(
      (x) =>
        `<div class="stat"><b data-count="${parseInt(x[0]) || 0}">${x[0]}</b><small>${x[1]}</small></div>`,
    )
    .join("");
  el("#tracks-grid").innerHTML = TRACK_DATA.map(
    (t, i) => {
      const [title, description, icon, themes, image] = t;
      return `<article class="track-card tilt" style="--track-image: url('${image}');"><div class="track-card-inner"><span class="track-num">0${i + 1}</span><div class="track-header"><i>${icon}</i><span class="track-badge">AI TRACK</span></div><h3>${title}</h3><p>${description}</p><ul>${themes.map((a) => `<li>${a}</li>`).join("")}</ul><button class="explore track-details" data-track-index="${i}" type="button">VIEW DETAILS <b>→</b></button></div></article>`;
    },
  ).join("");
  els(".track-details").forEach((button) => {
    button.onclick = () => openTrackDetails(Number(button.dataset.trackIndex));
  });
  el("#fusion-grid").insertAdjacentHTML(
    "afterbegin",
    TRACK_DATA.map(
      (t, i) => `<button class="fusion-domain fd${i}">${t[0]}</button>`,
    ).join(""),
  );
  el("#timeline").innerHTML = TIMELINE_DATA.map(
    (x) =>
      `<article class="timeline-item ${x[2]}"><span>${x[0]}</span><b>${x[2] === "complete" ? "✓" : x[2] === "live" ? "●" : "○"}</b><h3>${x[1]}</h3></article>`,
  ).join("");
  els(".timeline-item").forEach((item, index) => {
    const [, , , description, location] = TIMELINE_DATA[index];
    item.insertAdjacentHTML("beforeend", `<p>${description}</p><small>${location}</small>`);
  });
  const completedStages = TIMELINE_DATA.findIndex((item) => item[2] !== "complete");
  const completedCount = completedStages === -1 ? TIMELINE_DATA.length : completedStages;
  const progress = TIMELINE_DATA.length > 1
    ? Math.max(0, (completedCount - 1) / (TIMELINE_DATA.length - 1) * 100)
    : 0;
  el("#timeline").style.setProperty("--completed-progress", `${progress}%`);
  el("#awards-list").innerHTML = AWARD_DATA.map(
    (a, i) => `<p><span>0${i + 1}</span>${a}<b>→</b></p>`,
  ).join("");
  el("#management-grid").innerHTML = MANAGEMENT_DATA.map(
    (x) => `<article class="leader-card"><div class="portrait"><img src="${x[2]}" alt="${x[1]}" loading="lazy" onerror="this.style.display='none'"><span>AI</span></div><p>${x[0]}</p><h3>${x[1] || "Name"}</h3></article>`,
  ).join("");
  el("#faq-list").innerHTML = FAQ_DATA.map(
    (x, i) =>
      `<article class="faq-item"><button aria-expanded="false"><span>0${i + 1}</span>${x[0]}<b>+</b></button><div><p>${x[1]}</p></div></article>`,
  ).join("");
  el(".contact-name").textContent = EVENT_DATA.contact.name;
  el(".contact-phone").textContent = EVENT_DATA.contact.phone;
  el(".contact-phone").href = "tel:+919865654274";
  el("#call-link").href = "tel:+919865654274";
  el(".footer-tagline").textContent = EVENT_DATA.tagline;
  el(".footer-place").innerHTML =
    `${EVENT_DATA.institution}<br>${EVENT_DATA.address}<br><br>IN ASSOCIATION WITH<br><b>${EVENT_DATA.association}</b>`;
  els(".faq-item button").forEach(
    (b) =>
      (b.onclick = () => {
        let o = b.parentElement.classList.toggle("open");
        b.setAttribute("aria-expanded", o);
      }),
  );
}

function openTrackDetails(index) {
  const [title, description, icon, themes] = TRACK_DATA[index];
  const modal = el("#track-modal");
  el("#track-modal-content").innerHTML = `<p class="eyebrow">${icon} AI TRACK 0${index + 1}</p><h2 id="track-modal-title">${title}</h2><p class="track-modal-description">${description}</p><h4>BUILD IDEAS</h4><ul class="track-modal-themes">${themes.map((theme) => `<li>${theme}</li>`).join("")}</ul>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  el("#track-modal-close").focus();
}

function initTrackModal() {
  const modal = el("#track-modal");
  const close = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); };
  el("#track-modal-close").onclick = close;
  modal.onclick = (event) => { if (event.target === modal) close(); };
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("open")) close(); });
}

function initAnnouncement() {
  const banner = el("#announcement-bar");
  const dismissedKey = "ai-fusion-announcement-dismissed";
  el("#announcement-message").textContent = EVENT_DATA.announcement;
  if (sessionStorage.getItem(dismissedKey) === "true") banner.hidden = true;
  el("#announcement-close").onclick = () => {
    banner.hidden = true;
    sessionStorage.setItem(dismissedKey, "true");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  initTrackModal();
  initNavigation();
  initAnimations();
});

function initCountdown() {
  const target = new Date(EVENT_DATA.countdownTarget).getTime();
  const units = ["days", "hours", "minutes", "seconds"].reduce(
    (all, unit) => ({ ...all, [unit]: el(`#countdown-${unit}`) }),
    {},
  );
  let timer;

  const update = () => {
    const remaining = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(remaining / 86400000),
      hours: Math.floor((remaining / 3600000) % 24),
      minutes: Math.floor((remaining / 60000) % 60),
      seconds: Math.floor((remaining / 1000) % 60),
    };
    Object.entries(values).forEach(([unit, value]) => {
      units[unit].textContent = String(value).padStart(2, "0");
    });
    if (!remaining) {
      el(".countdown-label").textContent = "AI FUSION 2026 IS LIVE";
      window.clearInterval(timer);
    }
  };

  update();
  timer = window.setInterval(update, 1000);
}
