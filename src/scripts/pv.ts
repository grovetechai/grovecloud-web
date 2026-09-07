// Bezcookie pageview beacon webu grovecloud.cz.
//
// Pošle jedno mikro-hlášení o načtení stránky na grovetechai.com/api/pv.
// ŽÁDNÉ cookies, žádné ID návštěvníka, žádné sledování napříč weby — jen
// agregovatelná pole (cesta, jazyk, host odkazujícího webu, typ zařízení, UTM).
// Server IP neukládá. Proto to nepotřebuje souhlas ani cookie lištu.
//
// CSP-safe: externí soubor (Astro ho bunduje), takže projde `script-src 'self'`.
// Cross-origin POST řeší preflight OPTIONS, který má server povolený pro naše
// originy (server/routes.ts, grovecloudCors).

const PV_API = "https://grovetechai.com";

function jazyk(): string | null {
  const l = (document.documentElement.lang || "").slice(0, 2).toLowerCase();
  return l === "cs" || l === "en" || l === "sk" ? l : null;
}

function referrerHost(): string | null {
  try {
    if (!document.referrer) return null;
    const h = new URL(document.referrer).host.replace(/^www\./, "");
    // Vlastní návštěvy (proklik uvnitř webu) jako zdroj nehlásíme.
    if (h.endsWith("grovecloud.cz")) return null;
    return h || null;
  } catch { return null; }
}

function beacon() {
  try {
    const q = new URLSearchParams(location.search);
    const payload = {
      path: location.pathname,
      lang: jazyk(),
      referrerHost: referrerHost(),
      utmSource: q.get("utm_source"),
      utmMedium: q.get("utm_medium"),
      utmCampaign: q.get("utm_campaign"),
      device: window.innerWidth < 768 ? "mobile" : "desktop",
    };
    void fetch(`${PV_API}/api/pv`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: "omit",
      mode: "cors",
    }).catch(() => {});
  } catch { /* beacon nikdy nesmí shodit stránku */ }
}

// Nechceme brzdit vykreslení — počkáme, až je stránka načtená.
if (document.readyState === "complete") beacon();
else window.addEventListener("load", beacon, { once: true });
