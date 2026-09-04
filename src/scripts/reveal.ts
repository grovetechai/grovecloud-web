// Postupné „skládání" sekcí při scrollu. Respektuje prefers-reduced-motion.
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const els = document.querySelectorAll<HTMLElement>(".reveal");
if (reduce) els.forEach((e) => e.classList.add("in"));
else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        const i = Number(el.dataset.i ?? 0);
        setTimeout(() => el.classList.add("in"), i * 110);
        io.unobserve(el);
      }
    },
    { threshold: 0.15 },
  );
  els.forEach((e) => io.observe(e));
}
