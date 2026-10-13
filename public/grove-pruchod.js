// Průchod kořenem: kdo přijde z grovetechai.com (strom s kořeny), uvidí, jak
// „projde“ kořenem Grove Cloud. Musí běžet v <head> PŘED vykreslením stránky,
// jinak by návštěvník na zlomek vteřiny viděl hotovou stránku a pak skok zpět.
// Externí soubor kvůli CSP script-src 'self'. Jen jednou za návštěvu, ne na
// mobilu a ne při prefers-reduced-motion. Ruční test: ?pruchod=1
(function () {
  try {
    var html = document.documentElement;
    // Strom na grovetechai.com odkazuje na grovecloud.cz/#koren (referrer tam
    // nejde použít — grovetechai.com posílá Referrer-Policy: no-referrer).
    // Kotvu hned smažeme, aby se průchod při obnovení neopakoval.
    var zeStromu = location.hash === "#koren";
    if (zeStromu) { try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {} }
    var vynutit = zeStromu || /[?&]pruchod=1(&|$)/.test(location.search);
    if (!vynutit) {
      var r = document.referrer;
      if (!r) return;
      var host = new URL(r).hostname;
      if (!/(^|\.)grovetechai\.com$/.test(host)) return;
      if (sessionStorage.getItem("gc-pruchod")) return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 819px)").matches) return;
    try { sessionStorage.setItem("gc-pruchod", "1"); } catch (e) {}
    html.setAttribute("data-pruchod", "1");
  } catch (e) { /* nikdy nesmí rozbít stránku */ }
})();
