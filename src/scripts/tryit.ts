// Skutečný bezpečnostní sken z webu grovecloud.cz.
//
// Volá POST https://grovetechai.com/api/security-scan (stejný endpoint jako
// scanner) a paralelně čte skutečný průběh z /api/security-scan/progress/:id.
// Server má pro naše originy povolený CORS (server/routes.ts, grovecloudCors)
// a odpověď posílá BEZ cookies — sken tedy vždy běží jako anonymní.
//
// Anonymní limity jsou tvrdé (1 sken / IP / den) a to je v pořádku: tohle je
// ukázka, ne hosting skenů zdarma. Když limit dojde, pošleme člověka na účet.

const API = "https://grovetechai.com";

const node = document.getElementById("node");
const form = document.getElementById("tryform") as HTMLFormElement | null;
const vstup = document.getElementById("repo") as HTMLInputElement | null;
const btn = document.getElementById("trybtn") as HTMLButtonElement | null;
const detect = document.getElementById("detect");
const scan = document.getElementById("scan");
const chips = document.getElementById("chips");
const ringarc = document.getElementById("ringarc");
const ringnum = document.getElementById("ringnum");
const scantitle = document.getElementById("scantitle");
const scanmeta = document.getElementById("scanmeta");
const scanverdict = document.getElementById("scanverdict");
const nalezy = document.getElementById("nalezy");
const reportlink = document.getElementById("reportlink") as HTMLAnchorElement | null;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const OBVOD = 2 * Math.PI * 46;
const bezAnimace = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/* ── Ozdoba: kostky na izometrickém nodu ─────────────────────────────────── */
const slots = [[10, 10], [110, 10], [210, 10], [10, 110], [110, 110], [210, 110]];
let used = 0;
function addBox(text: string, color: string, h: number) {
  if (!node || used >= slots.length) return;
  const [x, y] = slots[used++];
  const b = document.createElement("div");
  b.className = "gc-box drop";
  b.style.left = x + "px"; b.style.top = y + "px";
  b.style.setProperty("--c", color); b.style.setProperty("--h", h + "px");
  b.innerHTML = `<div class="f top"><span>${esc(text)}</span></div><div class="f s1"></div><div class="f s2"></div>`;
  node.appendChild(b);
  requestAnimationFrame(() => requestAnimationFrame(() => b.classList.remove("drop")));
}
addBox("grovecloud.cz · statika", "#2A5BD9", 24);
addBox("api.firma.cz · Express", "#1A4BC0", 60);
addBox("shop.demo · Next.js", "#123C9A", 60);

/* ── Fáze skenu ──────────────────────────────────────────────────────────── */
// Klíče jsou stabilní kontrakt serveru (server/scan-progress-bus.ts → ScanPhase).
// Ukazujeme jen bezpečnostní část — sken měří i SEO, výkon a GDPR, ale tady
// prodáváme zabezpečený hosting a míchat do toho SEO by jen rozostřilo pointu.
// ══ TEXTY JDOU Z ASTRA, NEPÍŠOU SE TADY ════════════════════════════════════
// Sken běží i na /en a /sk. Kdyby si skript držel vlastní české řetězce,
// anglická stránka by po odeslání formuláře začala mluvit česky — a to až
// u návštěvníka, takže by si toho build ani test nevšiml. Překlady tedy
// přebíráme z JSON bloku, který vykreslí TryIt.astro.
type Preklady = {
  faze: Record<string, string>;
  zavaznost: Record<string, string>;
  verdikt: { vazne: string; opravit: string; doladit: string; ok: string };
  chyba: Record<string, string>;
  jazyk: string;
  btn: string;
  skenujiUrl: string;
  spojeni: string;
  prubeh: string;
  hotovo: string;
  titulek: string;
  nalezy: string;
  zadne: string;
  report: string;
  reportKratky: string;
  napisAdresu: string;
};

const T: Preklady = JSON.parse(document.getElementById("tryit-i18n")?.textContent || "{}");
/** Dosadí {promenne} do přeloženého řetězce. */
const tx = (sablona: string, vars: Record<string, string | number> = {}) =>
  Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), sablona || "");

const FAZE: Array<{ key: string; label: string }> = [
  "fetch",
  "security",
  "surface",
  "cve",
  "malware",
  "nis2",
  "scoring",
].map((key) => ({ key, label: T.faze?.[key] ?? key }));

