/**
 * Překlady webu Grove Cloud — jeden zdroj pravdy pro čeština / angličtina / slovenština.
 *
 * ══ PROČ JEDEN SOUBOR A NE TŘI ═════════════════════════════════════════════
 * Klíče musí být vidět vedle sebe. Když je každý jazyk zvlášť, chybějící
 * překlad se pozná až na živém webu — návštěvník uvidí anglickou větu uprostřed
 * české stránky, nebo prázdno. Takhle to hlídá i test (i18n-parita.test.ts):
 * všechny tři jazyky musí mít přesně stejnou sadu klíčů.
 *
 * ══ MĚNA ═══════════════════════════════════════════════════════════════════
 * Fakturujeme v korunách přes Stripe (viz stripeAmountFromCzk). Eurová cena je
 * tedy ORIENTAČNÍ PŘEPOČET, ne cena, kterou zákazník zaplatí — a musí to být
 * napsané. Kdyby si Slovák nebo Rakušan objednal s očekáváním faktury v eurech,
 * byl by to náš problém, ne jeho nepozornost.
 *
 * ══ CO SE NEPŘEKLÁDÁ ═══════════════════════════════════════════════════════
 * Názvy produktů (Grove Cloud, GroveCheck, AI GroveDefender) a tarifů
 * (Starter, Secure Host…) zůstávají ve všech jazycích stejné. Jsou to značky.
 */

export const JAZYKY = { cs: "Čeština", en: "English", sk: "Slovenčina" } as const;
export type Jazyk = keyof typeof JAZYKY;
export const VYCHOZI: Jazyk = "cs";

/** Jazyky bez prefixu v URL. Čeština je doma, ostatní mají /en/ a /sk/. */
export const BEZ_PREFIXU: Jazyk = "cs";

/**
 * Ve které měně cenu ukazujeme jako hlavní.
 *
 * Slovensko platí eurem, takže slovenská verze ukazuje eura — i když
 * fakturujeme v Kč. Přepočet je u ceny vždy vysvětlený.
 */
export const MENA: Record<Jazyk, "czk" | "eur"> = { cs: "czk", en: "eur", sk: "eur" };

/** HTML lang + og:locale. */
export const LOCALE: Record<Jazyk, { lang: string; og: string }> = {
  cs: { lang: "cs", og: "cs_CZ" },
  en: { lang: "en", og: "en_US" },
  sk: { lang: "sk", og: "sk_SK" },
};

