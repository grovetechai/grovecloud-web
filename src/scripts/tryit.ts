// Simulace nasazení: detekce stacku podle názvu repa (jen ukázka), cena z pricing.json,
// deploy log a nová krabice na izometrickém nodu. Nic neposílá na server.
type Pricing = { stacks: { key: string; label: string; prices: Record<string, { czk: number } | null> }[] };
const dataEl = document.getElementById("pricing-data");
const node = document.getElementById("node");
const log = document.getElementById("log");
const detect = document.getElementById("detect");
const nodest = document.getElementById("nodest");
const form = document.getElementById("tryform") as HTMLFormElement | null;
const repoInput = document.getElementById("repo") as HTMLInputElement | null;
const scan = document.getElementById("scan");
const chips = document.getElementById("chips");
const ringarc = document.getElementById("ringarc");
const ringnum = document.getElementById("ringnum");
const scanmeta = document.getElementById("scanmeta");
const scanverdict = document.getElementById("scanverdict");

/** Kategorie skenu — stejné, jaké má report na grovetechai.com. */
const KATEGORIE: Array<{ n: string; pocet: number; warn?: boolean }> = [
  { n: "TLS a certifikát", pocet: 18 },
  { n: "Bezpečnostní hlavičky", pocet: 24 },
  { n: "Zranitelnosti závislostí", pocet: 41 },
  { n: "Malware a phishing", pocet: 22 },
  { n: "Únik dat a tajemství", pocet: 19 },
  { n: "GDPR a cookies", pocet: 17, warn: true },
  { n: "Výkon", pocet: 21 },
  { n: "SEO a AI čitelnost", pocet: 23, warn: true },
];
const KONTROL_CELKEM = KATEGORIE.reduce((a, k) => a + k.pocet, 0);
const OBVOD = 2 * Math.PI * 46;
const bezAnimace = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

