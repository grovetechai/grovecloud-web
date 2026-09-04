# Grove Cloud — web grovecloud.cz

Statický marketingový web. Astro 5, žádný server, žádný inline JS (CSP `script-src 'self'`).
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