export const ui = {
  // ── Navigace a společné ──────────────────────────────────────────────────
  "nav.jak": { cs: "Jak funguje", en: "How it works", sk: "Ako funguje" },
  "nav.bezpecnost": { cs: "Bezpečnost", en: "Security", sk: "Bezpečnosť" },
  "nav.cenik": { cs: "Ceník", en: "Pricing", sk: "Cenník" },
  "nav.stav": { cs: "Stav", en: "Status", sk: "Stav" },
  "nav.prihlasit": { cs: "Přihlásit", en: "Sign in", sk: "Prihlásiť" },
  "nav.domu": { cs: "Grove Cloud — domů", en: "Grove Cloud — home", sk: "Grove Cloud — domov" },
  "a11y.preskocit": { cs: "Přeskočit na obsah", en: "Skip to content", sk: "Preskočiť na obsah" },
  "a11y.hlavni": { cs: "Hlavní", en: "Main", sk: "Hlavná" },
  "a11y.jazyk": { cs: "Jazyk", en: "Language", sk: "Jazyk" },

  // ── Hero ─────────────────────────────────────────────────────────────────
  "hero.eyebrow": {
    cs: "SECURE MANAGED CLOUD PRO AI A VIBE-CODED APLIKACE",
    en: "SECURE MANAGED CLOUD FOR AI AND VIBE-CODED APPS",
    sk: "SECURE MANAGED CLOUD PRE AI A VIBE-CODED APLIKÁCIE",
  },
  "hero.h1a": {
    cs: "Cloud, který aplikaci nejen nasadí.",
    en: "A cloud that doesn't just deploy your app.",
    sk: "Cloud, ktorý aplikáciu nielen nasadí.",
  },
  "hero.h1b": {
    cs: "Ale také prověří, ochrání a hlídá.",
    en: "It also scans it, protects it and watches it.",
    sk: "Ale aj preverí, ochráni a stráži.",
  },
  "hero.lead": {
    cs: "Připojte GitHub a během několika minut spusťte aplikaci v evropském cloudu. Po každém nasazení ji prověří GroveCheck ({n} kontrol), za běhu ji může chránit AI GroveDefender a při problému zasáhne automatika nebo člověk.",
    en: "Connect GitHub and launch your app in a European cloud within minutes. After every deployment GroveCheck scans it ({n} checks), AI GroveDefender can protect it at runtime, and when something breaks, automation or a human steps in.",
    sk: "Pripojte GitHub a v priebehu niekoľkých minút spustite aplikáciu v európskom cloude. Po každom nasadení ju preverí GroveCheck ({n} kontrol), za behu ju môže chrániť AI GroveDefender a pri probléme zasiahne automatika alebo človek.",
  },
  "hero.cta1": { cs: "Nasadit aplikaci →", en: "Deploy an app →", sk: "Nasadiť aplikáciu →" },
  "hero.cta2": { cs: "Zkontrolovat web zdarma", en: "Scan your site for free", sk: "Skontrolovať web zadarmo" },
  "hero.podCta": {
    cs: "Bez platební karty · EU infrastruktura · Česká podpora · Statický web od {cena}",
    en: "No credit card · EU infrastructure · Support in Czech and English · Static site from {cena}",
    sk: "Bez platobnej karty · EU infraštruktúra · Podpora v slovenčine a češtine · Statický web od {cena}",
  },
  "hero.hint": {
    cs: "Pohni myší nad kostkami — rozestoupí se a zase složí.",
    en: "Move your mouse over the cubes — they scatter and reassemble.",
    sk: "Pohni myšou nad kockami — rozostúpia sa a zase zložia.",
  },

  // ── Grove řetězec ────────────────────────────────────────────────────────
  "retez.step": { cs: "JAK TO DRŽÍ POHROMADĚ", en: "HOW IT FITS TOGETHER", sk: "AKO TO DRŽÍ POKOPE" },
  "retez.h2": {
    cs: "Jedna platforma místo čtyř nespojených nástrojů.",
    en: "One platform instead of four disconnected tools.",
    sk: "Jedna platforma namiesto štyroch nespojených nástrojov.",
  },
  "retez.sub": {
    cs: "Hosting, bezpečnostní kontrola, runtime ochrana a provozní dohled spolu mluví. Nález ze skenu se propíše do ochrany, výpadek do vašeho e-mailu.",
    en: "Hosting, security scanning, runtime protection and monitoring talk to each other. A scan finding turns into a protection rule; an outage turns into an email.",
    sk: "Hosting, bezpečnostná kontrola, runtime ochrana a prevádzkový dohľad spolu hovoria. Nález zo skenu sa prepíše do ochrany, výpadok do vášho e-mailu.",
  },
  "retez.1.d": {
    cs: "Vyberete repozitář. Detekce projde kořen i podsložky a řekne, z čeho se aplikace skládá.",
    en: "Pick a repository. Detection walks the root and subfolders and tells you what the app is built from.",
    sk: "Vyberiete repozitár. Detekcia prejde koreň aj podpriečinky a povie, z čoho sa aplikácia skladá.",
  },
  "retez.2.n": { cs: "Grove Cloud", en: "Grove Cloud", sk: "Grove Cloud" },
  "retez.2.d": {
    cs: "Nasazení do evropského cloudu. Statika na sdílený server, dynamická aplikace do vlastního kontejneru.",
    en: "Deployment to a European cloud. Static sites on a shared server, dynamic apps in their own container.",
    sk: "Nasadenie do európskeho cloudu. Statika na zdieľaný server, dynamická aplikácia do vlastného kontajnera.",
  },
  "retez.3.d": {
    cs: "{n} kontrol proti veřejné adrese hned po nasazení. Hlavičky, TLS, uniklé klíče, malware.",
    en: "{n} checks against the public address right after deployment. Headers, TLS, leaked keys, malware.",
    sk: "{n} kontrol proti verejnej adrese hneď po nasadení. Hlavičky, TLS, uniknuté kľúče, malware.",
  },
  "retez.4.d": {
    cs: "Ochrana za běhu: prompt injection, únik dat, podezřelé požadavky. Volitelně jedním řádkem v kódu.",
    en: "Runtime protection: prompt injection, data exfiltration, suspicious requests. Optional, one line of code.",
    sk: "Ochrana za behu: prompt injection, únik dát, podozrivé požiadavky. Voliteľne jedným riadkom v kóde.",
  },
  "retez.5.n": { cs: "Dohled", en: "Monitoring", sk: "Dohľad" },
  "retez.5.d": {
    cs: "Kontrola dostupnosti každých 10 minut. Podle tarifu automatický restart nebo eskalace na člověka.",
    en: "Availability checked every 10 minutes. Depending on the plan, automatic restart or escalation to a human.",
    sk: "Kontrola dostupnosti každých 10 minút. Podľa tarifu automatický reštart alebo eskalácia na človeka.",
  },
  "retez.detail": { cs: "Detail →", en: "Details →", sk: "Detail →" },
  "retez.stitek.hosting": { cs: "hosting", en: "hosting", sk: "hosting" },
  "retez.stitek.kontrola": { cs: "kontrola", en: "scanning", sk: "kontrola" },
  "retez.stitek.ochrana": { cs: "ochrana", en: "protection", sk: "ochrana" },
  "retez.stitek.provoz": { cs: "provoz", en: "monitoring", sk: "prevádzka" },
  "claim": {
    cs: "Nasadíme. Prověříme. Ochráníme. Hlídáme.",
    en: "We deploy. We scan. We protect. We watch.",
    sk: "Nasadíme. Preveríme. Ochránime. Strážime.",
  },

  // ── Srovnání ─────────────────────────────────────────────────────────────
  "srov.step": { cs: "SROVNÁNÍ", en: "COMPARISON", sk: "POROVNANIE" },
  "srov.h2": {
    cs: "Hosting je jen začátek. Bezpečný provoz je celý produkt.",
    en: "Hosting is just the start. Secure operation is the whole product.",
    sk: "Hosting je len začiatok. Bezpečná prevádzka je celý produkt.",
  },
  "srov.sub": {
    cs: "Srovnáváme se s kategorií, ne s konkrétní službou — funkce se u všech mění každý měsíc a nechceme tvrdit něco, co za půl roku nebude platit.",
    en: "We compare against a category, not a named service — features change monthly and we don't want to claim something that won't hold in six months.",
    sk: "Porovnávame sa s kategóriou, nie s konkrétnou službou — funkcie sa u všetkých menia každý mesiac a nechceme tvrdiť niečo, čo o pol roka nebude platiť.",
  },
  "srov.funkce": { cs: "Funkce", en: "Feature", sk: "Funkcia" },
  "srov.bezny": { cs: "Běžný hosting", en: "Typical hosting", sk: "Bežný hosting" },
  "srov.ano": { cs: "ano", en: "yes", sk: "áno" },
  "srov.nekdy": { cs: "někdy", en: "sometimes", sk: "niekedy" },
  "srov.vetsinou-ne": { cs: "většinou ne", en: "usually not", sk: "väčšinou nie" },
  "srov.externi": { cs: "externí nástroj", en: "external tool", sk: "externý nástroj" },
  "srov.castecne": { cs: "částečně", en: "partially", sk: "čiastočne" },
  "srov.podle-sluzby": { cs: "podle služby", en: "varies", sk: "podľa služby" },
  "srov.podle-tarifu": { cs: "podle tarifu", en: "by plan", sk: "podľa tarifu" },
  "srov.kazdych10": { cs: "každých 10 min", en: "every 10 min", sk: "každých 10 min" },
  "srov.r1": { cs: "Automatické nasazení z GitHubu", en: "Automatic deployment from GitHub", sk: "Automatické nasadenie z GitHubu" },
  "srov.r2": { cs: "Rozpoznání AI/vibe-coded stacku", en: "AI / vibe-coded stack detection", sk: "Rozpoznanie AI/vibe-coded stacku" },
  "srov.r2p": { cs: "Next.js, Vite, Astro, Express, FastAPI i vlastní Dockerfile", en: "Next.js, Vite, Astro, Express, FastAPI or your own Dockerfile", sk: "Next.js, Vite, Astro, Express, FastAPI aj vlastný Dockerfile" },
  "srov.r3": { cs: "Bezpečnostní kontrola po nasazení", en: "Security scan after deployment", sk: "Bezpečnostná kontrola po nasadení" },
  "srov.r3p": { cs: "v ceně každého tarifu, nespotřebuje kvótu GroveChecku", en: "included in every plan, doesn't consume your GroveCheck quota", sk: "v cene každého tarifu, nespotrebuje kvótu GroveChecku" },
  "srov.r4": { cs: "Kontrola uniklých klíčů a konfigurace", en: "Leaked keys and misconfiguration check", sk: "Kontrola uniknutých kľúčov a konfigurácie" },
  "srov.r5": { cs: "Bezpečnostní hlavičky a TLS bez konfigurace", en: "Security headers and TLS with zero config", sk: "Bezpečnostné hlavičky a TLS bez konfigurácie" },
  "srov.r5p": { cs: "HSTS, CSP, nosniff, X-Frame-Options, Referrer-Policy", en: "HSTS, CSP, nosniff, X-Frame-Options, Referrer-Policy", sk: "HSTS, CSP, nosniff, X-Frame-Options, Referrer-Policy" },
  "srov.r6": { cs: "AI runtime ochrana", en: "AI runtime protection", sk: "AI runtime ochrana" },
  "srov.r6p": { cs: "volitelně, jedním řádkem v kódu", en: "optional, one line of code", sk: "voliteľne, jedným riadkom v kóde" },
  "srov.r7": { cs: "Kontrola dostupnosti", en: "Availability monitoring", sk: "Kontrola dostupnosti" },
  "srov.r8": { cs: "Automatický restart při výpadku", en: "Automatic restart on failure", sk: "Automatický reštart pri výpadku" },
  "srov.r9": { cs: "Lidská bezpečnostní eskalace", en: "Human security escalation", sk: "Ľudská bezpečnostná eskalácia" },
  "srov.r10": { cs: "Česká podpora", en: "Support in Czech and English", sk: "Podpora v slovenčine a češtine" },
  "srov.r11": { cs: "Fakturace v Kč", en: "Invoicing in CZK", sk: "Fakturácia v Kč" },
  "srov.r11p": { cs: "bez seat pricingu v dolarech", en: "no per-seat pricing in dollars", sk: "bez seat pricingu v dolároch" },

  // ── Živý důkaz ───────────────────────────────────────────────────────────
  "dukaz.step": { cs: "DŮKAZ", en: "PROOF", sk: "DÔKAZ" },
  "dukaz.h2": { cs: "Tento web běží na Grove Cloud.", en: "This site runs on Grove Cloud.", sk: "Tento web beží na Grove Cloud." },
  "dukaz.sub": {
    cs: "Každé nasazení téhle stránky projde stejným procesem jako aplikace zákazníků: build z GitHubu, bezpečnostní hlavičky ze sdíleného Caddy, {n} kontrol po nasazení a kontrola dostupnosti každých 10 minut. Tarif Starter, {cena}.",
    en: "Every deployment of this page goes through the same process as customer apps: a GitHub build, security headers from the shared Caddy, {n} checks after deployment and an availability check every 10 minutes. Starter plan, {cena}.",
    sk: "Každé nasadenie tejto stránky prejde rovnakým procesom ako aplikácie zákazníkov: build z GitHubu, bezpečnostné hlavičky zo zdieľaného Caddy, {n} kontrol po nasadení a kontrola dostupnosti každých 10 minút. Tarif Starter, {cena}.",
  },
  "dukaz.stav": { cs: "Stav služby", en: "Service status", sk: "Stav služby" },
  "dukaz.zjistuji": { cs: "zjišťuji…", en: "checking…", sk: "zisťujem…" },
  "dukaz.nacitam": { cs: "načítám z našeho rozhraní", en: "loading from our API", sk: "načítavam z nášho rozhrania" },
  "dukaz.posledni": { cs: "Poslední kontrola", en: "Last check", sk: "Posledná kontrola" },
  "dukaz.merime": { cs: "měříme pravidelně", en: "measured regularly", sk: "meriame pravidelne" },
  "dukaz.lokalita": { cs: "Lokalita", en: "Location", sk: "Lokalita" },
  "dukaz.lokalitaPod": { cs: "Hetzner, Norimberk · Německo", en: "Hetzner, Nuremberg · Germany", sk: "Hetzner, Norimberg · Nemecko" },
  "dukaz.tarif": { cs: "Tarif tohoto webu", en: "This site's plan", sk: "Tarif tohto webu" },
  "dukaz.tarifPod": { cs: "statika ze sdíleného serveru, {cena}", en: "static files from a shared server, {cena}", sk: "statika zo zdieľaného servera, {cena}" },
  "dukaz.odkaz": {
    cs: "Podrobný stav včetně toho, co nezveřejňujeme a proč, je na",
    en: "Full status, including what we don't publish and why, is on the",
    sk: "Podrobný stav vrátane toho, čo nezverejňujeme a prečo, je na",
  },
  "dukaz.odkazText": { cs: "stránce Stav služby", en: "Service status page", sk: "stránke Stav služby" },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  "faq.step": { cs: "ČASTÉ OTÁZKY", en: "FAQ", sk: "ČASTÉ OTÁZKY" },
  "faq.h2": { cs: "Než se rozhodnete", en: "Before you decide", sk: "Než sa rozhodnete" },
  "faq.q1": { cs: "Musím umět Docker nebo spravovat server?", en: "Do I need to know Docker or manage a server?", sk: "Musím vedieť Docker alebo spravovať server?" },
  "faq.a1": {
    cs: "Ne. Vyberete repozitář na GitHubu, my z něj poznáme, o jaký projekt jde, a navrhneme build, start i port. Statický web běží ze sdíleného serveru, dynamická aplikace ve vlastním kontejneru — obojí bez zásahu z vaší strany.",
    en: "No. Pick a GitHub repository, we detect what kind of project it is and suggest the build command, start command and port. Static sites run from a shared server, dynamic apps in their own container — neither needs anything from you.",
    sk: "Nie. Vyberiete repozitár na GitHube, my z neho spoznáme, o aký projekt ide, a navrhneme build, štart aj port. Statický web beží zo zdieľaného servera, dynamická aplikácia vo vlastnom kontajneri — oboje bez zásahu z vašej strany.",
  },
  "faq.q2": { cs: "Co přesně dělá bezpečnostní kontrola po nasazení?", en: "What exactly does the post-deployment scan do?", sk: "Čo presne robí bezpečnostná kontrola po nasadení?" },
  "faq.a2": {
    cs: "Spustí {n} kontrol proti veřejné adrese aplikace: hlavičky, TLS, uniklé klíče v odpovědích, malware, phishing na naší doméně. Výsledek uvidíte u aplikace hned po nasazení a nespotřebuje vám kvótu GroveChecku.",
    en: "It runs {n} checks against your app's public address: headers, TLS, keys leaked in responses, malware, phishing on our domain. You see the result right after deployment and it doesn't consume your GroveCheck quota.",
    sk: "Spustí {n} kontrol proti verejnej adrese aplikácie: hlavičky, TLS, uniknuté kľúče v odpovediach, malware, phishing na našej doméne. Výsledok uvidíte pri aplikácii hneď po nasadení a nespotrebuje vám kvótu GroveChecku.",
  },
  "faq.q3": { cs: "Opravíte nálezy za mě?", en: "Will you fix the findings for me?", sk: "Opravíte nálezy za mňa?" },
  "faq.a3": {
    cs: "Bezpečnostní konfiguraci infrastruktury nastavíme automaticky — hlavičky, TLS, izolace. Chyby přímo ve vašem kódu vám ukážeme s postupem opravy, ale nepřepisujeme vám aplikaci. Slibovat automatickou opravu všeho by nebyla pravda.",
    en: "We configure the infrastructure side automatically — headers, TLS, isolation. Bugs in your own code we show you with a fix guide, but we don't rewrite your app. Promising to fix everything automatically wouldn't be true.",
    sk: "Bezpečnostnú konfiguráciu infraštruktúry nastavíme automaticky — hlavičky, TLS, izoláciu. Chyby priamo vo vašom kóde vám ukážeme s postupom opravy, ale neprepisujeme vám aplikáciu. Sľubovať automatickú opravu všetkého by nebola pravda.",
  },
  "faq.q4": { cs: "Co se stane, když aplikace spadne?", en: "What happens if my app goes down?", sk: "Čo sa stane, keď aplikácia spadne?" },
  "faq.a4": {
    cs: "Dostupnost kontrolujeme každých 10 minut. Podle tarifu buď zasáhne automatika (restart), nebo se výpadek eskaluje na člověka. O výpadku vám přijde e-mail — nemusíte se dívat do panelu.",
    en: "We check availability every 10 minutes. Depending on the plan, automation restarts it or the outage is escalated to a human. You get an email — you don't have to watch the dashboard.",
    sk: "Dostupnosť kontrolujeme každých 10 minút. Podľa tarifu buď zasiahne automatika (reštart), alebo sa výpadok eskaluje na človeka. O výpadku vám príde e-mail — nemusíte sa pozerať do panela.",
  },
  "faq.q5": { cs: "Kde jsou data a v čem platím?", en: "Where is my data and what do I pay in?", sk: "Kde sú dáta a v čom platím?" },
  "faq.a5": {
    cs: "Servery jsou v Německu (Hetzner, Norimberk), podpora je česká a fakturujeme v korunách. Žádný seat pricing v dolarech.",
    en: "Servers are in Germany (Hetzner, Nuremberg). Invoicing is in Czech koruna; prices shown in euro are a conversion for orientation. No per-seat pricing in dollars.",
    sk: "Servery sú v Nemecku (Hetzner, Norimberg). Fakturujeme v českých korunách; ceny v eurách sú orientačný prepočet. Žiadny seat pricing v dolároch.",
  },
  "faq.q6": { cs: "Můžu kdykoli odejít?", en: "Can I leave at any time?", sk: "Môžem kedykoľvek odísť?" },
  "faq.a6": {
    cs: "Ano. Váš kód je celou dobu ve vašem repozitáři na GitHubu, my z něj jen stavíme. Nedržíme vás žádným proprietárním formátem ani exportem.",
    en: "Yes. Your code stays in your own GitHub repository the whole time; we only build from it. No proprietary format, no export to wrestle with.",
    sk: "Áno. Váš kód je celý čas vo vašom repozitári na GitHube, my z neho iba staviame. Nedržíme vás žiadnym proprietárnym formátom ani exportom.",
  },
  "faq.q7": { cs: "Potřebuju k tomu účet na Grove Tech AI?", en: "Do I need a Grove Tech AI account?", sk: "Potrebujem k tomu účet na Grove Tech AI?" },
  "faq.a7": {
    cs: "Ano, je to jeden účet pro GroveCheck, Defender i Cloud. Bezpečnostní sken si ale můžete vyzkoušet hned tady na stránce, bez registrace i bez karty.",
    en: "Yes — one account covers GroveCheck, Defender and Cloud. You can still try the security scan right here on this page, without signing up or entering a card.",
    sk: "Áno, je to jeden účet pre GroveCheck, Defender aj Cloud. Bezpečnostný sken si však môžete vyskúšať hneď tu na stránke, bez registrácie aj bez karty.",
  },

  // ── Finální CTA ──────────────────────────────────────────────────────────
  "fin.h2": {
    cs: "Vaše aplikace už běží. Teď ji nechte běžet bezpečně.",
    en: "Your app is already running. Now let it run securely.",
    sk: "Vaša aplikácia už beží. Teraz ju nechajte bežať bezpečne.",
  },
  "fin.p": {
    cs: "Grove Cloud propojuje managed hosting, GroveCheck a AI GroveDefender do jedné bezpečnostní platformy.",
    en: "Grove Cloud combines managed hosting, GroveCheck and AI GroveDefender into a single security platform.",
    sk: "Grove Cloud prepája managed hosting, GroveCheck a AI GroveDefender do jednej bezpečnostnej platformy.",
  },
  "fin.cta2": { cs: "Domluvit migraci", en: "Talk about migration", sk: "Dohodnúť migráciu" },

  // ── Patička ──────────────────────────────────────────────────────────────
  "pat.produkty": { cs: "Produkty", en: "Products", sk: "Produkty" },
  "pat.firma": { cs: "Firma", en: "Company", sk: "Firma" },
  "pat.pravo": { cs: "Provoz a právo", en: "Operations and legal", sk: "Prevádzka a právo" },
  "pat.scanner": { cs: "GroveCheck — bezpečnostní sken", en: "GroveCheck — security scanner", sk: "GroveCheck — bezpečnostný sken" },
  "pat.defender": { cs: "AI GroveDefender", en: "AI GroveDefender", sk: "AI GroveDefender" },
  "pat.pentest": { cs: "Automatizovaný pentest", en: "Automated pentest", sk: "Automatizovaný pentest" },
  "pat.metodika": { cs: "Metodika kontrol", en: "Scan methodology", sk: "Metodika kontrol" },
  "pat.onas": { cs: "O Grove Tech AI", en: "About Grove Tech AI", sk: "O Grove Tech AI" },
  "pat.kontakt": { cs: "Kontakt", en: "Contact", sk: "Kontakt" },
  "pat.reference": { cs: "Reference", en: "Case studies", sk: "Referencie" },
  "pat.podminky": { cs: "Obchodní podmínky", en: "Terms of service", sk: "Obchodné podmienky" },
  "pat.soukromi": { cs: "Zpracování údajů", en: "Data processing", sk: "Spracovanie údajov" },
  "pat.stav": { cs: "Stav služby", en: "Service status", sk: "Stav služby" },
  "pat.security": { cs: "Bezpečnostní kontakt", en: "Security contact", sk: "Bezpečnostný kontakt" },
  "pat.popis": {
    cs: "Produkt {firma} — managed hosting propojený s bezpečnostním skenerem a runtime ochranou.",
    en: "A product of {firma} — managed hosting wired into a security scanner and runtime protection.",
    sk: "Produkt {firma} — managed hosting prepojený s bezpečnostným skenerom a runtime ochranou.",
  },
  "pat.bezi": { cs: "Tento web běží na Grove Cloud · tarif Starter, {cena}", en: "This site runs on Grove Cloud · Starter plan, {cena}", sk: "Tento web beží na Grove Cloud · tarif Starter, {cena}" },
  "pat.spodek": { cs: "servery v EU · Hetzner, Norimberk · fakturace v Kč", en: "servers in the EU · Hetzner, Nuremberg · invoiced in CZK", sk: "servery v EU · Hetzner, Norimberg · fakturácia v Kč" },

  // ── Měna ─────────────────────────────────────────────────────────────────
  "mena.orientacne": {
    cs: "Ceny jsou bez DPH. Fakturujeme v korunách; částky v eurech jsou orientační přepočet kurzem {kurz} Kč/€.",
    en: "Prices exclude VAT. We invoice in Czech koruna; euro amounts are a conversion at {kurz} CZK/€ for orientation.",
    sk: "Ceny sú bez DPH. Fakturujeme v korunách; sumy v eurách sú orientačný prepočet kurzom {kurz} Kč/€.",
  },
  "mena.mesicne": { cs: "měsíčně", en: "per month", sk: "mesačne" },

  // ── Meta (title + description pro každou stránku) ────────────────────────
  "meta.index.t": {
    cs: "Grove Cloud — cloud, který aplikaci nasadí, prověří, ochrání a hlídá",
    en: "Grove Cloud — a cloud that deploys, scans, protects and watches your app",
    sk: "Grove Cloud — cloud, ktorý aplikáciu nasadí, preverí, ochráni a stráži",
  },
  "meta.index.d": {
    cs: "Připojte GitHub a spusťte aplikaci v evropském cloudu. Po každém nasazení ji prověří GroveCheck ({n} kontrol), za běhu ji chrání AI GroveDefender a dostupnost hlídáme každých 10 minut. Statický web od {cena}.",
    en: "Connect GitHub and launch your app in a European cloud. After every deployment GroveCheck scans it ({n} checks), AI GroveDefender protects it at runtime and we check availability every 10 minutes. Static sites from {cena}.",
    sk: "Pripojte GitHub a spustite aplikáciu v európskom cloude. Po každom nasadení ju preverí GroveCheck ({n} kontrol), za behu ju chráni AI GroveDefender a dostupnosť strážime každých 10 minút. Statický web od {cena}.",
  },
  "meta.cena.t": { cs: "Cena — Grove Cloud", en: "Pricing — Grove Cloud", sk: "Cena — Grove Cloud" },
  "meta.jak.t": { cs: "Jak to funguje — Grove Cloud", en: "How it works — Grove Cloud", sk: "Ako to funguje — Grove Cloud" },
  "meta.bezp.t": { cs: "Bezpečnost — Grove Cloud", en: "Security — Grove Cloud", sk: "Bezpečnosť — Grove Cloud" },
  "meta.stav.t": { cs: "Stav služby — Grove Cloud", en: "Service status — Grove Cloud", sk: "Stav služby — Grove Cloud" },
  "meta.stav.d": {
    cs: "Aktuální stav Grove Cloudu: běží řídicí aplikace a hostované aplikace? Měříme každých 10 minut.",
    en: "Current Grove Cloud status: is the control app up, are hosted apps responding? Measured every 10 minutes.",
    sk: "Aktuálny stav Grove Cloudu: beží riadiaca aplikácia a hostované aplikácie? Meriame každých 10 minút.",
  },
  "meta.404.t": { cs: "Stránka nenalezena — Grove Cloud", en: "Page not found — Grove Cloud", sk: "Stránka nenájdená — Grove Cloud" },
  "meta.404.d": {
    cs: "Tahle adresa na Grove Cloudu neexistuje.",
    en: "This address does not exist on Grove Cloud.",
    sk: "Táto adresa na Grove Cloude neexistuje.",
  },

  // ── 404 ──────────────────────────────────────────────────────────────────
  "e404.h1": { cs: "Tuhle stránku tu nemáme", en: "We don't have this page", sk: "Túto stránku tu nemáme" },
  "e404.text": {
    cs: "Adresa, kterou jste zadali, na Grove Cloudu neexistuje. Mohla se přesunout, nebo je v odkazu překlep.",
    en: "The address you entered doesn't exist on Grove Cloud. It may have moved, or there's a typo in the link.",
    sk: "Adresa, ktorú ste zadali, na Grove Cloude neexistuje. Mohla sa presunúť, alebo je v odkaze preklep.",
  },
  "e404.zpet": { cs: "Zpět na úvod", en: "Back to home", sk: "Späť na úvod" },
  "e404.hledate": {
    cs: "Hledáte něco konkrétního? Napište na",
    en: "Looking for something specific? Write to",
    sk: "Hľadáte niečo konkrétne? Napíšte na",
  },

  // ── Tři kroky nasazení (Pillars) ─────────────────────────────────────────
  "kroky.step": { cs: "01 · NASAZENÍ", en: "01 · DEPLOYMENT", sk: "01 · NASADENIE" },
  "kroky.h2": {
    cs: "Tři kroky. Žádný server, žádný Docker.",
    en: "Three steps. No server, no Docker.",
    sk: "Tri kroky. Žiadny server, žiadny Docker.",
  },
  "kroky.sub": {
    cs: "Grove Cloud si repo přečte sám: pozná Next.js, Vite, Astro, Express, FastAPI i vlastní Dockerfile a navrhne build, start i port.",
    en: "Grove Cloud reads the repository itself: it recognises Next.js, Vite, Astro, Express, FastAPI and your own Dockerfile, then proposes the build command, start command and port.",
    sk: "Grove Cloud si repozitár prečíta sám: pozná Next.js, Vite, Astro, Express, FastAPI aj vlastný Dockerfile a navrhne build, štart aj port.",
  },
  "kroky.1.h": { cs: "Připoj GitHub", en: "Connect GitHub", sk: "Pripoj GitHub" },
  "kroky.1.p": {
    cs: "Vyber repo. Detekce projde kořen i podsložky (client/, server/, apps/) a řekne, z čeho se appka skládá — a proč si to myslí.",
    en: "Pick a repository. Detection walks the root and subfolders (client/, server/, apps/) and tells you what the app is built from — and why it thinks so.",
    sk: "Vyber repozitár. Detekcia prejde koreň aj podpriečinky (client/, server/, apps/) a povie, z čoho sa aplikácia skladá — a prečo si to myslí.",
  },
  "kroky.2.h": { cs: "Klikni Nasadit", en: "Click Deploy", sk: "Klikni Nasadiť" },
  "kroky.2.p": {
    cs: "Statika jde na sdílený server za {cena}, dynamické appky do vlastního kontejneru. Adresa tvoje-appka.grovecloud.cz s certifikátem hned.",
    en: "Static sites go to a shared server from {cena}, dynamic apps into their own container. The address your-app.grovecloud.cz comes with a certificate right away.",
    sk: "Statika ide na zdieľaný server za {cena}, dynamické aplikácie do vlastného kontajnera. Adresa tvoja-aplikacia.grovecloud.cz s certifikátom hneď.",
  },
  // POZOR NA FORMULACI (upřesněno 5. 9. 2026): webhook je jednorázový ruční
  // krok. Dřív tu stálo „Pushni a zapomeň", což znělo, jako by nebylo potřeba
  // nic. Zjistili jsme to na sobě — u vlastního webu ho nikdo nezapojil.
  "kroky.3.h": {
    cs: "Pushni a nasadí se to samo",
    en: "Push and it deploys itself",
    sk: "Pushni a nasadí sa to samo",
  },
  "kroky.3.p": {
    cs: "Webhook do repozitáře vložíš jednou (adresu i tajemství dostaneš od nás). Pak každý push nasadí novou verzi a spustí bezpečnostní sken. Když se něco pokazí, vrátíš se jedním klikem na předchozí build.",
    en: "You add the webhook to your repository once (we generate both the URL and the secret). After that every push deploys a new version and runs a security scan. If something breaks, one click takes you back to the previous build.",
    sk: "Webhook do repozitára vložíš raz (adresu aj tajomstvo dostaneš od nás). Potom každý push nasadí novú verziu a spustí bezpečnostnú kontrolu. Keď sa niečo pokazí, vrátiš sa jedným klikom na predchádzajúci build.",
  },
  "bezp.step": { cs: "02 · BEZPEČNOST", en: "02 · SECURITY", sk: "02 · BEZPEČNOSŤ" },
  "bezp.h2": {
    cs: "Hosting, který se po každém nasazení sám zkontroluje.",
    en: "Hosting that checks itself after every deployment.",
    sk: "Hosting, ktorý sa po každom nasadení sám skontroluje.",
  },
  "bezp.sub": {
    cs: "V roce 2026 unikla data z tisíců appek napsaných AI. Tady je po každém nasazení {n} kontrol, Defender za běhu a denní zálohy — v ceně, ne jako doplněk.",
    en: "In 2026 data leaked from thousands of AI-written apps. Here every deployment is followed by {n} checks, Defender at runtime and daily backups — included, not sold as an add-on.",
    sk: "V roku 2026 unikli dáta z tisícov aplikácií napísaných AI. Tu je po každom nasadení {n} kontrol, Defender za behu a denné zálohy — v cene, nie ako doplnok.",
  },
  "bezp.1.n": { cs: "SKEN", en: "SCAN", sk: "SKEN" },
  "bezp.1.h": { cs: "Po každém nasazení", en: "After every deployment", sk: "Po každom nasadení" },
  "bezp.1.p": {
    cs: "Hlavičky, TLS, uniklé klíče, malware, phishing na naší doméně. Výsledek vidíš u appky dřív, než ho uvidí útočník.",
    en: "Headers, TLS, leaked keys, malware, phishing on our domain. You see the result next to your app before an attacker does.",
    sk: "Hlavičky, TLS, uniknuté kľúče, malware, phishing na našej doméne. Výsledok vidíš pri aplikácii skôr, než ho uvidí útočník.",
  },
  "bezp.2.n": { cs: "DEFENDER", en: "DEFENDER", sk: "DEFENDER" },
  "bezp.2.h": { cs: "Ochrana za běhu", en: "Runtime protection", sk: "Ochrana za behu" },
  "bezp.2.p": {
    cs: "Runtime ochrana AI vrstvy — prompt injection, únik dat, podezřelé requesty. Stejný Defender jako na grovetechai.com.",
    en: "Runtime protection for the AI layer — prompt injection, data exfiltration, suspicious requests. The same Defender that runs on grovetechai.com.",
    sk: "Runtime ochrana AI vrstvy — prompt injection, únik dát, podozrivé požiadavky. Rovnaký Defender ako na grovetechai.com.",
  },
  "bezp.3.n": { cs: "EU", en: "EU", sk: "EU" },
  "bezp.3.h": { cs: "Data v Evropě", en: "Data in Europe", sk: "Dáta v Európe" },
  "bezp.3.p": {
    cs: "Servery v Německu, česká podpora, faktura v Kč. Žádný seat pricing v dolarech.",
    en: "Servers in Germany, support in Czech and English, invoicing in CZK. No per-seat pricing in dollars.",
    sk: "Servery v Nemecku, podpora v slovenčine a češtine, faktúra v Kč. Žiadny seat pricing v dolároch.",
  },

  // ── Bezpečnostní diagram (SecurityMap) ───────────────────────────────────
  "mapa.step": { cs: "BEZPEČNOST", en: "SECURITY", sk: "BEZPEČNOSŤ" },
  "mapa.h2": {
    cs: "Co je mezi internetem a tvojí appkou",
    en: "What sits between the internet and your app",
    sk: "Čo je medzi internetom a tvojou aplikáciou",
  },
  "mapa.sub": {
    cs: "Tohle nezapínáš, nekonfiguruješ ani nedoplácíš. Je to součást hostingu — u statického webu za {cena} stejně jako u čehokoli většího.",
    en: "You don't switch this on, configure it or pay extra for it. It is part of the hosting — the same on a static site from {cena} as on anything larger.",
    sk: "Toto nezapínaš, nekonfiguruješ ani nedoplácaš. Je to súčasť hostingu — pri statickom webe za {cena} rovnako ako pri čomkoľvek väčšom.",
  },
  "mapa.1.n": { cs: "Návštěvník", en: "Visitor", sk: "Návštevník" },
  "mapa.1.d": { cs: "Požadavek z internetu", en: "A request from the internet", sk: "Požiadavka z internetu" },
  "mapa.2.n": { cs: "TLS certifikát", en: "TLS certificate", sk: "TLS certifikát" },
  "mapa.2.d": {
    cs: "Caddy ho vydá i obnovuje sám (Let's Encrypt). HTTP se přesměruje na HTTPS.",
    en: "Caddy issues and renews it automatically (Let's Encrypt). HTTP redirects to HTTPS.",
    sk: "Caddy ho vydá aj obnovuje sám (Let's Encrypt). HTTP sa presmeruje na HTTPS.",
  },
  "mapa.3.n": { cs: "Bezpečnostní hlavičky", en: "Security headers", sk: "Bezpečnostné hlavičky" },
  "mapa.4.n": { cs: "Izolace", en: "Isolation", sk: "Izolácia" },
  "mapa.4.d": {
    cs: "Statický web servírujeme jen jako soubory, dynamickou appku ve vlastním kontejneru.",
    en: "Static sites are served as files only; a dynamic app runs in its own container.",
    sk: "Statický web servírujeme len ako súbory, dynamickú aplikáciu vo vlastnom kontajneri.",
  },
  "mapa.5.n": { cs: "Tvoje appka", en: "Your app", sk: "Tvoja aplikácia" },
  "mapa.5.d": {
    cs: "Běží v EU — Hetzner, Norimberk.",
    en: "Runs in the EU — Hetzner, Nuremberg.",
    sk: "Beží v EU — Hetzner, Norimberg.",
  },
  "mapa.trvale": { cs: "A co běží trvale", en: "And what runs continuously", sk: "A čo beží trvalo" },
  "mapa.t1.n": {
    cs: "Sken po každém nasazení",
    en: "A scan after every deployment",
    sk: "Kontrola po každom nasadení",
  },
  "mapa.t1.d": {
    cs: "{n} kontrol proti veřejné adrese. Skóre uvidíš v účtu hned po deployi.",
    en: "{n} checks against the public address. You see the score in your account right after the deploy.",
    sk: "{n} kontrol proti verejnej adrese. Skóre uvidíš v účte hneď po nasadení.",
  },
  "mapa.t2.n": {
    cs: "Denní zálohy a rollback",
    en: "Daily backups and rollback",
    sk: "Denné zálohy a rollback",
  },
  "mapa.t2.d": {
    cs: "Verzované image. Návrat na předchozí verzi je jedno kliknutí, nestaví se nic.",
    en: "Versioned images. Going back to the previous version is one click — nothing is rebuilt.",
    sk: "Verzované image. Návrat na predchádzajúcu verziu je jedno kliknutie, nestavia sa nič.",
  },
  "mapa.t3.n": { cs: "Defender za běhu", en: "Defender at runtime", sk: "Defender za behu" },
  "mapa.t3.d": {
    cs: "Volitelná runtime ochrana appky — jeden řádek v kódu.",
    en: "Optional runtime protection for your app — one line of code.",
    sk: "Voliteľná runtime ochrana aplikácie — jeden riadok v kóde.",
  },

  // ── Zkus si to (TryIt) ───────────────────────────────────────────────────
  //
  // Klíče `zkus.f*` a `zkus.n*` čte prohlížečový skript přes JSON blok, ne
  // Astro. Kdyby se přejmenovaly, sken se nerozbije — jen začne psát anglicky
  // do české stránky. Proto na ně sahá i test parity.
  "zkus.step": { cs: "ZKUS SI TO", en: "TRY IT", sk: "SKÚS SI TO" },
  "zkus.h2": { cs: "Bez účtu, bez karty.", en: "No account, no card.", sk: "Bez účtu, bez karty." },
  "zkus.sub": {
    cs: "Zadej adresu svého webu. Pustíme na něj náš skutečný bezpečnostní sken — ten samý, který u nás běží po každém nasazení. Trvá to do minuty.",
    en: "Enter your website address. We run our real security scan against it — the same one that runs here after every deployment. It takes under a minute.",
    sk: "Zadaj adresu svojho webu. Pustíme naň našu skutočnú bezpečnostnú kontrolu — tú istú, ktorá u nás beží po každom nasadení. Trvá to do minúty.",
  },
  "zkus.label": { cs: "Adresa webu", en: "Website address", sk: "Adresa webu" },
  "zkus.btn": { cs: "Zkontrolovat", en: "Check it", sk: "Skontrolovať" },
  "zkus.fineprint": {
    cs: "Skenujeme jen to, co web sám vydá z veřejné adresy. Výsledek si ukládáme, ať ti ho můžeme ukázat celý —",
    en: "We only scan what the site itself serves from its public address. We store the result so we can show you all of it —",
    sk: "Skenujeme len to, čo web sám vydá z verejnej adresy. Výsledok si ukladáme, aby sme ti ho mohli ukázať celý —",
  },
  "zkus.privacy": { cs: "jak nakládáme s daty", en: "how we handle data", sk: "ako nakladáme s dátami" },
  "zkus.hosting": {
    cs: "Hostovat u nás statický web stojí {cena} měsíčně — sken po každém nasazení je v ceně.",
    en: "Hosting a static site with us costs {cena} a month — the scan after every deployment is included.",
    sk: "Hostovať u nás statický web stojí {cena} mesačne — kontrola po každom nasadení je v cene.",
  },
  "zkus.skore": { cs: "Bezpečnostní skóre", en: "Security score", sk: "Bezpečnostné skóre" },
  // Fáze skenu — čte je tryit.ts.
  "zkus.f.fetch": { cs: "Stažení stránky", en: "Fetching the page", sk: "Stiahnutie stránky" },
  "zkus.f.security": { cs: "Hlavičky a TLS", en: "Headers and TLS", sk: "Hlavičky a TLS" },
  "zkus.f.surface": { cs: "Aktivní sondy", en: "Active probes", sk: "Aktívne sondy" },
  "zkus.f.cve": { cs: "Známé zranitelnosti", en: "Known vulnerabilities", sk: "Známe zraniteľnosti" },
  "zkus.f.scoring": { cs: "Vyhodnocení", en: "Scoring", sk: "Vyhodnotenie" },
  "zkus.z.critical": { cs: "kritické", en: "critical", sk: "kritické" },
  "zkus.z.high": { cs: "vysoké", en: "high", sk: "vysoké" },
  "zkus.z.medium": { cs: "střední", en: "medium", sk: "stredné" },
  "zkus.z.low": { cs: "nízké", en: "low", sk: "nízke" },
  "zkus.v.vazne": { cs: "Vážné nálezy", en: "Serious findings", sk: "Vážne nálezy" },
  "zkus.v.doladit": { cs: "Drobnosti k doladění", en: "Minor things to tidy up", sk: "Drobnosti na doladenie" },
  "zkus.v.ok": { cs: "V pořádku", en: "All good", sk: "V poriadku" },
  "zkus.s.skenuji": { cs: "Skenuji…", en: "Scanning…", sk: "Skenujem…" },
  "zkus.s.spojeni": { cs: "navazuji spojení", en: "connecting", sk: "nadväzujem spojenie" },
  "zkus.s.nalezy": { cs: "Bezpečnostní nálezy: {popis}", en: "Security findings: {popis}", sk: "Bezpečnostné nálezy: {popis}" },
  "zkus.s.zadne": { cs: "Žádné bezpečnostní nálezy.", en: "No security findings.", sk: "Žiadne bezpečnostné nálezy." },
  "zkus.s.report": { cs: "Otevřít celý report ↗", en: "Open the full report ↗", sk: "Otvoriť celý report ↗" },
  "zkus.s.reportKratky": { cs: "Otevřít report ↗", en: "Open the report ↗", sk: "Otvoriť report ↗" },
  "zkus.s.napisAdresu": {
    cs: "Napiš adresu webu, třeba mujweb.cz.",
    en: "Enter a website address, for example mysite.com.",
    sk: "Napíš adresu webu, napríklad mojweb.sk.",
  },
  "zkus.s.hotovo": { cs: "hotovo za {s} s", en: "done in {s}s", sk: "hotovo za {s} s" },
  "zkus.f.malware": { cs: "Malware a phishing", en: "Malware and phishing", sk: "Malware a phishing" },
  "zkus.f.nis2": { cs: "DNS a NIS2", en: "DNS and NIS2", sk: "DNS a NIS2" },
  "zkus.z.info": { cs: "info", en: "info", sk: "info" },
  "zkus.z.ok": { cs: "ok", en: "ok", sk: "ok" },
  "zkus.v.opravit": { cs: "Je co opravit", en: "There's work to do", sk: "Je čo opraviť" },
  "zkus.s.skenujiUrl": { cs: "Skenuji {url}", en: "Scanning {url}", sk: "Skenujem {url}" },
  "zkus.s.prubeh": { cs: "{hotovo} / {celkem} fází · {s} s", en: "{hotovo} / {celkem} phases · {s}s", sk: "{hotovo} / {celkem} fáz · {s} s" },
  "zkus.s.titulek": { cs: "Bezpečnost webu", en: "Security of", sk: "Bezpečnosť webu" },
  // Chybové hlášky. Text musí říct, CO se stalo a co s tím — ne „došlo k chybě".
  "zkus.e.odkaz": {
    cs: "Otevřít scanner na grovetechai.com",
    en: "Open the scanner on grovetechai.com",
    sk: "Otvoriť skener na grovetechai.com",
  },
  "zkus.e.anonLimit": {
    cs: "Denní limit skenu bez účtu je vyčerpaný. S účtem zdarma máš dva denně.",
    en: "The daily scan limit without an account is used up. A free account gives you two per day.",
    sk: "Denný limit kontroly bez účtu je vyčerpaný. S účtom zadarmo máš dve denne.",
  },
  "zkus.e.freeLimit": {
    cs: "Vyčerpaný denní limit tvého účtu.",
    en: "Your account's daily limit is used up.",
    sk: "Vyčerpaný denný limit tvojho účtu.",
  },
  "zkus.e.rateLimit": {
    cs: "Moc pokusů z jedné adresy. Zkus to za chvíli znovu.",
    en: "Too many attempts from one address. Try again in a moment.",
    sk: "Priveľa pokusov z jednej adresy. Skús to o chvíľu znova.",
  },
  "zkus.e.probiha": {
    cs: "Tenhle web se právě skenuje. Chvíli počkej a zkus to znovu.",
    en: "This site is being scanned right now. Wait a moment and try again.",
    sk: "Tento web sa práve kontroluje. Chvíľu počkaj a skús to znova.",
  },
  "zkus.e.vpn": {
    cs: "Skenuješ přes VPN nebo firemní síť, tam potřebujeme ověření.",
    en: "You're scanning through a VPN or a corporate network — we need verification for those.",
    sk: "Skenuješ cez VPN alebo firemnú sieť, tam potrebujeme overenie.",
  },
  "zkus.e.blocked": {
    cs: "Tuhle adresu skenovat nejde — musí být veřejně dostupná.",
    en: "This address can't be scanned — it has to be publicly reachable.",
    sk: "Túto adresu skenovať nejde — musí byť verejne dostupná.",
  },
  "zkus.e.invalid": {
    cs: "Tohle nevypadá jako adresa webu. Zkus třeba <b>mujweb.cz</b>.",
    en: "That doesn't look like a website address. Try <b>mysite.com</b>.",
    sk: "Toto nevyzerá ako adresa webu. Skús napríklad <b>mojweb.sk</b>.",
  },
  "zkus.e.selhal": {
    cs: "Sken se nepodařilo dokončit. Je web dostupný z internetu?",
    en: "The scan couldn't be completed. Is the site reachable from the internet?",
    sk: "Kontrolu sa nepodarilo dokončiť. Je web dostupný z internetu?",
  },
  "zkus.e.spojeni": {
    cs: "Nepodařilo se spojit se skenerem. Zkus to prosím znovu.",
    en: "We couldn't reach the scanner. Please try again.",
    sk: "Nepodarilo sa spojiť so skenerom. Skús to prosím znova.",
  },
  "zkus.e.obecna": {
    cs: "Sken se nepodařilo dokončit ({stav}). Zkus to prosím znovu.",
    en: "The scan couldn't be completed ({stav}). Please try again.",
    sk: "Kontrolu sa nepodarilo dokončiť ({stav}). Skús to prosím znova.",
  },

  // ── Ceník (Pricing) ──────────────────────────────────────────────────────
  "cenik.step": { cs: "CENA", en: "PRICING", sk: "CENA" },
  "cenik.h2": {
    cs: "Stejná čísla jako v aplikaci.",
    en: "The same numbers as in the app.",
    sk: "Rovnaké čísla ako v aplikácii.",
  },
  "cenik.sub": {
    cs: "Ceník se počítá z jednoho enginu podle toho, co appka skutečně potřebuje. Vyber typ appky:",
    en: "Pricing is computed by a single engine from what the app actually needs. Pick your app type:",
    sk: "Cenník sa počíta z jedného enginu podľa toho, čo aplikácia skutočne potrebuje. Vyber typ aplikácie:",
  },
  "cenik.typ": { cs: "Typ aplikace", en: "Application type", sk: "Typ aplikácie" },
  "cenik.od": { cs: "od ", en: "from ", sk: "od " },
  "cenik.mesic": { cs: "/ měsíc", en: "/ month", sk: "/ mesiac" },
  "cenik.jenStatika": { cs: "jen pro statiku", en: "static sites only", sk: "len pre statiku" },
  "cenik.pripravujeme": { cs: "PŘIPRAVUJEME", en: "COMING SOON", sk: "PRIPRAVUJEME" },
  "cenik.domluvit": { cs: "Domluvit", en: "Talk to us", sk: "Dohodnúť" },
  "cenik.zajem": { cs: "Předběžný zájem", en: "Register interest", sk: "Predbežný záujem" },
  "cenik.nasadit": { cs: "Nasadit", en: "Deploy", sk: "Nasadiť" },
  "cenik.pozn": {
    cs: "Ceny bez DPH, kurz {kurz} Kč/€. Tarify označené „připravujeme\" zatím sjednáváme ručně — napiš nám a domluvíme start. Ceník generován z aplikace {datum}.",
    en: "Prices exclude VAT; conversion rate {kurz} CZK/€. We bill in CZK — amounts in € and $ are a guide. Plans marked \"coming soon\" are still arranged manually — write to us and we'll set it up. Pricing generated from the app on {datum}.",
    sk: "Ceny bez DPH, kurz {kurz} Kč/€. Fakturujeme v Kč — sumy v € a $ sú orientačné. Tarify označené „pripravujeme\" zatiaľ dojednávame ručne — napíš nám a dohodneme štart. Cenník generovaný z aplikácie {datum}.",
  },
  // Typy aplikací — klíč = `key` ze stacks v pricing.json.
  "stack.static": { cs: "Statický web / SPA", en: "Static site / SPA", sk: "Statický web / SPA" },
  "stack.ssr": { cs: "SSR appka (Next.js / Nuxt)", en: "SSR app (Next.js / Nuxt)", sk: "SSR aplikácia (Next.js / Nuxt)" },
  "stack.api": { cs: "API / backend (Express, FastAPI)", en: "API / backend (Express, FastAPI)", sk: "API / backend (Express, FastAPI)" },
  "stack.fullstack": { cs: "Fullstack (frontend + API)", en: "Fullstack (frontend + API)", sk: "Fullstack (frontend + API)" },
  "stack.heavy": { cs: "Náročná appka / worker", en: "Heavy app / worker", sk: "Náročná aplikácia / worker" },
  // Tarify. Názvy (Starter, Secure Host…) se nepřekládají — jsou to značky.
  "tarif.starter.sla": { cs: "bez garance dostupnosti", en: "no uptime guarantee", sk: "bez garancie dostupnosti" },
  "tarif.starter.resp": { cs: "odpovídáme v pracovní dny", en: "we reply on business days", sk: "odpovedáme v pracovné dni" },
  "tarif.starter.1": { cs: "Hosting statického webu nebo SPA", en: "Hosting for a static site or SPA", sk: "Hosting statického webu alebo SPA" },
  "tarif.starter.2": { cs: "Adresa a certifikát v ceně", en: "Address and certificate included", sk: "Adresa a certifikát v cene" },
  "tarif.starter.3": { cs: "Automatický bezpečnostní sken po každém nasazení", en: "Automatic security scan after every deployment", sk: "Automatická bezpečnostná kontrola po každom nasadení" },
  "tarif.starter.4": { cs: "Návrat na předchozí verzi jedním kliknutím", en: "One-click rollback to the previous version", sk: "Návrat na predchádzajúcu verziu jedným kliknutím" },
  "tarif.host.sla": { cs: "kontrola dostupnosti každých 10 minut", en: "availability checked every 10 minutes", sk: "kontrola dostupnosti každých 10 minút" },
  "tarif.host.resp": { cs: "odpovídáme v pracovní dny", en: "we reply on business days", sk: "odpovedáme v pracovné dni" },
  "tarif.host.1": { cs: "Hosting a provoz aplikace ve vlastním kontejneru", en: "Hosting and operation in a dedicated container", sk: "Hosting a prevádzka aplikácie vo vlastnom kontajneri" },
  "tarif.host.2": { cs: "Sken po každém nasazení + verzované image a rollback", en: "Scan after every deployment, versioned images and rollback", sk: "Kontrola po každom nasadení + verzované image a rollback" },
  "tarif.host.3": { cs: "Hlídání běhu a odezvy, e-mail při výpadku (nejvýš jednou za 6 hodin)", en: "Uptime and response monitoring, email on an outage (at most once per 6 hours)", sk: "Sledovanie behu a odozvy, e-mail pri výpadku (najviac raz za 6 hodín)" },
  "tarif.host.4": { cs: "Bezpečnostní hlavičky a TLS v ceně", en: "Security headers and TLS included", sk: "Bezpečnostné hlavičky a TLS v cene" },
  "tarif.pro.sla": { cs: "kontrola každých 10 minut + automatický restart", en: "checked every 10 minutes + automatic restart", sk: "kontrola každých 10 minút + automatický reštart" },
  "tarif.pro.resp": { cs: "odpovídáme v pracovní dny, přednostně", en: "we reply on business days, with priority", sk: "odpovedáme v pracovné dni, prednostne" },
  "tarif.pro.1": { cs: "Vše ze Secure Host", en: "Everything in Secure Host", sk: "Všetko zo Secure Host" },
  "tarif.pro.2": { cs: "Automatický restart spadlé appky bez čekání na člověka", en: "A crashed app restarts automatically, without waiting for a human", sk: "Automatický reštart spadnutej aplikácie bez čakania na človeka" },
  "tarif.pro.3": { cs: "Detekce smyčky pádů — místo dalšího restartu voláme člověka", en: "Crash-loop detection — instead of another restart we call a human", sk: "Detekcia slučky pádov — namiesto ďalšieho reštartu voláme človeka" },
  "tarif.pro.4": { cs: "Přerůstání tarifu je vidět v přehledu, než přijde na fakturu", en: "Outgrowing your plan shows up in the dashboard before it shows up on the invoice", sk: "Prerastanie tarifu je vidieť v prehľade skôr, než príde na faktúru" },
  "tarif.business.sla": { cs: "dostupnost a reakce podle smlouvy", en: "availability and response per contract", sk: "dostupnosť a reakcia podľa zmluvy" },
  "tarif.business.resp": { cs: "dohodnutá reakční doba, prioritně", en: "agreed response time, prioritised", sk: "dohodnutá reakčná doba, prioritne" },
  "tarif.business.1": { cs: "Vše ze Secure Plus", en: "Everything in Secure Plus", sk: "Všetko zo Secure Plus" },
  "tarif.business.2": { cs: "Prioritní eskalace na člověka", en: "Priority escalation to a human", sk: "Prioritná eskalácia na človeka" },
  "tarif.business.3": { cs: "Pravidelný report o provozu a bezpečnosti", en: "Regular operations and security report", sk: "Pravidelný report o prevádzke a bezpečnosti" },
  "tarif.business.4": { cs: "Smlouva na míru (SLA, limit odpovědnosti, zpracování dat)", en: "Tailored contract (SLA, liability cap, data processing)", sk: "Zmluva na mieru (SLA, limit zodpovednosti, spracovanie dát)" },

  // ── Stránka /cena ────────────────────────────────────────────────────────
  "meta.cena.d": {
    cs: "Ceník Grove Cloud: Starter {cena} pro statický web, Secure Host, Secure Plus a Business podle toho, co appka potřebuje. Stejná čísla jako v aplikaci.",
    en: "Grove Cloud pricing: Starter from {cena} for a static site, plus Secure Host, Secure Plus and Business depending on what the app needs. The same numbers as in the app.",
    sk: "Cenník Grove Cloud: Starter {cena} pre statický web, Secure Host, Secure Plus a Business podľa toho, čo aplikácia potrebuje. Rovnaké čísla ako v aplikácii.",
  },
  "cena.h2": { cs: "Jak se cena počítá", en: "How the price is calculated", sk: "Ako sa cena počíta" },
  "cena.sub": {
    cs: "Cena tarifu je pevná a zahrnuje paměť podle typu appky. Když appka potřebuje víc, připočte se příplatek za každých započatých 512 MB — bez překvapení na faktuře, částku vidíš předem v onboardingu. Statický web nebo SPA běží bez vlastního kontejneru na sdíleném serveru, proto je za {cena}. Dynamická appka (Next.js, Express, FastAPI…) dostane vlastní kontejner a Defender.",
    en: "The plan price is fixed and covers memory according to the app type. If the app needs more, a surcharge is added for each started 512 MB — no surprises on the invoice, you see the amount up front during onboarding. A static site or SPA runs on a shared server without its own container, which is why it costs {cena}. A dynamic app (Next.js, Express, FastAPI…) gets its own container and Defender.",
    sk: "Cena tarifu je pevná a zahŕňa pamäť podľa typu aplikácie. Keď aplikácia potrebuje viac, pripočíta sa príplatok za každých začatých 512 MB — bez prekvapení na faktúre, sumu vidíš vopred v onboardingu. Statický web alebo SPA beží bez vlastného kontajnera na zdieľanom serveri, preto je za {cena}. Dynamická aplikácia (Next.js, Express, FastAPI…) dostane vlastný kontajner a Defender.",
  },
  "cena.l1": {
    cs: "Žádný poplatek za člena týmu — platíš za appku, ne za lidi.",
    en: "No per-seat fee — you pay for the app, not for people.",
    sk: "Žiadny poplatok za člena tímu — platíš za aplikáciu, nie za ľudí.",
  },
  "cena.l2a": { cs: "Adresa", en: "The address", sk: "Adresa" },
  "cena.l2b": {
    cs: "a certifikát jsou v ceně; vlastní doména taky.",
    en: "and the certificate are included; so is your own domain.",
    sk: "a certifikát sú v cene; vlastná doména tiež.",
  },
  "cena.l3": {
    cs: "Sken po každém nasazení a denní zálohy jsou ve všech tarifech.",
    en: "The post-deployment scan and daily backups are in every plan.",
    sk: "Kontrola po každom nasadení a denné zálohy sú vo všetkých tarifoch.",
  },
  "cena.l4": {
    cs: "Zrušit můžeš kdykoli, s účinností ke konci měsíce.",
    en: "You can cancel at any time, effective at the end of the month.",
    sk: "Zrušiť môžeš kedykoľvek, s účinnosťou ku koncu mesiaca.",
  },

  // ── Stránka /bezpecnost ──────────────────────────────────────────────────
  "meta.bezp.d": {
    cs: "Po každém nasazení {n} bezpečnostních kontrol, Defender za běhu, denní zálohy, data v EU. Hosting od bezpečnostní firmy, ne bezpečnost jako doplněk hostingu.",
    en: "{n} security checks after every deployment, Defender at runtime, daily backups, data in the EU. Hosting from a security company — not security bolted onto hosting.",
    sk: "Po každom nasadení {n} bezpečnostných kontrol, Defender za behu, denné zálohy, dáta v EU. Hosting od bezpečnostnej firmy, nie bezpečnosť ako doplnok hostingu.",
  },
  "bs.eyebrow": { cs: "Bezpečnost", en: "Security", sk: "Bezpečnosť" },
  "bs.h1": {
    cs: "Appku ti AI napíše za hodinu. Kdo ji bude hlídat další rok?",
    en: "AI will write your app in an hour. Who watches it for the next year?",
    sk: "Aplikáciu ti AI napíše za hodinu. Kto ju bude strážiť ďalší rok?",
  },
  "bs.lead": {
    cs: "V roce 2026 unikla data z tisíců appek postavených v Lovable, Bolt, v0 nebo Cursoru — ne kvůli hostingu, ale kvůli tomu, co v kódu zůstalo: otevřená API, uniklé klíče, chybějící hlavičky. Grove Cloud je hosting od bezpečnostní firmy: každé nasazení projde stejným skenerem, kterým Grove Tech AI kontroluje tisíce českých webů.",
    en: "In 2026 data leaked from thousands of apps built in Lovable, Bolt, v0 or Cursor — not because of the hosting, but because of what stayed in the code: open APIs, leaked keys, missing headers. Grove Cloud is hosting from a security company: every deployment goes through the same scanner Grove Tech AI uses on thousands of Czech websites.",
    sk: "V roku 2026 unikli dáta z tisícov aplikácií postavených v Lovable, Bolt, v0 alebo Cursore — nie pre hosting, ale pre to, čo v kóde zostalo: otvorené API, uniknuté kľúče, chýbajúce hlavičky. Grove Cloud je hosting od bezpečnostnej firmy: každé nasadenie prejde rovnakým skenerom, ktorým Grove Tech AI kontroluje tisíce českých webov.",
  },
  "bs.1.n": { cs: "PO DEPLOYI", en: "AFTER DEPLOY", sk: "PO NASADENÍ" },
  "bs.1.h": { cs: "{n} kontrol", en: "{n} checks", sk: "{n} kontrol" },
  "bs.1.p": {
    cs: "Bezpečnostní hlavičky, TLS, uniklé klíče v buildu, malware a phishing, expozice adminů a API, závislosti s CVE. Výsledek u appky během minut.",
    en: "Security headers, TLS, keys leaked into the build, malware and phishing, exposed admin panels and APIs, dependencies with known CVEs. The result appears next to your app within minutes.",
    sk: "Bezpečnostné hlavičky, TLS, uniknuté kľúče v builde, malware a phishing, expozícia adminov a API, závislosti s CVE. Výsledok pri aplikácii do niekoľkých minút.",
  },
  "bs.2.n": { cs: "ZA BĚHU", en: "AT RUNTIME", sk: "ZA BEHU" },
  "bs.2.p1": {
    cs: "Runtime ochrana AI vrstvy: prompt injection, únik dat přes odpovědi modelu, podezřelé requesty. Stejné SDK jako",
    en: "Runtime protection for the AI layer: prompt injection, data leaking through model responses, suspicious requests. The same SDK as",
    sk: "Runtime ochrana AI vrstvy: prompt injection, únik dát cez odpovede modelu, podozrivé požiadavky. Rovnaké SDK ako",
  },
  "bs.3.n": { cs: "IZOLACE", en: "ISOLATION", sk: "IZOLÁCIA" },
  "bs.3.h": { cs: "Vlastní kontejner", en: "A dedicated container", sk: "Vlastný kontajner" },
  "bs.3.p": {
    cs: "Dynamické appky běží každá ve svém kontejneru s limitem paměti. Statika se servíruje ze sdíleného serveru bez spouštění kódu.",
    en: "Each dynamic app runs in its own container with a memory limit. Static sites are served from a shared server with no code execution at all.",
    sk: "Dynamické aplikácie bežia každá vo svojom kontajneri s limitom pamäte. Statika sa servíruje zo zdieľaného servera bez spúšťania kódu.",
  },
  "bs.4.n": { cs: "ZÁLOHY", en: "BACKUPS", sk: "ZÁLOHY" },
  "bs.4.h": { cs: "Denně, mimo node", en: "Daily, off the node", sk: "Denne, mimo node" },
  "bs.4.p": {
    cs: "Denní zálohy dat i konfigurace, verzované image pro rollback.",
    en: "Daily backups of data and configuration, versioned images for rollback.",
    sk: "Denné zálohy dát aj konfigurácie, verzované image pre rollback.",
  },
  "bs.5.h": { cs: "Německo, česky", en: "Germany, EU law", sk: "Nemecko, po slovensky" },
  "bs.5.p": {
    cs: "Hetzner Norimberk. Podpora česky, faktura v Kč, smlouva podle českého práva.",
    en: "Hetzner Nuremberg. Support in Czech and English, invoicing in CZK, contract under Czech law.",
    sk: "Hetzner Norimberg. Podpora po slovensky a česky, faktúra v Kč, zmluva podľa českého práva.",
  },
  "bs.6.n": { cs: "PENTEST", en: "PENTEST", sk: "PENTEST" },
  "bs.6.h": { cs: "Hloubkový test na přání", en: "Deep test on request", sk: "Hĺbkový test na želanie" },
  "bs.6.p1": { cs: "Když chceš víc než sken:", en: "When you want more than a scan:", sk: "Keď chceš viac než kontrolu:" },
  "bs.6.p2": {
    cs: "se 33 aktivními sondami a reportem pro zákazníky nebo audit.",
    en: "with 33 active probes and a report for your customers or an audit.",
    sk: "s 33 aktívnymi sondami a reportom pre zákazníkov alebo audit.",
  },
  "bs.pozn": {
    cs: "Poctivě: sken najde to, co jde zjistit zvenku a z buildu. Chyby v obchodní logice nebo v datech, která appka sama ukládá, odhalí až pentest nebo review kódu. Nikdy neslibujeme „100% bezpečno\".",
    en: "Honestly: a scan finds what can be observed from the outside and from the build. Flaws in business logic, or in the data the app stores itself, only surface in a pentest or a code review. We never promise \"100% secure\".",
    sk: "Poctivo: kontrola nájde to, čo sa dá zistiť zvonku a z buildu. Chyby v obchodnej logike alebo v dátach, ktoré aplikácia sama ukladá, odhalí až pentest alebo review kódu. Nikdy nesľubujeme „100% bezpečno\".",
  },

  // ── Stránka /jak-to-funguje ──────────────────────────────────────────────
  "meta.jak.d": {
    cs: "Připoj GitHub, klikni Nasadit. Grove Cloud pozná stack, postaví appku, dá jí adresu a certifikát, po každém pushi nasadí novou verzi a proskenuje ji.",
    en: "Connect GitHub, click Deploy. Grove Cloud detects the stack, builds the app, gives it an address and a certificate, then deploys and scans a new version after every push.",
    sk: "Pripoj GitHub, klikni Nasadiť. Grove Cloud pozná stack, postaví aplikáciu, dá jej adresu a certifikát, po každom pushi nasadí novú verziu a preverí ju.",
  },
  "jak.eyebrow": { cs: "Jak to funguje", en: "How it works", sk: "Ako to funguje" },
  "jak.h1": {
    cs: "Od repa k běžící, hlídané appce.",
    en: "From a repository to a running, watched app.",
    sk: "Od repozitára k bežiacej, stráženej aplikácii.",
  },
  "jak.lead": {
    cs: "Žádný Dockerfile psát nemusíš (ale když ho máš, použijeme ho). Detekce přečte package.json v kořeni i podsložkách, requirements.txt, go.mod nebo composer.json a rozhodne, jestli jde o statiku, SSR, API nebo fullstack — a ukáže ti proč.",
    en: "You don't have to write a Dockerfile (but if you have one, we use it). Detection reads package.json in the root and subfolders, requirements.txt, go.mod or composer.json, decides whether it is a static site, SSR, an API or fullstack — and shows you why.",
    sk: "Žiadny Dockerfile písať nemusíš (ale keď ho máš, použijeme ho). Detekcia prečíta package.json v koreni aj podpriečinkoch, requirements.txt, go.mod alebo composer.json a rozhodne, či ide o statiku, SSR, API alebo fullstack — a ukáže ti prečo.",
  },
  "jak.cta": { cs: "Nasadit z GitHubu →", en: "Deploy from GitHub →", sk: "Nasadiť z GitHubu →" },
  "jak.h2": {
    cs: "Co dostaneš u každé appky",
    en: "What every app comes with",
    sk: "Čo dostaneš pri každej aplikácii",
  },
  "jak.1.n": { cs: "DEPLOY", en: "DEPLOY", sk: "DEPLOY" },
  "jak.1.h": { cs: "Historie a rollback", en: "History and rollback", sk: "História a rollback" },
  "jak.1.p": {
    cs: "Každé nasazení má verzi. Vrátit se na předchozí je jedno kliknutí, ne noční směna.",
    en: "Every deployment has a version. Going back to the previous one is a click, not a night shift.",
    sk: "Každé nasadenie má verziu. Vrátiť sa na predchádzajúce je jedno kliknutie, nie nočná zmena.",
  },
  "jak.2.n": { cs: "AUTO", en: "AUTO", sk: "AUTO" },
  "jak.2.h": { cs: "Nasazení po pushi", en: "Deploy on push", sk: "Nasadenie po pushi" },
  "jak.2.p": {
    cs: "Webhook z GitHubu s ověřeným podpisem. Vybereš větev, zbytek běží sám.",
    en: "A GitHub webhook with a verified signature. You pick the branch, the rest runs itself.",
    sk: "Webhook z GitHubu s overeným podpisom. Vyberieš vetvu, zvyšok beží sám.",
  },
  "jak.3.n": { cs: "ENV", en: "ENV", sk: "ENV" },
  "jak.3.h": { cs: "Trezor na tajemství", en: "A vault for secrets", sk: "Trezor na tajomstvá" },
  "jak.3.p": {
    cs: "Klíče a proměnné prostředí mimo repo, šifrované, viditelné jen tobě.",
    en: "Keys and environment variables outside the repository, encrypted, visible only to you.",
    sk: "Kľúče a premenné prostredia mimo repozitára, šifrované, viditeľné len tebe.",
  },
  "jak.4.n": { cs: "LOGY", en: "LOGS", sk: "LOGY" },
  "jak.4.h": { cs: "Logy bez SSH", en: "Logs without SSH", sk: "Logy bez SSH" },
  "jak.4.p": {
    cs: "Výstup appky přímo v prohlížeči, filtr podle času a úrovně.",
    en: "Your app's output right in the browser, filtered by time and level.",
    sk: "Výstup aplikácie priamo v prehliadači, filter podľa času a úrovne.",
  },
  "jak.5.n": { cs: "DOMÉNA", en: "DOMAIN", sk: "DOMÉNA" },
  "jak.5.h": { cs: "Vlastní doména", en: "Your own domain", sk: "Vlastná doména" },
  "jak.5.p": {
    cs: "Ukážeme přesný DNS záznam, ověříme ho a teprve pak vystavíme certifikát. Bez tápání.",
    en: "We show the exact DNS record, verify it, and only then issue the certificate. No guesswork.",
    sk: "Ukážeme presný DNS záznam, overíme ho a až potom vystavíme certifikát. Bez tápania.",
  },
  "jak.6.n": { cs: "SKEN", en: "SCAN", sk: "SKEN" },
  "jak.6.h": { cs: "Report u appky", en: "A report next to the app", sk: "Report pri aplikácii" },
  "jak.6.p": {
    cs: "Výsledek bezpečnostního skenu po každém nasazení — stejný report jako na grovetechai.com.",
    en: "The security scan result after every deployment — the same report as on grovetechai.com.",
    sk: "Výsledok bezpečnostnej kontroly po každom nasadení — rovnaký report ako na grovetechai.com.",
  },

  // ── Stránka /stav ────────────────────────────────────────────────────────
  "stav.eyebrow": { cs: "STAV SLUŽBY", en: "SERVICE STATUS", sk: "STAV SLUŽBY" },
  "stav.zjistuji": { cs: "Zjišťuji stav…", en: "Checking status…", sk: "Zisťujem stav…" },
  "stav.nacitam": { cs: "Načítám poslední měření.", en: "Loading the latest measurement.", sk: "Načítavam posledné meranie." },
  "stav.ridici": { cs: "Řídicí aplikace", en: "Control application", sk: "Riadiaca aplikácia" },
  "stav.ridiciPod": { cs: "nasazení, přehledy, přihlášení", en: "deployments, dashboards, sign-in", sk: "nasadenia, prehľady, prihlásenie" },
  "stav.flotila": { cs: "Hostované aplikace", en: "Hosted applications", sk: "Hostované aplikácie" },
  "stav.flotilaPod": { cs: "souhrn za poslední kontrolu", en: "summary from the last check", sk: "súhrn za poslednú kontrolu" },
  "stav.kontrola": { cs: "Poslední kontrola", en: "Last check", sk: "Posledná kontrola" },
  "stav.interval": { cs: "měříme pravidelně", en: "we measure regularly", sk: "meriame pravidelne" },
  "stav.intervalMin": { cs: "měříme každých {n} min", en: "measured every {n} min", sk: "meriame každých {n} min" },
  "stav.bezi": { cs: "Služba běží", en: "Service is up", sk: "Služba beží" },
  "stav.problem": { cs: "Máme problém", en: "We have a problem", sk: "Máme problém" },
  "stav.nevime": { cs: "Nevíme, jak na tom jsme", en: "We don't know where we stand", sk: "Nevieme, ako na tom sme" },
  "stav.odpovida": { cs: "odpovídá", en: "responding", sk: "odpovedá" },
  "stav.neodpovida": { cs: "neodpovídá", en: "not responding", sk: "neodpovedá" },
  "stav.nezverejnujeme": { cs: "nezveřejňujeme", en: "not published", sk: "nezverejňujeme" },
  "stav.staraData": { cs: "poslední měření je příliš staré", en: "the last measurement is too old", sk: "posledné meranie je príliš staré" },
  "stav.maloAppek": {
    cs: "málo aplikací — šlo by odvodit konkrétního zákazníka",
    en: "too few applications — an individual customer could be identified",
    sk: "málo aplikácií — dal by sa odvodiť konkrétny zákazník",
  },
  "stav.selhalo": { cs: "Nedaří se nám zjistit stav", en: "We can't determine the status", sk: "Nedarí sa nám zistiť stav" },
  "stav.selhaloText": {
    cs: "Nepodařilo se spojit s naším rozhraním. Je možné, že máme výpadek. Zkuste stránku obnovit za chvíli.",
    en: "We couldn't reach our API. It is possible we are having an outage. Try reloading the page in a moment.",
    sk: "Nepodarilo sa spojiť s naším rozhraním. Je možné, že máme výpadok. Skúste stránku obnoviť o chvíľu.",
  },
  "stav.cas.ted": { cs: "právě teď", en: "just now", sk: "práve teraz" },
  "stav.cas.min": { cs: "před {n} min", en: "{n} min ago", sk: "pred {n} min" },
  "stav.cas.hod": { cs: "před {n} h", en: "{n} h ago", sk: "pred {n} h" },
  "stav.cas.nevime": { cs: "nevíme", en: "unknown", sk: "nevieme" },
  "stav.pozn1": {
    cs: "Zveřejňujeme jen souhrn. Stav jednotlivých aplikací tady nenajdete záměrně — z čísla, které by šlo přiřadit ke konkrétnímu zákazníkovi, by se dal odvodit jeho výpadek. Dotčené zákazníky informujeme přímo e-mailem.",
    en: "We publish only an aggregate. The status of individual applications is deliberately absent — a number traceable to one customer would reveal that customer's outage. We inform affected customers by email directly.",
    sk: "Zverejňujeme len súhrn. Stav jednotlivých aplikácií tu zámerne nenájdete — z čísla, ktoré by sa dalo priradiť ku konkrétnemu zákazníkovi, by sa dal odvodiť jeho výpadok. Dotknutých zákazníkov informujeme priamo e-mailom.",
  },
  "stav.pozn2": {
    cs: "Máte u nás aplikaci a něco nesedí? Napište na",
    en: "You have an app with us and something looks wrong? Write to",
    sk: "Máte u nás aplikáciu a niečo nesedí? Napíšte na",
  },
  // ── Nadpisy stránek ──────────────────────────────────────────────────────
  //
  // ══ PROČ TYHLE KLÍČE VZNIKLY ═══════════════════════════════════════════════
  // Stránka /cena neměla 5. 9. 2026 vůbec žádný <h1> a /bezpecnost ani /stav
  // neměly <h2>. Vypadalo to dobře, protože ceník začíná velkým nadpisem —
  // jenže ten je <h2> uvnitř komponenty. Pro čtečku, vyhledávač i jazykový
  // model to znamená stránku bez hlavního tématu. Náš vlastní sken to hlásí
  // jako nález (ai-semantic-html) a strhává za to body.
  "cena.h1": { cs: "Ceník Grove Cloudu", en: "Grove Cloud pricing", sk: "Cenník Grove Cloudu" },
  "cena.lead": {
    cs: "Platíte za aplikaci, ne za lidi ve firmě. Ceny se počítají ze stejného enginu, jaký běží v aplikaci — co vidíte tady, uvidíte i na faktuře.",
    en: "You pay per application, not per person in your company. Prices are computed by the same engine that runs inside the app — what you see here is what shows up on the invoice.",
    sk: "Platíte za aplikáciu, nie za ľudí vo firme. Ceny sa počítajú z rovnakého enginu, aký beží v aplikácii — čo vidíte tu, uvidíte aj na faktúre.",
  },
  "bs.h2": {
    cs: "Šest vrstev, které dostanete v ceně",
    en: "Six layers included in the price",
    sk: "Šesť vrstiev, ktoré dostanete v cene",
  },
  "stav.h2": { cs: "Aktuální stav", en: "Current status", sk: "Aktuálny stav" },
  "stav.h3": { cs: "Co tady nezveřejňujeme", en: "What we don't publish here", sk: "Čo tu nezverejňujeme" },
  "e404.kamdal": { cs: "Kam dál", en: "Where to next", sk: "Kam ďalej" },
} as const;

export type Klic = keyof typeof ui;

/** Vrátí překladač pro daný jazyk. `{x}` v textu nahradí hodnotou z `vars`. */
export function prekladac(jazyk: Jazyk) {
  return (klic: Klic, vars?: Record<string, string | number>): string => {
    const zaznam = ui[klic] as Record<Jazyk, string>;
    // Fallback na češtinu je tu jen jako pojistka proti pádu stránky. Test
    // i18n-parita.test.ts hlídá, aby k němu nikdy nedošlo — chybějící překlad
    // se má projevit jako spadlý test, ne jako česká věta v anglickém textu.
    let text: string = zaznam?.[jazyk] ?? zaznam?.cs ?? String(klic);
    if (vars) for (const [k, v] of Object.entries(vars)) text = text.replaceAll(`{${k}}`, String(v));
    return text;
  };
}
