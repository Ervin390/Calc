# Korak 3 — Funkcionalna specifikacija svih 20 alata (statični GitHub Pages)

**Za svaki alat: točno kako radi (logika/formula), inputi/outputi, UI, biblioteke, rubni slučajevi i SEO sadržajni blokovi.** Sve mora raditi kao **100% client-side** (HTML + CSS + vanilla JS), bez servera, hostano besplatno na GitHub Pages.

---

## 0. Zajednička arhitektura (definirano jednom, vrijedi za svih 20)

### 0.1 Tech stack (bez servera, minimalne ovisnosti)
- **Static site generator:** [Eleventy (11ty)](https://www.11ty.dev/) — čisti Node build → statični HTML. (Alternativa: ručni HTML + partiali. Eleventy preporučen zbog zajedničkog layouta, kolekcija i auto-sitemapa.)
- **Stil:** jedan globalni `style.css` (CSS varijable, bez frameworka). Kritični CSS inline u `<head>`.
- **JS:** po alatu **jedan ES modul** `tool.js`, učitan `defer`. Bez jQuery/React. Vanilla DOM.
- **Vanjske biblioteke:** **nula** za 18/20. Iznimke (sve sitne, self-hostane, lazy): nijedan odabrani alat ne treba tešku biblioteku — wheel/dice koriste native Canvas, JSON highlight je vlastiti regex, chart je vlastiti canvas. (QR/OCR/PDF nisu u setu upravo zato.)
- **Hosting:** GitHub Pages + **custom domena** (CNAME). HTTPS automatski.

### 0.2 Zajednički layout svake tool-stranice (shared template)
```
<header>  logo + nav (klasteri) + search
<main>
  <h1>{{ exact-match keyword }}</h1>          ← vidljiv, sadrži frazu
  <section class="tool">  ← ALAT, ABOVE THE FOLD, radi instant, bez scrolla
     [inputi]  →  [rezultat + copy/share gumbi]
  </section>
  <aside class="ad ad-inline">                ← AdSense slot #1 (lazy)
  <section class="how">   Kako koristiti (koraci)
  <section class="formula"> Formula / metodologija  ← E-E-A-T signal
  <section class="examples"> 2-3 primjera s brojkama
  <section class="faq">   FAQ (iz People Also Ask) + FAQPage schema
  <section class="related"> Related tools (2-3 iz klastera)  ← internal links
  <div class="author">  byline + bio + Published/Updated datum  ← E-E-A-T
<footer>  about, privacy, contact, sve alate
```
Ad slotovi: 1 inline (ispod alata), 1 in-content (između sekcija), opcionalno 1 sidebar (desktop). **Nikad iznad H1/alata.** Lazy-load (IntersectionObserver) da CWV ostane zelen.

### 0.3 Zajednički UX ugovor (vrijedi svugdje)
- Rezultat se računa **uživo** (`input` event), bez "Calculate" gumba gdje god je moguće.
- **Copy result** gumb (clipboard API) + **Share** (URL sa state-om u query paramima → deep-link/embed).
- **localStorage** za zadnji unos (vraćanje stanja).
- Mobilno prvo: veliki inputi, `inputmode="decimal/numeric"`, tipkovnica-friendly.
- **A11y:** label na svaki input, `aria-live="polite"` na rezultat, kontrast ≥4.5:1.
- **Zero-CLS:** rezerviran prostor za rezultat i oglase (fiksne visine) → nema skoka.

### 0.4 Zajednička schema (JSON-LD, statički po stranici)
`WebApplication` (name, applicationCategory, offers price 0), `FAQPage` (za FAQ), `BreadcrumbList`. Za how-to sekciju opcionalno `HowTo`.

---

## KLASTER 1 — Fun & Random

### 1. Spinner / Wheel of Names  `/spinner-wheel/`
- **Što radi:** korisnik unese stavke (imena), zavrti kotač, dobije nasumičnog pobjednika.
- **Logika:** stavke → jednaki lukovi na Canvasu (`arc`, kut = 2π/n). Spin = `requestAnimationFrame` rotacija s ease-out (kubična) do nasumičnog završnog kuta `θ = spins*2π + random`. Pobjednik = stavka pod fiksnim pokazivačem: `index = floor(((2π − (θ mod 2π)) / (2π)) * n)`.
- **Input:** textarea (jedna stavka po retku) · opcije: ukloni pobjednika nakon spina, trajanje, boje, zvuk.
- **Output:** vizualni spin + modal s pobjednikom + povijest.
- **Libs:** Canvas 2D (native). Zvuk: Web Audio tick.
- **Edge:** 1 stavka (blokiraj/animiraj), 500+ stavki (grupiraj labele), prazni retci (trim).
- **State/share:** stavke u URL param (`?items=a,b,c`) → dijeljenje + embed.
- **SEO sadržaj:** "how to use", use-caseovi (učionica, giveaway, tko pere suđe), FAQ ("is it truly random?", "can I save my wheel?"), related: Dice, Random Name, Coin Flip.

### 2. Dice Roller  `/dice-roller/`
- **Što radi:** baca 1+ kockica (D4–D20), zbraja.
- **Logika:** `roll = 1 + Math.floor(Math.random()*sides)` po kocki (idealno `crypto.getRandomValues` za fer). Zbroj + modifikator (`+N`). Notacija `3d6+2`.
- **Input:** broj kockica, tip (d4/6/8/10/12/20/100), modifikator; presetovi DnD.
- **Output:** pojedinačni rezultati + zbroj + animacija (CSS/Canvas), povijest bacanja.
- **Libs:** vanilla + CSS 3D transform.
- **Edge:** velik broj kockica (limit 100), parse dice notacije.
- **SEO:** DnD/board-game use, "dice notation explained", FAQ, related: Wheel, Coin Flip, Random Number.

### 3. Morse Code Translator  `/morse-code-translator/`
- **Što radi:** tekst ↔ Morse, uz audio/vizualnu reprodukciju.
- **Logika:** dva mapa (char→morse, morse→char). Text→morse: po znaku lookup, riječi odvojene `/`. Morse→text: split po razmaku/`/`. Audio: Web Audio `OscillatorNode` (dot = 1 jedinica, dash = 3, gap pravila).
- **Input:** textarea (auto-detektira smjer: sadrži li `.`/`-` → dekodiraj), brzina (WPM), frekvencija.
- **Output:** prevedeni tekst + Play (zvuk) + flash (vizualni bljesak) + download .wav (opcionalno).
- **Libs:** vanilla + Web Audio.
- **Edge:** nepoznati znakovi (preskoči/označi), miješani unos.
- **SEO:** Morse tablica (linkabilna!), "SOS", povijest, FAQ, related: Binary, fancy text. **Linkbait:** ugradiva Morse tablica.

### 4. Random Name Generator  `/random-name-generator/`
- **Što radi:** generira nasumična imena (osobna, korisnička, nadimci) po filterima.
- **Logika:** kurirane liste (first/last po porijeklu/spolu, nickname komponente) u JS-u; `pick = arr[randInt]`. Username: kombinira pridjev+imenicu+broj.
- **Input:** tip (real/username/nickname/fantasy bridge), spol, porijeklo, količina (1–50).
- **Output:** lista generiranih + copy each / copy all + regenerate.
- **Libs:** vanilla + JSON liste (self-host, lazy fetch).
- **Edge:** velike liste (paginate), jedinstvenost (dedup unutar batcha).
- **SEO:** use-caseovi (likovi, računi, bebe), FAQ, related: Fantasy Name, Username, Wheel.

---

## KLASTER 2 — Text & Fonts

### 5. Fancy / Font Generator  `/fancy-text-generator/`  ⭐ flagship
- **Što radi:** pretvara upisani tekst u Unicode "fontove" (bold, italic, cursive, bubble, strikethrough, small caps, upside-down…).
- **Logika:** mape `{ 'a':'𝐚', ... }` po stilu; render svih stilova paralelno. Čista string transformacija (bez fetcha).
- **Input:** jedan text field.
- **Output:** lista 30–50 stilova, svaki s **Copy** gumbom (clipboard). Live update.
- **Libs:** vanilla. Mape stilova u zasebnom `styles.js` (lazy).
- **Edge:** znakovi bez mape (fallback original), emoji, dijakritika.
- **SEO:** "for Instagram/TikTok bio", "does it work on X", FAQ, related: Character Counter, Fantasy Name. **Linkbait:** svaki stil kao dijeljiva stranica.

### 6. Character Counter  `/character-counter/`
- **Što radi:** broji znakove, riječi, rečenice, paragrafe, vrijeme čitanja; limiti platformi.
- **Logika:** `chars = str.length`, `charsNoSpaces`, `words = str.trim().split(/\s+/).length`, sentences `split(/[.!?]+/)`, reading time `words/200 min`. Limiti: Twitter/X 280, meta description 160, SMS 160.
- **Input:** textarea (paste).
- **Output:** živi brojači + progress bar prema odabranom limitu.
- **Libs:** vanilla.
- **Edge:** Unicode/emoji (grapheme count opcija), CJK.
- **SEO:** "Twitter/meta/SMS limit", related: Word Frequency, Fancy Text, Case Converter.

### 7. Fantasy Name Generator  `/fantasy-name-generator/`
- **Logika:** kategorizirane komponente (elf/dwarf/dragon/sci-fi: prefiks+koren+sufiks) → kombinatorika; opcijski spol/rasa.
- **Input:** kategorija, spol, broj.
- **Output:** lista + copy + regenerate + "favorite".
- **Libs:** vanilla + liste.
- **SEO:** D&D/pisci/gameri, related: Random Name, Wheel.

---

## KLASTER 3 — Fitness & Health  (formule provjerene)

### 8. TDEE Calculator  `/tdee-calculator/`  ⭐
- **Formula:** BMR (Mifflin-St Jeor): M `10·kg + 6.25·cm − 5·age + 5`; Ž `10·kg + 6.25·cm − 5·age − 161`. **TDEE = BMR × activity** (sedentary 1.2, light 1.375, moderate 1.55, active 1.725, athlete 1.9). Opcija Katch-McArdle ako je poznat body fat.
- **Input:** spol, dob, visina, težina (metrički/imperijalni toggle), aktivnost.
- **Output:** BMR + TDEE + ciljne kalorije (cut −20%, maintain, bulk +10%).
- **Edge:** imperijalni↔metrički pretvorba, validacija raspona.
- **SEO:** "what is TDEE", formula/metodologija (E-E-A-T), FAQ, related: BMR, Macro, Calorie Deficit. Money-page klastera.

### 9. BMR Calculator  `/bmr-calculator/`
- **Formula:** dijeli Mifflin-St Jeor s TDEE (bez activity množitelja). Opcija Harris-Benedict (usporedba).
- **Output:** BMR + objašnjenje + link na TDEE za dnevnu potrošnju.
- **SEO:** related: TDEE, Macro. Interni link koji hrani TDEE money-page.

### 10. Macro Calculator  `/macro-calculator/`
- **Formula:** TDEE → cilj (cut/maintain/bulk) → makrosi: protein `1.6–2.2 g/kg`, mast `0.8–1 g/kg`, ostatak ugljikohidrati; ili presetovi (balanced 40/30/30, keto 5/25/70, high-protein).
- **Input:** kao TDEE + cilj + preset.
- **Output:** g proteina/UH/masti + kcal svakog + pie (vlastiti canvas).
- **SEO:** "how to count macros", related: TDEE, BMR.

---

## KLASTER 4 — Finance & Money  (formule provjerene)

### 11. Compound Interest Calculator  `/compound-interest-calculator/`  ⭐
- **Formula:** `A = P(1 + r/n)^(n·t)`. S redovnim ulozima: `FV = P(1+i)^N + PMT·[((1+i)^N − 1)/i]`, `i = r/n`, `N = n·t`.
- **Input:** principal, godišnja kamata %, učestalost (dnevno/mj/kvartal/god), godine, redovni ulog (opcijski), tip uloga (početak/kraj).
- **Output:** konačni iznos, uplaćeno vs kamata, **graf rasta** (vlastiti canvas), godišnja tablica.
- **Edge:** r=0 (linearno), veliki eksponenti (BigInt? ne treba, float ok), valuta format `Intl.NumberFormat`.
- **SEO:** formula/metodologija, "rule of 72", primjeri, FAQ, related: Amortization, Tip. Money-page.

### 12. Amortization Calculator  `/amortization-calculator/`  ⭐
- **Formula:** mjesečna rata `M = P·i(1+i)^n / ((1+i)^n − 1)`, `i = APR/12`, `n = godine·12`. Schedule: po rati kamata `= balance·i`, glavnica `= M − kamata`, novi balance.
- **Input:** iznos kredita, APR, rok (godine), početni datum, extra payment (opcijski).
- **Output:** rata, ukupno plaćeno, ukupna kamata, **puna amortizacijska tablica** + **CSV export** + graf balance.
- **Edge:** i=0, zaokruživanje zadnje rate, extra payment skraćuje rok.
- **SEO:** "how amortization works", related: Compound Interest. Money-page (CPC $3.32).

### 13. Tip Calculator  `/tip-calculator/`
- **Formula:** `tip = bill·pct/100`; `total = bill + tip`; `perPerson = total/people`; opcija round-up.
- **Input:** račun, tip % (presetovi 15/18/20 + custom), broj osoba, split.
- **Output:** tip, ukupno, po osobi. Instant.
- **SEO:** "how much to tip", tip guide po zemljama/uslugama (long-tail: restaurant/haircut/nail), related: Compound Interest, Discount.

---

## KLASTER 5 — Math & Education

### 14. GPA Calculator  `/gpa-calculator/`  ⭐
- **Formula:** `GPA = Σ(gradePoints·credits) / Σ(credits)`. Mapa ocjena: A=4.0, A−=3.7, B+=3.3, B=3.0 … F=0. Weighted: +0.5 Honors, +1.0 AP/IB.
- **Input:** redovi (kolegij, ocjena dropdown, krediti/sati), dodaj/ukloni red, toggle weighted/unweighted, skala (4.0/4.3), semester vs cumulative (unesi prethodni GPA+krediti).
- **Output:** GPA (uživo), ukupni krediti, quality points.
- **Edge:** prazni redovi, pass/fail (izuzmi iz GPA), različite skale.
- **SEO:** "how to calculate GPA", weighted vs unweighted, HS vs college, FAQ, related: Grade, Fraction. Money-page (823k, $4.10).

### 15. Fraction Calculator  `/fraction-calculator/`
- **Logika:** parse `a/b`, mixed `w a/b`. Operacije: `a/b ± c/d = (a·d ± c·b)/(b·d)`, `×`, `÷`. Simplify preko `gcd`. Decimal↔fraction (continued fractions).
- **Input:** dva razlomka + operator; ili decimal→fraction mod.
- **Output:** rezultat (simplificiran + mixed + decimal) + koraci.
- **Edge:** dijeljenje s 0, negativni, mixed numbers.
- **SEO:** koraci rješavanja, related: Std Dev, GPA.

### 16. Standard Deviation Calculator  `/standard-deviation-calculator/`
- **Logika:** parse brojeva (razmak/zarez/newline). `mean = Σx/n`. Variance: population `Σ(x−mean)²/n`, sample `/(n−1)`. `SD = √variance`. Također min/max/median/range/sum.
- **Input:** textarea brojeva, toggle sample/population.
- **Output:** SD, variance, mean, count + koraci + (opcijski) mini histogram.
- **Edge:** n=1 (sample undefined), ne-brojevi (filtriraj).
- **SEO:** sample vs population, formula, related: Fraction, Average.

---

## KLASTER 6 — Date & Time

### 17. Date Calculator  `/date-calculator/`
- **Logika:** razlika: `Math.round((d2−d1)/86400000)` dana → tjedni/mjeseci/godine. Add/subtract: `date.setDate(date.getDate()±n)`. Business days: petljom preskačeš vikende (+ opcijski praznici).
- **Input:** dva moda — (a) razlika između dva datuma, (b) datum ± N dana/tjedana/mjeseci.
- **Output:** dani/tjedni/mjeseci/godine, dan u tjednu, business days.
- **Edge:** prijestupne godine, vremenske zone (koristi UTC/local dosljedno), DST.
- **SEO:** "days between dates", related: Age, Duration.

### 18. Age Calculator  `/age-calculator/`  (traffic anchor)
- **Logika:** od datuma rođenja do danas: godine/mjeseci/dani (uzmi u obzir prijelaze mjeseci), ukupno dana/sati/minuta, sljedeći rođendan (countdown), dan u tjednu rođenja.
- **Input:** datum rođenja (+ opcijski "na datum").
- **Output:** dob u više jedinica + zabavne činjenice.
- **Edge:** buduć datum (blokiraj), prijestupni 29.2.
- **SEO:** "how old am i", related: Date, Duration. Golem volumen → interni linkovi hrane Date klaster.

---

## KLASTER 7 — Developer Tools

### 19. JSON Formatter  `/json-formatter/`  ⭐ CPC $11.47
- **Logika:** `JSON.parse(input)` (try/catch → prikaži poziciju greške), `JSON.stringify(obj, null, indent)`. Minify: `JSON.stringify(obj)`. Syntax highlight: vlastiti regex (key/string/number/bool/null → span klase). Tree view: rekurzivni render s collapse.
- **Input:** textarea (paste JSON) + indent (2/4/tab), toggle format/minify/validate/tree.
- **Output:** formatiran + highlight + validacija (✓/✗ s linijom greške) + copy/download. **Sve u pregledniku (privatnost = selling point).**
- **Edge:** golem JSON (throttle/worker), trailing commas (jasna greška), duboka gniježđenja.
- **SEO:** "format/validate JSON online", JSON basics, related: UUID, Base64. Money-page (privacy angle za backlinkove).

### 20. UUID Generator  `/uuid-generator/`  ⭐ EASY, CPC $7.48
- **Logika:** v4 `crypto.randomUUID()` (native). Bulk: petlja 1–1000. Opcije: uppercase, bez crtica, v1 (timestamp-based, vlastita impl). 
- **Input:** verzija, količina, format toggles.
- **Output:** lista UUID-a + copy each/all + download .txt.
- **Edge:** velike količine (limit + virtual list), starije preglednike (fallback getRandomValues).
- **SEO:** "what is a UUID", v1 vs v4, related: JSON Formatter, Base64. Brz proboj gradi dev autoritet.

---

## Dodatak A — Zajednički moduli za reuse (piši jednom, koristi svugdje)
- `format.js` — brojevi/valute/datumi (`Intl`), zaokruživanje.
- `clipboard.js` — copy s toast potvrdom.
- `share.js` — serijaliziraj state u URL query + "copy link" + embed snippet.
- `storage.js` — localStorage wrapper (zadnji unos).
- `units.js` — metrički↔imperijalni (kg/lb, cm/in) za fitness alate.
- `canvas-chart.js` — mini line/pie bez vanjske biblioteke (compound interest, macro, std dev).
- `ads.js` — lazy AdSense loader (IntersectionObserver).
- `analytics.js` — GA4 + event tracking (koristi tool, copy, share).

## Dodatak B — Rubni slučajevi koji vrijede za SVE alate
- Prazan/nevaljan unos → prijateljska poruka, ne crash.
- Instant izračun (debounce 100-150ms na tipkanju).
- Deep-link state (podijeli rezultat) na svakom alatu → backlink/share magnet.
- Radi offline nakon prvog učitavanja (service worker opcijski → PWA, brzina + engagement).
- Bez slanja podataka na server (privatnost — istaknuti, gradi povjerenje + E-E-A-T).

## Dodatak C — Zašto su svi buildable statično (potvrda)
Nijedan od 20 ne treba backend: sve su čiste funkcije (matematika, string transformacija, Date, Canvas, crypto). Zato smo namjerno **izbjegli** alate koji trebaju server/tešku obradu (currency s live tečajem, grammar/plagiarism AI, PDF konverzije, OCR, background removal) — oni su u HARD/skip listi Koraka 2.

---

### TL;DR
20 alata, svi čiste client-side funkcije, dijele zajednički layout (alat above-the-fold + how-to + formula + FAQ + related + author), zajedničke JS module (format/clipboard/share/chart/ads), nula teških biblioteka → savršen Core Web Vitals. Svaki alat = money/traffic page u svom klasteru s internim linkovima i deep-link share funkcijom (backlink magnet).

*Sljedeće → Korak 4: procjena prometa i rankinga (funnel model), tech setup i deploy, te potpuni AdSense monetizacijski playbook.*
