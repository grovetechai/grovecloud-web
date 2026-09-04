// Grove Cloud web — čistě statický výstup (žádný server, žádný runtime k útoku).
// Skripty Astro bunduje do externích souborů → CSP může být `script-src 'self'`
// bez 'unsafe-inline'. Nikde v projektu nepoužívat define:vars ani is:inline.
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://grovecloud.cz",
  output: "static",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "never" },
  // assetsInlineLimit: 0 → i malé skripty jdou do externích souborů (CSP bez 'unsafe-inline').
  vite: { build: { assetsInlineLimit: 0 } },
  compressHTML: true,
});
