/**
 * Hlídač překladů webu grovecloud.cz.
 *
 * ══ PROČ TENHLE TEST VZNIKL ════════════════════════════════════════════════
 * 5. 9. 2026 se stalo dvakrát po sobě, že build prošel, vygeneroval 16 stránek
 * a všechny byly česky. Poprvé kvůli `.html` v cestě (jazyk se nepoznal),
 * podruhé proto, že anglické a slovenské stránky byly samostatné kopie, do
 * kterých se překlady nikdy nedoplnily. Ani jedno by kompilátor nezachytil —
 * chybějící překlad není syntaktická chyba, je to jen jiné písmeno na obrazovce.
 *
 * Test proto kontroluje dvě věci:
 *
 *   1. PARITA KLÍČŮ — každý klíč musí mít všechny tři jazyky a žádný z nich
 *      nesmí být prázdný. Chybějící `sk` by jinak spadl na český fallback
 *      a nikdo by si toho nevšiml.
 *
 *   2. ŽÁDNÁ ČEŠTINA V CIZÍCH JAZYCÍCH — angličtina ani slovenština nepoužívají
 *      písmena ř, ě ani ů. Jejich výskyt v anglickém či slovenském překladu
 *      tedy s jistotou znamená zapomenutou českou větu. Není to dokonalá
 *      detekce (české „auto" projde), ale chytí přesně tu chybu, která se nám
 *      dvakrát stala — celý blok textu zkopírovaný z češtiny.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { ui, JAZYKY } from "../src/i18n/ui";

const jazyky = Object.keys(JAZYKY) as Array<keyof typeof JAZYKY>;
/** Písmena, která má čeština a slovenština ani angličtina ne. */
const CESKA_PISMENA = /[řěůŘĚŮ]/;

test("kazdy klic ma vsechny tri jazyky a zadny neni prazdny", () => {
  const chybi: string[] = [];
  for (const [klic, zaznam] of Object.entries(ui)) {
    for (const jazyk of jazyky) {
      const text = (zaznam as Record<string, string>)[jazyk];
      if (typeof text !== "string" || text.trim() === "") {
        chybi.push(`${klic} → ${jazyk}`);
      }
    }
  }
  assert.deepEqual(chybi, [], `Chybejici nebo prazdne preklady:\n${chybi.join("\n")}`);
});

test("anglicke a slovenske preklady neobsahuji ceska pismena", () => {
  const podezrele: string[] = [];
  for (const [klic, zaznam] of Object.entries(ui)) {
    for (const jazyk of ["en", "sk"] as const) {
      const text = (zaznam as Record<string, string>)[jazyk];
      if (typeof text === "string" && CESKA_PISMENA.test(text)) {
        podezrele.push(`${klic} → ${jazyk}: ${text.slice(0, 70)}`);
      }
    }
  }
  assert.deepEqual(podezrele, [], `Zapomenuta cestina v prekladu:\n${podezrele.join("\n")}`);
});

test("promenne v sablonach sedi napric jazyky", () => {
  // Když česká věta obsahuje {cena} a anglická ne, zůstane v anglické verzi
  // prázdné místo tam, kde má být částka. Build ani prohlížeč to nenahlásí.
  const rozdily: string[] = [];
  const promenne = (s: string) => (s.match(/\{[a-zA-Z]+\}/g) ?? []).sort().join(",");
  for (const [klic, zaznam] of Object.entries(ui)) {
    const z = zaznam as Record<string, string>;
    const vzor = promenne(z.cs ?? "");
    for (const jazyk of ["en", "sk"] as const) {
      if (promenne(z[jazyk] ?? "") !== vzor) {
        rozdily.push(`${klic} → ${jazyk}: cs má [${vzor}], ${jazyk} má [${promenne(z[jazyk] ?? "")}]`);
      }
    }
  }
  assert.deepEqual(rozdily, [], `Nesedi promenne:\n${rozdily.join("\n")}`);
});
