// Úvod grovecloud.cz „Kořen Grove Cloud“ (13. 10. 2026).
//
// 1) Neuronový strom z loga — 1:1 port `client/src/components/landing/neural-tree.tsx`
//    z hlavního repa (stejný seed, geometrie, barvy, jiskry), aby strom na
//    grovetechai.com a tady byl TENTÝŽ strom.
// 2) Měřítko scény 1440×900 podle šířky okna (stejně jako strom na „/“).
// 3) Průchod kořenem: když `public/grove-pruchod.js` v <head> nastavil
//    html[data-pruchod], přehrajeme fáze home → pick → dive → (hotovo).
//    Bez JS nebo bez průchodu je vidět rovnou výsledný stav.

type View = { x: number; y: number; w: number; h: number };
const FULL: View = { x: 0, y: 0, w: 1440, h: 900 };
const CROWN: View = { x: 455, y: 135, w: 500, h: 480 };
type P = { cx: number; id: number; y: number; r: number; a: number; s: number };

function build(density: number) {
  let seed = 7;
  const R = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const pts: P[] = [];
  const cone = (cx: number, ay: number, by: number, rb: number, n: number, id: number) => {
    for (let i = 0; i < Math.round(n * density); i++) {
      const t = Math.pow(R(), 0.8), y = ay + (by - ay) * t, rr = rb * t;
      const r = R() < 0.62 ? rr * (0.9 + R() * 0.1) : rr * Math.sqrt(R());
      pts.push({ cx, id, y, r, a: R() * 6.2832, s: R() });
    }
  };
  cone(789, 150, 486, 153, 1500, 0);
  cone(608, 277, 512, 111, 850, 1);
  ([[787, 486, 2], [607, 512, 3]] as const).forEach(([x, top, id]) => {
    for (let i = 0; i < Math.round(110 * density); i++) pts.push({ cx: x, id, y: top + R() * (600 - top), r: 5 * Math.sqrt(R()), a: R() * 6.2832, s: R() });
  });
  const idx: number[] = [];
  for (let i = 0; i < pts.length; i += 8) idx.push(i);
  const p3 = (p: P) => [p.r * Math.cos(p.a), p.y, p.r * Math.sin(p.a)];
  const edges: [number, number][] = [];
  idx.forEach((i) => {
    const a = p3(pts[i]);
    const near: [number, number][] = [];
    idx.forEach((j) => {
      if (j === i || pts[j].id !== pts[i].id) return;
      const b = p3(pts[j]);
      near.push([(a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2, j]);
    });
    near.sort((x, y) => x[0] - y[0]);
    near.slice(0, 2).forEach((n) => edges.push([i, n[1]]));
  });
  return { pts, edges, R };
}

function strom(cv: HTMLCanvasElement, crown: boolean) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const view = crown ? CROWN : FULL;
  const { pts, edges, R } = build(crown ? 0.6 : 1);
  const proj: [number, number, number][] = new Array(pts.length);
  const sparks: { e: [number, number]; u: number; sp: number }[] = [];
  const klid = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0, vidim = true, bezi = false;
  const T0 = performance.now();

  const fit = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = cv.clientWidth || view.w, h = cv.clientHeight || view.h;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const k = Math.min(w / view.w, h / view.h);
    const ox = (w - view.w * k) / 2 - view.x * k, oy = (h - view.h * k) / 2 - view.y * k;
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * ox, dpr * oy);
  };
  const draw = (now: number) => {
    const t = (now - T0) / 1000, rot = t * 0.22, scan = 530 - ((t * 80) % 420);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.restore();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i], a = p.a + rot, x = p.r * Math.cos(a), z = p.r * Math.sin(a), v = 600 / (600 + z), sx = p.cx + x * v;
      proj[i] = [sx, p.y, z];
      let q = Math.max(0.08, Math.min(1, 0.35 + 0.65 * (1 - (z + 160) / 320))) * 0.7;
      const d = Math.abs(p.y - scan);
      if (d < 14) q = Math.min(1, q + (1 - d / 14) * 0.85);
      const s = (0.7 + p.s * 1.1) * v;
      ctx.fillStyle = `rgba(255,${50 + Math.round(q * 110)},${62 + Math.round(q * 90)},${q.toFixed(3)})`;
      ctx.fillRect(sx - s / 2, p.y - s / 2, s, s);
    }
    ctx.lineWidth = 0.6;
    for (let i = 0; i < edges.length; i++) {
      const a = proj[edges[i][0]], b = proj[edges[i][1]];
      const al = 0.05 + 0.2 * (1 - ((a[2] + b[2]) / 2 + 160) / 320);
      ctx.strokeStyle = `rgba(255,90,105,${al.toFixed(3)})`;
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    if (!klid && R() < 0.3) sparks.push({ e: edges[Math.floor(R() * edges.length)], u: 0, sp: 0.02 + R() * 0.03 });
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.u += s.sp;
      if (s.u >= 1) { sparks.splice(i, 1); continue; }
      const a = proj[s.e[0]], b = proj[s.e[1]];
      const gx = a[0] + (b[0] - a[0]) * s.u, gy = a[1] + (b[1] - a[1]) * s.u;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 7);
      g.addColorStop(0, "rgba(255,255,255,0.95)"); g.addColorStop(1, "rgba(255,60,80,0)");
      ctx.fillStyle = g; ctx.fillRect(gx - 7, gy - 7, 14, 14);
    }
    ctx.globalCompositeOperation = "source-over";
  };
  const loop = (t: number) => { draw(t); if (bezi) raf = requestAnimationFrame(loop); };
  const prepni = () => {
    const ma = !klid && vidim && !document.hidden && cv.offsetParent !== null;
    if (ma && !bezi) { bezi = true; raf = requestAnimationFrame(loop); }
    else if (!ma && bezi) { bezi = false; cancelAnimationFrame(raf); }
  };
  fit(); draw(performance.now());
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(() => { fit(); draw(performance.now()); prepni(); }).observe(cv);
  if (typeof IntersectionObserver !== "undefined") new IntersectionObserver((e) => { vidim = e[0]?.isIntersecting ?? true; prepni(); }).observe(cv);
  document.addEventListener("visibilitychange", prepni);
  prepni();
}

// ── měřítko scény ──────────────────────────────────────────────────────────
const obal = document.querySelector<HTMLElement>(".ks-obal");
if (obal) {
  const fit = () => obal.style.setProperty("--s", String(Math.min(1, (obal.clientWidth || 1440) / 1440)));
  fit();
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(fit).observe(obal);
  else window.addEventListener("resize", fit);
}

document.querySelectorAll<HTMLCanvasElement>("canvas.ks-strom").forEach((c) => strom(c, c.dataset.crown === "1"));

// ── průchod kořenem ────────────────────────────────────────────────────────
const html = document.documentElement;
const scena = document.querySelector<HTMLElement>(".ks-scena");
if (scena && html.hasAttribute("data-pruchod")) {
  scena.dataset.ph = "home";
  html.removeAttribute("data-pruchod");
  setTimeout(() => { scena.dataset.ph = "pick"; }, 600);
  setTimeout(() => { scena.dataset.ph = "dive"; }, 1400);
  setTimeout(() => { delete scena.dataset.ph; }, 2450);
}