/** Doběhne prstenec i číslo na cílové skóre. */
function dojedSkore(cil: number) {
  const barva = cil >= 80 ? "#16a34a" : cil >= 50 ? "#b45309" : "#dc2626";
  const nastav = (v: number) => {
    ringarc?.setAttribute("stroke", barva);
    ringarc?.setAttribute("stroke-dashoffset", String(OBVOD * (1 - v / 100)));
    if (ringnum) { ringnum.textContent = String(v); (ringnum as unknown as SVGElement).setAttribute("style", `fill:${barva}`); }
  };
  if (bezAnimace) { nastav(cil); return; }
  const start = performance.now();
  const krok = (t: number) => {
    const p = Math.min(1, (t - start) / 1100);
    nastav(Math.round(cil * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(krok);
  };
  requestAnimationFrame(krok);
}

/**
 * Ukázka skenu po nasazení: kategorie naskakují jedna po druhé, počet kontrol
 * roste, na konci dojede skóre. Nic se doopravdy neskenuje — je to ukázka
 * toho, co klient uvidí v aplikaci po ostrém nasazení.
 */
function spustSken(hotovo?: () => void) {
  if (!scan || !chips || !scanmeta || !scanverdict) { hotovo?.(); return; }
  scan.hidden = false;
  chips.innerHTML = "";
  scanverdict.textContent = "";
  dojedSkore(0);

  const prvky = KATEGORIE.map((k) => {
    const el = document.createElement("span");
    el.className = "gc-chip";
    el.innerHTML = `<span class="dot"></span>${k.n}`;
    chips.appendChild(el);
    return el;
  });

  let i = 0, hotovoKontrol = 0;
  const dalsi = () => {
    if (i >= KATEGORIE.length) {
      const nalezu = KATEGORIE.filter((k) => k.warn).length;
      scanverdict.innerHTML = `<b>0 kritických</b> · ${nalezu} doporučení · report dostaneš do účtu`;
      dojedSkore(96);
      hotovo?.();
      return;
    }
    const k = KATEGORIE[i];
    prvky[i].classList.add("on");
    if (k.warn) prvky[i].classList.add("warn");
    hotovoKontrol += k.pocet;
    scanmeta.textContent = `${hotovoKontrol} / ${KONTROL_CELKEM} kontrol`;
    i++;
    setTimeout(dalsi, bezAnimace ? 0 : 190);
  };
  dalsi();
}

if (dataEl && node && log && detect && nodest && form && repoInput) {
  const pricing = JSON.parse(dataEl.textContent || "{}") as Pricing;
  const czk = (stack: string, tier: string) => pricing.stacks.find((s) => s.key === stack)?.prices[tier]?.czk ?? null;
  const label = (stack: string) => pricing.stacks.find((s) => s.key === stack)?.label ?? stack;
  const fmt = (n: number) => n.toLocaleString("cs-CZ");

  const slots = [[10, 10], [110, 10], [210, 10], [10, 110], [110, 110], [210, 110], [10, 210], [110, 210], [210, 210]];
  let used = 0;
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

  function addBox(text: string, color: string, h: number) {
    if (used >= slots.length) return;
    const [x, y] = slots[used++];
    const b = document.createElement("div");
    b.className = "gc-box drop";
    b.style.left = x + "px"; b.style.top = y + "px";
    b.style.setProperty("--c", color); b.style.setProperty("--h", h + "px");
    b.innerHTML = `<div class="f top"><span>${esc(text)}</span></div><div class="f s1"></div><div class="f s2"></div>`;
    node!.appendChild(b);
    requestAnimationFrame(() => requestAnimationFrame(() => b.classList.remove("drop")));
  }
  addBox("sjednej.cz · statika", "#2A5BD9", 24);
  addBox("api.firma.cz · Express", "#1A4BC0", 60);
  addBox("shop.demo · Next.js", "#123C9A", 60);

  const guesses = [
    { re: /next|shop|app|defender/i, st: "ssr", fw: "Next.js", why: "v závislostech je next", h: 60, c: "#123C9A" },
    { re: /api|server|backend/i, st: "api", fw: "Express", why: "v závislostech je express (v server/)", h: 60, c: "#1A4BC0" },
    { re: /.*/, st: "static", fw: "Vite + React", why: "jen frontend bez serveru", h: 24, c: "#2A5BD9" },
  ];

  let running = false;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (running) return;
    const repo = (repoInput.value.trim() || "grovetechai/moje-appka").replace(/[^\w./-]/g, "").slice(0, 60);
    const g = guesses.find((g) => g.re.test(repo))!;
    const name = repo.split("/").pop() || "appka";
    const cena = g.st === "static" ? `Starter <b>${fmt(czk("static", "starter") ?? 99)} Kč</b>` : `Secure Host od <b>${fmt(czk(g.st, "host") ?? 0)} Kč</b>`;
    detect.innerHTML = `Detekce: <b>${g.fw}</b> · ${g.why} · typ <b>${esc(label(g.st))}</b> · ${cena}`;
    const lines = [
      `$ git clone github.com/${esc(repo)}`,
      `✓ přečteno package.json (kořen + podsložky)`,
      `✓ stack: ${g.fw} · jistota vysoká`,
      `$ build …`,
      `✓ build 21 s`,
      g.st === "static" ? `✓ statika → sdílený server` : `✓ kontejner 512 MB → node`,
      `✓ https://${esc(name)}.grovecloud.cz · certifikát OK`,
      `$ sken ${KONTROL_CELKEM} kontrol …`,
    ];
    log.innerHTML = ""; running = true;
    let i = 0;
    const t = setInterval(() => {
      log.innerHTML += lines[i] + "\n"; i++;
      if (i === 5) addBox(`${name} · ${g.fw}`, g.c, g.h);
      if (i >= lines.length) {
        clearInterval(t);
        nodest.textContent = `${used} appek · ${(1.1 - used * 0.15).toFixed(1).replace(".", ",")} GB volné`;
        // Sken je pointa — teprve po něm je „nasazeno".
        spustSken(() => { running = false; });
      }
    }, 260);
  });
}
