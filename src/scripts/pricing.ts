// Přepínač typu appky v ceníku. Čísla bere z pricing.json vloženého do stránky.
type Stack = { key: string; label: string; prices: Record<string, { czk: number } | null> };
const el = document.getElementById("pricing-json");
if (el) {
  const { stacks } = JSON.parse(el.textContent || "{}") as { stacks: Stack[] };
  const fmt = (n: number) => n.toLocaleString("cs-CZ");
  const tabs = document.querySelectorAll<HTMLButtonElement>(".stackpick [data-stack]");
  const render = (key: string) => {
    const s = stacks.find((x) => x.key === key); if (!s) return;
    tabs.forEach((b) => b.setAttribute("aria-selected", b.dataset.stack === key ? "true" : "false"));
    document.querySelectorAll<HTMLElement>("#tiers .tier").forEach((t) => {
      const tier = t.dataset.tier!; const p = s.prices[tier]; const price = t.querySelector("[data-price]")!;
      t.classList.toggle("off", !p);
      price.innerHTML = p ? `${tier === "starter" ? "" : "od "}${fmt(p.czk)} Kč<small>/ měsíc</small>` : `<span class="na">jen pro statiku</span>`;
    });
  };
  tabs.forEach((b) => b.addEventListener("click", () => render(b.dataset.stack!)));
}
