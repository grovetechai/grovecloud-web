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
      `$ sken 185+ kontrol …`,
      `<span class="ok">✓ 0 kritických · 2 doporučení</span>`,
      `<span class="red">■ Defender aktivní</span>`,
    ];
    log.innerHTML = ""; running = true;
    let i = 0;
    const t = setInterval(() => {
      log.innerHTML += lines[i] + "\n"; i++;
      if (i === 5) addBox(`${name} · ${g.fw}`, g.c, g.h);
      if (i >= lines.length) { clearInterval(t); running = false; nodest.textContent = `${used} appek · ${(1.1 - used * 0.15).toFixed(1).replace(".", ",")} GB volné`; }
    }, 260);
  });
}
