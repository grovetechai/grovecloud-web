# Grove Cloud — web grovecloud.cz

Statický marketingový web. Astro 5, žádné SSR, žádný inline JS (CSP `script-src 'self'`).
Běží na Grove Cloud jako Starter (statika, sdílený Caddy) — web je zároveň důkaz produktu.

## Ceník = 1:1 s aplikací

`src/data/pricing.json` **needitovat ručně**. Generuje se z hlavního repa:

```
cd ../Modern-Web-AI   # repo vibechek
npx tsx scripts/grovecloud-pricing-export.ts ../grovecloud-web/src/data/pricing.json
```

Zdroj pravdy: `shared/grovecloud-pricing.ts` + `shared/grovecloud-plans.ts`.

## Vývoj

```
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## Nasazení

Přes Grove Cloud onboarding z GitHubu (detekce: Astro → statika → Starter).
Vlastní doména `grovecloud.cz` + `www` přes flow „Vlastní doména" v aplikaci.

### Alternativa: Node kontejner

Pokud hosting spouští `npm start`, použijte následující postup:

```
npm ci
npm run build
npm start
```

`npm start` obsluhuje hotový adresář `dist/` pomocí `serve-handler`. Poslouchá na
`0.0.0.0` a portu z proměnné `PORT` (výchozí `3000`). Build musí proběhnout
před spuštěním; změny zdrojových souborů vyžadují nový build. Chybějící build
nebo neplatný port ukončí start s vysvětlením chyby.

Pro statické nasazení přes Caddy zůstává výstupním adresářem `dist/` a žádný
Node proces není potřeba. Chyba `Missing script: "start"` značí, že hosting
zkouší projekt spustit jako Node aplikaci.
