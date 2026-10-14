function renderApp() {
  document.title = `${EVENT_DATA.name} | ${EVENT_DATA.tagline}`;
  el(".hero-tagline").textContent = EVENT_DATA.tagline;
  el(".event-date").textContent = EVENT_DATA.date;
  el(".event-time").textContent = EVENT_DATA.time;
  el(".hero-place").textContent = EVENT_DATA.institution.toUpperCase();
  el(".event-fee").textContent = EVENT_DATA.registrationFee;
  el("#management-grid").innerHTML = MANAGEMENT_DATA.map(
    (x) => `<article class="leader-card"><div class="portrait"><img src="${x[2]}" alt="${x[1]}" loading="lazy" onerror="this.style.display='none'"><span>AI</span></div><p>${x[0]}</p><h3>${x[1] || "Name"}</h3></article>`,
  ).join("");
  el(".contact-name").textContent = EVENT_DATA.contact.name;
  el(".contact-phone").textContent = EVENT_DATA.contact.phone;
  el(".contact-phone").href = "tel:+919865654274";
  el("#call-link").href = "tel:+919865654274";
  el(".footer-tagline").textContent = EVENT_DATA.tagline;
  el(".footer-place").innerHTML =
    `${EVENT_DATA.institution}<br>${EVENT_DATA.address}<br><br>IN ASSOCIATION WITH<br><b>${EVENT_DATA.association}</b>`;
  el("#best-teams-list").innerHTML = BEST_TEAM_DATA.map(
    (team, index) => `
      <article class="best-team-card">
        <div class="best-team-number" aria-label="Team ${index + 1}">${String(index + 1).padStart(2, "0")}</div>
        <div class="best-team-content">
          <h3>${team.name}</h3>
          <div class="best-team-college">
            <span class="best-team-label">COLLEGE</span>
            <strong>${team.college}</strong>
          </div>
          <div class="best-team-leader">
            <span class="best-team-label">TEAM LEADER</span>
            <strong>${team.leader}</strong>
          </div>
          <div class="best-team-members">
            <span class="best-team-label">TEAM MEMBERS</span>
            <ul>${team.members.map((member) => `<li>${member}</li>`).join("")}</ul>
          </div>
        </div>
      </article>
    `,
  ).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderApp();
  initNavigation();
  initAnimations();
});
