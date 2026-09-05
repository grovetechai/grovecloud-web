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
