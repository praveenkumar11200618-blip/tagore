const ARENA_STORAGE_KEY = "ai-fusion-2026-arena", ARENA_STAGES = ["idea", "prototype", "demo", "final-pitch", "judging", "winners"];
const ARENA_DATA = { updatedAt: null, teams: [{ id: 1, name: "Team Nova", track: "Healthcare", level: "prototype", progress: 65, status: "active", members: ["Member 1", "Member 2", "Member 3", "Member 4"] }, { id: 2, name: "Team CyberX", track: "Engineering", level: "demo", progress: 85, status: "active", members: ["Member 1", "Member 2", "Member 3", "Member 4"] }, { id: 3, name: "Team Terra", track: "Agriculture", level: "idea", progress: 30, status: "active", members: ["Member 1", "Member 2", "Member 3", "Member 4"] }, { id: 4, name: "Team Axis", track: "Architecture", level: "final-pitch", progress: 92, status: "active", members: ["Member 1", "Member 2", "Member 3", "Member 4"] }], winners: { champion: null, runnerUp: null, secondRunnerUp: null } };
let arenaData, arenaClient;
const safe = v => String(v || "").replace(/[&<>'\"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", "\"":"&quot;" })[c]), stageName = s => s.replace(/-/g, " ");
function loadArenaData() { try { const data = JSON.parse(localStorage.getItem(ARENA_STORAGE_KEY)) || structuredClone(ARENA_DATA); data.activity ||= []; return data; } catch { return structuredClone(ARENA_DATA); } }
function teamById(id) { return arenaData.teams.find(t => t.id === Number(id)); }
function logActivity(message) { (arenaData.activity ||= []).unshift({ id: Date.now(), message, time: new Date().toISOString() }); arenaData.activity = arenaData.activity.slice(0, 18); renderActivity(); }
function renderActivity() { if (!el("#activity-list")) return; const activity = arenaData.activity || []; el("#activity-count").textContent = activity.length ? `${activity.length} RECENT UPDATES` : "AWAITING UPDATES"; el("#activity-list").innerHTML = activity.length ? activity.map(item => `<article class="activity-item">${safe(item.message)}<time>${new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></article>`).join("") : '<p class="activity-empty">Organizer updates will appear here as the event progresses.</p>'; }
async function saveArenaData() { arenaData.updatedAt = new Date().toISOString(); localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(arenaData)); renderArena(); renderAdmin(); if (arenaClient) { const { error } = await arenaClient.from("arena_state").upsert({ id: "main", data: arenaData, updated_at: arenaData.updatedAt }); if (error) alert(`Live update was not published: ${error.message}`); } }
async function initArenaBackend() { const config = window.ARENA_SUPABASE; if (!config?.url || !config?.anonKey || !window.supabase) return; arenaClient = window.supabase.createClient(config.url, config.anonKey); const { data } = await arenaClient.from("arena_state").select("data").eq("id", "main").maybeSingle(); if (data?.data) { arenaData = data.data; localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(arenaData)); renderArena(); } arenaClient.channel("arena-state").on("postgres_changes", { event: "*", schema: "public", table: "arena_state", filter: "id=eq.main" }, payload => { if (payload.new?.data) { arenaData = payload.new.data; localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(arenaData)); renderArena(); renderAdmin(); } }).subscribe(); }
function fill(select, items, selected, blank = "") { select.innerHTML = `${blank ? `<option value="">${blank}</option>` : ""}${items.map(([v, l]) => `<option value="${v}" ${String(v) === String(selected) ? "selected" : ""}>${safe(l)}</option>`).join("")}`; }
function renderArena() { arenaData ||= loadArenaData(); const stats = { totalTeams: arenaData.teams.length, activeTeams: arenaData.teams.filter(t => t.status === "active").length, finalists: arenaData.teams.filter(t => ["final-pitch", "judging", "winners"].includes(t.level)).length, winners: Object.values(arenaData.winners).filter(Boolean).length }; el("#arena-stats").innerHTML = Object.entries(stats).map(([k, v]) => `<div class="stat"><b>${v}</b><small>${k.replace(/([A-Z])/g, " $1")}</small></div>`).join(""); el("#kanban").innerHTML = ARENA_STAGES.map(s => { const teams = arenaData.teams.filter(t => t.level === s); return `<div class="stage"><header>${stageName(s)}<span>${teams.length}</span></header><div class="stage-teams">${teams.map(t => `<button class="team-card" data-id="${t.id}" type="button"><span class="status">● ${safe(t.status)}</span><b>${safe(t.name)}</b><small>${safe(t.track)}</small><div class="progress"><i style="width:${t.progress}%"></i></div><em>${t.progress}%</em></button>`).join("") || '<p class="empty">Awaiting teams</p>'}</div></div>`; }).join(""); const places = [["Champion", "champion"], ["Runner-up", "runnerUp"], ["Second runner-up", "secondRunnerUp"]].filter(([, k]) => arenaData.winners[k]); el("#podium").innerHTML = places.length ? `<div class="podium-winners">${places.map(([label, key]) => { const t = teamById(arenaData.winners[key]); return `<div class="podium-winner"><small>${label}</small><b>${safe(t?.name)}</b><span>${safe(t?.track)}</span></div>`; }).join("")}</div>` : "<p>WINNERS WILL BE ANNOUNCED HERE</p>"; el("#arena-updated").textContent = arenaData.updatedAt ? new Date(arenaData.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "JUST NOW"; els(".team-card").forEach(card => card.onclick = () => openTeam(Number(card.dataset.id))); }
function openTeam(id) { const t = teamById(id), active = ARENA_STAGES.indexOf(t.level); el("#modal-content").innerHTML = `<p class="eyebrow">${safe(t.track)}</p><h2 id="modal-title">${safe(t.name)}</h2><p><b>${t.progress}%</b> COMPLETE · <b>${safe(t.status).toUpperCase()}</b></p><h4>TEAM MEMBERS</h4><p>${t.members.map(safe).join(" · ")}</p><div class="modal-timeline">${ARENA_STAGES.map((s, i) => `<span class="${i <= active ? "done" : ""}">${i < active ? "✓" : i === active ? "●" : "○"} ${stageName(s)}</span>`).join("")}</div>`; el("#team-modal").classList.add("open"); }
function resetForm() { el("#arena-team-form").reset(); el("#arena-team-id").value = ""; el("#arena-team-progress").value = 50; el("#arena-progress-output").textContent = "50%"; fill(el("#arena-team-track"), TRACK_DATA.map(t => [t[0], t[0]]), ""); fill(el("#arena-team-level"), ARENA_STAGES.map(s => [s, stageName(s)]), "idea"); }
function editTeam(id) { const t = teamById(id); el("#arena-team-id").value = t.id; el("#arena-team-name").value = t.name; fill(el("#arena-team-track"), TRACK_DATA.map(x => [x[0], x[0]]), t.track); fill(el("#arena-team-level"), ARENA_STAGES.map(s => [s, stageName(s)]), t.level); el("#arena-team-progress").value = t.progress; el("#arena-progress-output").textContent = `${t.progress}%`; el("#arena-team-status").value = t.status; el("#arena-team-members").value = t.members.join(", "); }
function renderAdmin() { if (!el("#arena-admin-teams")) return; el("#arena-admin-teams").innerHTML = arenaData.teams.map(t => `<div class="admin-team"><span><b>${safe(t.name)}</b> <small>${safe(t.track)} · ${stageName(t.level)}</small></span><button class="edit-team" data-id="${t.id}" type="button">EDIT</button><button class="delete-team" data-id="${t.id}" type="button">DELETE</button></div>`).join(""); const options = arenaData.teams.map(t => [t.id, t.name]); fill(el("#arena-champion"), options, arenaData.winners.champion, "Not published"); fill(el("#arena-runner-up"), options, arenaData.winners.runnerUp, "Not published"); fill(el("#arena-second-runner-up"), options, arenaData.winners.secondRunnerUp, "Not published"); els(".edit-team").forEach(b => b.onclick = () => editTeam(Number(b.dataset.id))); els(".delete-team").forEach(b => b.onclick = () => { if (confirm("Delete this team?")) { const id = Number(b.dataset.id); arenaData.teams = arenaData.teams.filter(t => t.id !== id); Object.keys(arenaData.winners).forEach(k => { if (Number(arenaData.winners[k]) === id) arenaData.winners[k] = null; }); saveArenaData(); } }); }
async function organizerAuthorized() { if (!arenaClient) return true; const { data: { session } } = await arenaClient.auth.getSession(); if (session) return true; const email = prompt("Organizer email"); if (!email) return false; const password = prompt("Password"); if (!password) return false; const { error } = await arenaClient.auth.signInWithPassword({ email, password }); if (error) { alert(`Sign-in failed: ${error.message}`); return false; } return true; }
function initArenaAdmin() { el("#arena-manage").onclick = async () => { if (!await organizerAuthorized()) return; resetForm(); renderAdmin(); el("#arena-admin-modal").classList.add("open"); }; el("#arena-admin-close").onclick = () => el("#arena-admin-modal").classList.remove("open"); el("#arena-form-reset").onclick = resetForm; el("#arena-team-progress").oninput = e => el("#arena-progress-output").textContent = `${e.target.value}%`; el("#arena-team-form").onsubmit = e => { e.preventDefault(); const id = Number(el("#arena-team-id").value), t = { id: id || Date.now(), name: el("#arena-team-name").value.trim(), track: el("#arena-team-track").value, level: el("#arena-team-level").value, progress: Number(el("#arena-team-progress").value), status: el("#arena-team-status").value, members: el("#arena-team-members").value.split(",").map(n => n.trim()).filter(Boolean) }; arenaData.teams = id ? arenaData.teams.map(x => x.id === id ? t : x) : [...arenaData.teams, t]; saveArenaData(); resetForm(); }; el("#arena-save-winners").onclick = () => { arenaData.winners = { champion: el("#arena-champion").value || null, runnerUp: el("#arena-runner-up").value || null, secondRunnerUp: el("#arena-second-runner-up").value || null }; saveArenaData(); }; window.addEventListener("storage", e => { if (e.key === ARENA_STORAGE_KEY) { arenaData = loadArenaData(); renderArena(); renderAdmin(); } }); initArenaBackend(); }
const baseRenderArena = renderArena;
renderArena = function () { baseRenderArena(); renderActivity(); };
document.addEventListener("submit", event => { if (event.target.id !== "arena-team-form") return; const name = el("#arena-team-name").value.trim() || "A team"; logActivity(`${name} was ${el("#arena-team-id").value ? "updated" : "added"} to the Arena`); }, true);
document.addEventListener("click", event => { if (event.target.id === "arena-save-winners") logActivity("Final results were published"); }, true);

// Firebase implementation: active when js/firebase-config.js is present.
let firebaseDb, firebaseAuth;
async function saveArenaData() {
  arenaData.updatedAt = new Date().toISOString();
  localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(arenaData));
  renderArena(); renderAdmin();
  if (firebaseDb) {
    try { await firebaseDb.collection("arena").doc("state").set(arenaData); }
    catch (error) { alert(`Live update was not published: ${error.message}`); }
  }
}
async function initArenaBackend() {
  const config = window.ARENA_FIREBASE;
  if (!config?.apiKey || config.apiKey.startsWith("YOUR_") || !window.firebase) {
    arenaData = loadArenaData();
    renderArena();
    return;
  }
  if (!firebase.apps.length) firebase.initializeApp(config);
  firebaseDb = firebase.firestore(); firebaseAuth = firebase.auth();
  firebaseDb.collection("arena").doc("state").onSnapshot(snapshot => {
    if (!snapshot.exists) return;
    arenaData = snapshot.data(); arenaData.activity ||= [];
    localStorage.setItem(ARENA_STORAGE_KEY, JSON.stringify(arenaData));
    renderArena(); renderAdmin();
  }, error => console.error("Live Arena connection failed", error));
}
async function organizerAuthorized() {
  const config = window.ARENA_FIREBASE;
  if (!config?.apiKey || config.apiKey.startsWith("YOUR_") || !window.firebase) return true;
  if (!firebaseAuth) {
    if (!firebase.apps.length) firebase.initializeApp(config);
    firebaseAuth = firebase.auth();
  }
  let user = firebaseAuth.currentUser;
  if (!user) {
    try { user = (await firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).user; }
    catch (error) { alert(`Google sign-in failed: ${error.message}`); return false; }
  }
  const admins = (config.adminEmails || []).map(email => email.toLowerCase());
  if (!admins.includes((user.email || "").toLowerCase())) { alert("This Google account is not an approved Arena organizer."); await firebaseAuth.signOut(); return false; }
  return true;
}
