// Postupné rozsvěcení vrstev bezpečnostního diagramu. Bez JS je diagram
// čitelný taky — jen ztlumený, proto se při chybě nic neděje.
const chain = document.getElementById("chain");

if (chain) {
  const layers = Array.from(chain.querySelectorAll<HTMLElement>(".layer"));
  const bezAnimace = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  const rozsvit = () => layers.forEach((l, i) => {
    if (bezAnimace) { l.classList.add("lit"); return; }
    window.setTimeout(() => l.classList.add("lit"), i * 220);
  });

  if (!("IntersectionObserver" in window)) {
    rozsvit();
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { rozsvit(); io.disconnect(); break; }
      }
    }, { threshold: 0.25 });
    io.observe(chain);
  }
}
