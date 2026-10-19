// Lingua delle pagine del caso: gli elementi con data-t prendono il testo da T (definito nella pagina), quelli con data-l si vedono solo nella loro lingua.
// Ordine: ?lang= nell'indirizzo, poi la scelta salvata (vale per tutte le pagine del sito), poi la lingua del telefono.
let L = new URLSearchParams(location.search).get("lang")
  || (() => { try { return localStorage.getItem("lingua"); } catch (e) { return null; } })()
  || (navigator.language || "it").slice(0, 2);
if (!T[L]) L = "it";
function lingua(l) {
  L = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-t]").forEach(e => e.textContent = T[l][e.dataset.t]);
  document.querySelectorAll("[data-l]").forEach(e => e.hidden = e.dataset.l !== l);
  document.querySelectorAll(".lingue button").forEach(b => b.classList.toggle("attiva", b.dataset.lingua === l));
  try { localStorage.setItem("lingua", l); } catch (e) {}
  // i link interni si portano dietro la lingua, così funziona anche dove il browser non salva niente
  document.querySelectorAll("a[href]").forEach(a => {
    const u = new URL(a.getAttribute("href"), location.href);
    if (u.origin !== location.origin) return;
    u.searchParams.set("lang", l);
    a.href = u.href;
  });
}
document.querySelectorAll(".lingue button").forEach(b => b.onclick = () => lingua(b.dataset.lingua));
lingua(L);
