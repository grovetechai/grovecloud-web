// Živý stav do sekce „Tento web běží na Grove Cloud".
//
// Samostatný soubor, ne inline skript: CSP téhle stránky má `script-src 'self'`
// bez `unsafe-inline`, takže inline skript (což by z `define:vars` vzniklo)
// prohlížeč zablokuje a čísla by zůstala na pomlčkách.
//
// ZÁSADA: když se stav nepodaří zjistit, řekneme to. Nikdy nedosazujeme
// „vše v pořádku" jako výchozí hodnotu — na sekci, která má být důkazem, by
// to byl přesně ten druh přikrášlení, kvůli kterému nikdo nevěří ničemu.

const sekce = document.getElementById("dukaz");
const API = sekce?.getAttribute("data-api") ?? "";

const el = (id: string) => document.getElementById(id);

function pred(iso: string | null): string {
  if (!iso) return "nevíme";
  const min = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (!Number.isFinite(min)) return "nevíme";
  if (min < 1) return "právě teď";
  if (min < 60) return `před ${min} min`;
  return `před ${Math.round(min / 60)} h`;
}

if (API) {
  fetch(API, { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: {
      uroven: "ok" | "problem" | "nevime";
      ridiciAplikaceOk: boolean;
      posledniKontrola: string | null;
      intervalKontrolyMin?: number;
    }) => {
      const stav = el("dp-stav");
      const pod = el("dp-stav-pod");
      if (stav && pod) {
        if (d.uroven === "ok") {
          stav.textContent = "běží";
          stav.style.color = "#15803D";
          pod.textContent = "měření běží, řídicí aplikace odpovídá";
        } else if (d.uroven === "problem") {
          stav.textContent = "máme problém";
          stav.style.color = "#B91C1C";
          pod.textContent = "podrobnosti na stránce Stav služby";
        } else {
          stav.textContent = "nevíme";
          stav.style.color = "#64748B";
          pod.textContent = "poslední měření je příliš staré";
        }
      }

      const k = el("dp-kontrola");
      if (k) k.textContent = pred(d.posledniKontrola);

      // Interval bereme z API, ne z natvrdo napsaného textu — jinak by tu
      // stálo „každých 10 minut" i poté, co bychom cron zpomalili.
      const i = el("dp-interval");
      if (i && typeof d.intervalKontrolyMin === "number") {
        i.textContent = `kontrolujeme každých ${d.intervalKontrolyMin} min`;
      }
    })
    .catch(() => {
      const stav = el("dp-stav");
      const pod = el("dp-stav-pod");
      if (stav) { stav.textContent = "nevíme"; stav.style.color = "#64748B"; }
      if (pod) pod.textContent = "nepodařilo se spojit s naším rozhraním";
    });
}
