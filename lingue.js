// Lingua delle pagine del caso: gli elementi con data-t prendono il testo da T (definito nella pagina), quelli con data-l si vedono solo nella loro lingua.
let L = (() => { try { return localStorage.getItem("lingua"); } catch (e) { return null; } })() || (navigator.language || "it").slice(0, 2);
if (!T[L]) L = "it";
function lingua(l) {
  L = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-t]").forEach(e => e.textContent = T[l][e.dataset.t]);
  document.querySelectorAll("[data-l]").forEach(e => e.hidden = e.dataset.l !== l);
  document.querySelectorAll(".lingue button").forEach(b => b.classList.toggle("attiva", b.dataset.lingua === l));
  try { localStorage.setItem("lingua", l); } catch (e) {}
}
document.querySelectorAll(".lingue button").forEach(b => b.onclick = () => lingua(b.dataset.lingua));
lingua(L);
