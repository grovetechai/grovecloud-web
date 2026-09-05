// Přepínač typu appky v ceníku.
//
// ══ SKRIPT CENY NEPOČÍTÁ ANI NEFORMÁTUJE ═══════════════════════════════════
// Astro mu předá HOTOVÉ řetězce pro každou kombinaci typu appky a tarifu
// (viz Pricing.astro). Kdyby si je skládal sám, měli bychom dvě implementace
// formátování ceny — jednu na serveru, jednu tady — a ta druhá by se dřív
// nebo později rozešla: jiná měna podle jazyka, jiný oddělovač tisíců,
// zapomenuté „od ". Návštěvník by po kliknutí na jiný typ appky uviděl jinak
// vypadající cenu než tu, se kterou stránka přišla.
type Data = {
  ceny: Record<string, Record<string, string | null>>;
  mesic: string;
  jenStatika: string;
};

const el = document.getElementById("pricing-json");
if (el) {
  const { ceny, mesic, jenStatika } = JSON.parse(el.textContent || "{}") as Data;
  const tabs = document.querySelectorAll<HTMLButtonElement>(".stackpick [data-stack]");

  const render = (key: string) => {
    const proTyp = ceny?.[key];
    if (!proTyp) return;
    tabs.forEach((b) => b.setAttribute("aria-selected", b.dataset.stack === key ? "true" : "false"));
    document.querySelectorAll<HTMLElement>("#tiers .tier").forEach((t) => {
      const tier = t.dataset.tier!;
      const popis = proTyp[tier] ?? null;
      const price = t.querySelector("[data-price]")!;
      t.classList.toggle("off", !popis);
      // textContent, ne innerHTML: řetězce jdou z našeho ceníku, ale skládat
      // HTML z dat je zvyk, který se jednou vymstí. Značku <small> vyrobíme.
      price.textContent = popis ?? "";
      if (popis) {
        const small = document.createElement("small");
        small.textContent = mesic;
        price.appendChild(small);
      } else {
        const span = document.createElement("span");
        span.className = "na";
        span.textContent = jenStatika;
        price.appendChild(span);
      }
    });
  };

  tabs.forEach((b) => b.addEventListener("click", () => render(b.dataset.stack!)));
}
