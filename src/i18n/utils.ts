/**
 * Pomocníci pro vícejazyčnost a měny.
 *
 * ══ JAZYK SE POZNÁ Z URL, NE Z PROHLÍŽEČE ══════════════════════════════════
 * `/cena` je česky, `/en/cena` anglicky, `/sk/cena` slovensky. Automatické
 * přesměrování podle `Accept-Language` schválně neděláme: statický web ho
 * neumí bez serveru a hlavně by rozbilo sdílené odkazy — kdo pošle kolegovi
 * českou stránku, chce, aby ji kolega viděl česky.
 */
import { ui, JAZYKY, VYCHOZI, MENA, type Jazyk } from "./ui";
import pricing from "../data/pricing.json";

export { JAZYKY, VYCHOZI, MENA };
export type { Jazyk };

/**
 * Vytáhne jazyk z cesty. `/en/cena` → "en", `/cena` → "cs".
 *
 * ══ POZOR NA `.html` ═══════════════════════════════════════════════════════
 * Web se staví s `build.format: "file"`, takže `src/pages/en/index.astro`
 * skončí jako `en.html` a `Astro.url.pathname` je `/en.html` — ne `/en/`.
 * Bez odstranění přípony by první segment byl „en.html", v seznamu jazyků by
 * se nenašel a CELÁ anglická verze by se vykreslila česky. Přesně to se
 * 5. 9. 2026 stalo: build prošel, 16 stránek se vygenerovalo a všechny byly
 * české — chyba, kterou by odhalil až návštěvník.
 */
export function jazykZUrl(url: URL): Jazyk {
  const prvni = (url.pathname.split("/").filter(Boolean)[0] ?? "").replace(/\.html$/, "");
  return prvni && prvni in JAZYKY ? (prvni as Jazyk) : VYCHOZI;
}

/**
 * Sestaví odkaz v daném jazyce. Čeština je bez prefixu.
 * `odkaz("cs", "/cena")` → `/cena`; `odkaz("en", "/cena")` → `/en/cena`.
 */
export function odkaz(jazyk: Jazyk, cesta: string): string {
  const c = cesta.startsWith("/") ? cesta : `/${cesta}`;
  if (jazyk === VYCHOZI) return c;
  return c === "/" ? `/${jazyk}` : `/${jazyk}${c}`;
}

/** Cesta bez jazykového prefixu — pro přepínač jazyků a hreflang. */
export function cestaBezJazyka(url: URL): string {
  const casti = url.pathname.split("/").filter(Boolean).map((c) => c.replace(/\.html$/, ""));
  if (casti[0] && casti[0] in JAZYKY) casti.shift();
  // `index` je jen název souboru, ne část adresy.
  if (casti[casti.length - 1] === "index") casti.pop();
  return "/" + casti.join("/");
}

// ── Měny ───────────────────────────────────────────────────────────────────
//
// Fakturujeme v korunách (Stripe, stripeAmountFromCzk). Eurová a dolarová
// částka je ORIENTAČNÍ PŘEPOČET pevným kurzem z ceníku — ne denním kurzem.
// Kdyby se přepočítávalo denně, měnila by se cena na webu každý den a nikdo
// by nevěděl, co vlastně zaplatí.

export type Mena = "czk" | "eur" | "usd";

export const KURZY = {
  eur: (pricing as any).eurCzk as number,
  usd: (pricing as any).usdCzk as number,
};

/**
 * Naformátuje částku v dané měně.
 *
 * Koruny bez desetinných míst (99 Kč), eura a dolary se dvěma jen když jsou
 * potřeba (3,96 € vs 39 €) — „39,00 €" vypadá jako chyba v exportu.
 */
export function cena(castka: number, mena: Mena, jazyk: Jazyk): string {
  const locale = jazyk === "en" ? "en-US" : jazyk === "sk" ? "sk-SK" : "cs-CZ";
  if (mena === "czk") {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(castka) + " Kč";
  }
  const desetinna = Number.isInteger(castka) ? 0 : 2;
  const cislo = new Intl.NumberFormat(locale, {
    minimumFractionDigits: desetinna,
    maximumFractionDigits: desetinna,
  }).format(castka);
  return mena === "eur" ? `${cislo} €` : `$${cislo}`;
}

/** Cena tarifu v měně, která je pro daný jazyk hlavní. */
export function cenaTarifu(
  ceny: { czk: number; eur: number; usd: number } | null | undefined,
  jazyk: Jazyk,
): string | null {
  if (!ceny) return null;
  const m = MENA[jazyk];
  return cena(m === "czk" ? ceny.czk : ceny.eur, m, jazyk);
}

/**
 * Druhá a třetí měna do závorky — aby zákazník viděl i to, v čem se fakturuje.
 *
 * Pořadí je záměrné: u české verze doplníme € a $, u zahraničních VŽDY Kč,
 * protože to je měna, kterou reálně zaplatí.
 */
export function cenyDoplnkove(
  ceny: { czk: number; eur: number; usd: number } | null | undefined,
  jazyk: Jazyk,
): string | null {
  if (!ceny) return null;
  const m = MENA[jazyk];
  if (m === "czk") return `${cena(ceny.eur, "eur", jazyk)} · ${cena(ceny.usd, "usd", jazyk)}`;
  return `${cena(ceny.czk, "czk", jazyk)} · ${cena(ceny.usd, "usd", jazyk)}`;
}

/** Zkratka: překladač pro jazyk odvozený z URL. */
export function prekladacZUrl(url: URL) {
  const jazyk = jazykZUrl(url);
  const t = (klic: keyof typeof ui, vars?: Record<string, string | number>): string => {
    const zaznam = ui[klic] as Record<Jazyk, string>;
    let text: string = zaznam?.[jazyk] ?? zaznam?.cs ?? String(klic);
    if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
    return text;
  };
  return { jazyk, t, l: (cesta: string) => odkaz(jazyk, cesta) };
}