const chipEls = new Map<string, HTMLElement>();
function postavChipy() {
  if (!chips) return;
  chips.innerHTML = "";
  chipEls.clear();
  for (const f of FAZE) {
    const el = document.createElement("span");
    el.className = "gc-chip";
    el.innerHTML = `<span class="dot"></span>${esc(f.label)}`;
    chips.appendChild(el);
    chipEls.set(f.key, el);
  }
}

function barvaSkore(v: number) { return v >= 80 ? "#16a34a" : v >= 50 ? "#b45309" : "#dc2626"; }

function nastavRing(v: number | null) {
  const barva = v === null ? "#5b6478" : barvaSkore(v);
  ringarc?.setAttribute("stroke", barva);
  ringarc?.setAttribute("stroke-dashoffset", String(OBVOD * (1 - (v ?? 0) / 100)));
  if (ringnum) {
    ringnum.textContent = v === null ? "–" : String(v);
    ringnum.setAttribute("style", `fill:${barva}`);
  }
}

function dojedSkore(cil: number) {
  if (bezAnimace) { nastavRing(cil); return; }
  const start = performance.now();
  const krok = (t: number) => {
    const p = Math.min(1, (t - start) / 1100);
    nastavRing(Math.round(cil * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(krok);
  };
  requestAnimationFrame(krok);
}

/* ── Chybové stavy ───────────────────────────────────────────────────────── */
// Server vrací strojové kódy; člověk potřebuje větu a cestu ven.
function chybaText(stav: number, data: any): string {
  const kod = String(data?.error || data?.code || "");
  const odkaz = `<a href="${API}/scanner" rel="noopener">${T.chyba.odkaz}</a>`;
  // Server posílá hlášku v češtině (`messageCs`) i angličtině (`messageEn`).
  // Na anglické a slovenské verzi bereme anglickou; kdyby chyběla, radši
  // vlastní obecnou větu než české souvětí uprostřed anglické stránky.
  const zeServeru = T.jazyk === "cs" ? data?.messageCs : data?.messageEn;
  if (kod === "anon_limit") return `${T.chyba.anonLimit} ${odkaz}`;
  if (kod === "free_limit") return `${T.chyba.freeLimit} ${odkaz}`;
  if (kod === "rate_limit") return T.chyba.rateLimit;
  if (kod === "scan_in_progress") return T.chyba.probiha;
  if (kod === "captcha_required" || kod === "datacenter_blocked" || kod === "captcha_failed")
    return `${T.chyba.vpn} ${odkaz}`;
  if (kod === "blocked_url") return T.chyba.blocked;
  if (kod === "invalid_url") return T.chyba.invalid;
  if (kod === "scan_failed") return zeServeru || T.chyba.selhal;
  if (stav === 0) return T.chyba.spojeni;
  return zeServeru || tx(T.chyba.obecna, { stav });
}

const SEV: Record<string, { label: string; barva: string }> = {
  critical: { label: T.zavaznost?.critical ?? "critical", barva: "#dc2626" },
  high: { label: T.zavaznost?.high ?? "high", barva: "#ea580c" },
  medium: { label: T.zavaznost?.medium ?? "medium", barva: "#b45309" },
  low: { label: T.zavaznost?.low ?? "low", barva: "#5b6478" },
  info: { label: T.zavaznost?.info ?? "info", barva: "#5b6478" },
  ok: { label: T.zavaznost?.ok ?? "ok", barva: "#16a34a" },
};

function verdikt(risk: string | null, score: number): string {
  if (risk === "critical" || score < 50) return T.verdikt.vazne;
  if (risk === "high" || score < 70) return T.verdikt.opravit;
  if (risk === "medium" || score < 85) return T.verdikt.doladit;
  return T.verdikt.ok;
}

/* ── Běh ─────────────────────────────────────────────────────────────────── */
let bezi = false;

async function spustSken(url: string) {
  if (!scan || !detect || !scanmeta || !scantitle || !scanverdict || !nalezy || !reportlink) return;

  bezi = true;
  if (btn) { btn.disabled = true; btn.textContent = "Skenuji…"; }
  detect.className = "detect";
  detect.textContent = "";
  scan.hidden = false;
  reportlink.hidden = true;
  nalezy.innerHTML = "";
  scanverdict.textContent = "";
  scantitle.textContent = tx(T.skenujiUrl, { url });
  scanmeta.textContent = T.spojeni;
  postavChipy();
  nastavRing(null);

  // progressId si generuje klient (server ho jen validuje na [A-Za-z0-9_-]{8,64}).
  const progressId = Array.from(crypto.getRandomValues(new Uint8Array(12)))
    .map((b) => b.toString(36).padStart(2, "0")).join("").slice(0, 24);

  const zacatek = Date.now();
  const tick = window.setInterval(async () => {
    try {
      const r = await fetch(`${API}/api/security-scan/progress/${progressId}`, { cache: "no-store" });
      const d = await r.json();
      for (const f of (Array.isArray(d.done) ? d.done : [])) chipEls.get(String(f))?.classList.add("on");
      const hotovo = chips?.querySelectorAll(".gc-chip.on").length ?? 0;
      scanmeta.textContent = tx(T.prubeh, { hotovo, celkem: FAZE.length, s: Math.round((Date.now() - zacatek) / 1000) });
    } catch { /* průběh je ozdoba, sken běží dál */ }
  }, 1200);

  try {
    const r = await fetch(`${API}/api/security-scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, progressId }),
    });
    const data = await r.json().catch(() => ({}));
    window.clearInterval(tick);

    if (!r.ok) {
      scan.hidden = true;
      detect.className = "detect err";
      detect.innerHTML = chybaText(r.status, data);
      return;
    }

    // Bezpečnostní skóre je poctivější než celkové — návštěvník tu řeší
    // bezpečnost, ne SEO. Fallback na celkové, kdyby chybělo.
    const skore: number = Number.isFinite(data?.securityScore) ? data.securityScore : Number(data?.score ?? 0);
    const risk: string | null = data?.securityRisk ?? data?.riskLevel ?? null;

    for (const el of chipEls.values()) el.classList.add("on");
    scantitle.innerHTML = `${esc(T.titulek)} <b>${esc(url)}</b>: ${esc(verdikt(risk, skore))}`;
    scanmeta.textContent = tx(T.hotovo, { s: Math.round((Date.now() - zacatek) / 1000) });
    dojedSkore(skore);

    // Počty bereme jen z bezpečnostní kategorie — `lockedSeverityCounts` je to,
    // co jsme našli, ale v ukázce neukazujeme celé.
    const sec = data?.categories?.security ?? {};
    const videt: any[] = Array.isArray(sec.findings) ? sec.findings.filter((f: any) => f.severity !== "ok") : [];
    const zamceno: Record<string, number> = sec.lockedSeverityCounts ?? {};
    const soucty: Record<string, number> = { ...zamceno };
    for (const f of videt) soucty[f.severity] = (soucty[f.severity] ?? 0) + 1;

    const poradi = ["critical", "high", "medium", "low"];
    const popis = poradi.filter((s) => soucty[s]).map((s) => `${soucty[s]} ${SEV[s].label}`).join(" · ");
    scanverdict.textContent = popis ? tx(T.nalezy, { popis }) : T.zadne;

    for (const f of videt.slice(0, 2)) {
      const s = SEV[f.severity] ?? SEV.low;
      const li = document.createElement("li");
      li.innerHTML = `<span class="sev" style="background:${s.barva}18;color:${s.barva}">${esc(s.label)}</span>`
        + `<span>${esc(String(f.titleCs || f.titleEn || f.id))}</span>`;
      nalezy.appendChild(li);
    }

    if (data?.shareToken) {
      reportlink.href = `${API}/report/${encodeURIComponent(String(data.shareToken))}`;
      reportlink.target = "_blank";
      reportlink.hidden = false;
      reportlink.textContent = popis ? T.report : T.reportKratky;
    }
  } catch {
    window.clearInterval(tick);
    scan.hidden = true;
    detect.className = "detect err";
    detect.innerHTML = chybaText(0, {});
  } finally {
    bezi = false;
    if (btn) { btn.disabled = false; btn.textContent = T.btn; }
  }
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (bezi || !vstup || !detect) return;
  const raw = vstup.value.trim();
  if (!raw) {
    detect.className = "detect err";
    detect.textContent = T.napisAdresu;
    vstup.focus();
    return;
  }
  // Doplníme schéma, ať uživatel nemusí psát https://. Zbytek validuje server.
  const url = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  void spustSken(url.slice(0, 500));
});
