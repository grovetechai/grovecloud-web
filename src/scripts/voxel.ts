// Voxelový titulek GROVE CLOUD. Bez závislostí, jeden canvas.
// Reduced motion → kostky rovnou na místě, bez animace a bez reakce na myš.
const cv = document.getElementById("vox") as HTMLCanvasElement | null;
if (cv) {
  const ctx = cv.getContext("2d")!;
  const W = cv.width, H = cv.height, CELL = 9;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function sample(text: string) {
    const o = document.createElement("canvas");
    o.width = W; o.height = H;
    const c = o.getContext("2d")!;
    c.fillStyle = "#000";
    c.font = "900 150px ui-sans-serif,-apple-system,Segoe UI,Inter,Roboto,sans-serif";
    c.textAlign = "center"; c.textBaseline = "middle";
    (c as any).letterSpacing = "-6px";
    c.fillText(text, W / 2, H / 2 + 8);
    const d = c.getImageData(0, 0, W, H).data;
    const pts: { x: number; y: number }[] = [];
    for (let y = 0; y < H; y += CELL) for (let x = 0; x < W; x += CELL) if (d[(y * W + x) * 4 + 3] > 128) pts.push({ x, y });
    return pts;
  }

  type P = { tx: number; ty: number; x: number; y: number; vx: number; vy: number; c: string; d: number };
  const targets = sample("GROVE CLOUD");
  const parts: P[] = targets.map((t) => ({
    tx: t.x, ty: t.y,
    x: reduce ? t.x : Math.random() * W, y: reduce ? t.y : Math.random() * H - 200,
    vx: 0, vy: 0,
    c: t.x > W * 0.5 && Math.random() < 0.9 ? "#FD192F" : "#082054",
    d: Math.random() * 40,
  }));

  let mouse = { x: -9999, y: -9999 };
  if (!reduce) {
    cv.addEventListener("mousemove", (e) => {
      const r = cv.getBoundingClientRect();
      mouse = { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height };
    });
    cv.addEventListener("mouseleave", () => (mouse = { x: -9999, y: -9999 }));
  }

  function cube(x: number, y: number, s: number, col: string) {
    ctx.fillStyle = col; ctx.fillRect(x, y, s, s);
    ctx.fillStyle = "rgba(255,255,255,.35)"; ctx.fillRect(x, y, s, 2);
    ctx.fillStyle = "rgba(0,0,0,.25)"; ctx.fillRect(x + s - 2, y, 2, s);
  }

  let t0 = performance.now();
  let idle = 0;
  function frame(now: number) {
    const el = now - t0;
    ctx.clearRect(0, 0, W, H);
    let moving = 0;
    for (const p of parts) {
      let tx = p.tx, ty = p.ty;
      const dx = p.tx - mouse.x, dy = p.ty - mouse.y, dist = Math.hypot(dx, dy);
      if (dist < 110) { const f = (110 - dist) / 110; tx += (dx / dist) * f * 70; ty += (dy / dist) * f * 70; }
      if (el > p.d * 12) {
        p.vx += (tx - p.x) * 0.045; p.vy += (ty - p.y) * 0.045;
        p.vx *= 0.78; p.vy *= 0.78;
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.05) moving++;
      }
      cube(p.x, p.y, CELL - 1, p.c);
    }
    // Když se nic nehýbe a myš je pryč, přestaň kreslit (šetří baterii).
    idle = moving === 0 && mouse.x < 0 ? idle + 1 : 0;
    if (idle < 30) requestAnimationFrame(frame);
    else { idle = 0; wake = () => requestAnimationFrame(frame); }
  }
  let wake: (() => void) | null = null;
  cv.addEventListener("mousemove", () => { if (wake) { const w = wake; wake = null; w(); } });
  requestAnimationFrame(frame);

  // Tlačítko „Nasadit" znovu rozhodí kostky — malý moment radosti před odchodem do appky.
  document.getElementById("cta-deploy")?.addEventListener("click", () => {
    if (reduce) return;
    parts.forEach((p) => { p.x = Math.random() * W; p.y = -50 - Math.random() * 200; p.vx = 0; p.vy = 0; });
    t0 = performance.now();
    if (wake) { const w = wake; wake = null; w(); }
  });
}
