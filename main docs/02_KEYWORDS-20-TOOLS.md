# Korak 2 — 20 alata: keyword istraživanje, konkurencija i odabir

**Cilj:** izabrati 20 alata (kalkulatori / generatori / konverteri) gdje nova statična stranica ima **najveću realnu šansu rangirati visoko** uz **dobar volumen** i **monetizacijski potencijal** za AdSense.

---

## 0. Metodologija (sve na PRAVIM podatcima, ne procjena)

1. **Volumen + CPC + konkurencija oglašivača** → izvučeno LIVE iz **Google Ads Keyword Plannera** (`GenerateKeywordIdeas`, geo = SAD, jezik = engleski). Skupljeno **71.712 jedinstvenih keyworda** kroz 14 kategorija (`research/keywords/keywords_raw.csv`).
2. **Rankability (SEO težina)** → **NIJE** iz Keyword Plannera (tamo je "competition" = oglašivačka, ne organska). Umjesto toga analizirali smo **žive Google SERP-ove** za 41 kandidata i procijenili može li nova stranica (custom domena, bez backlinkova, < 12 mj) probiti stranicu 1. Klasifikacija: **EASY / MEDIUM / HARD**.
3. **Litmus test iz Koraka 1** primijenjen na sve: biramo isključivo **action-upite** (alat) koje AI Overview ne kanibalizira. Potvrda iz SERP analize: **nijedan od 41 upita nema AI Overview.**
4. **Buildability**: svih 20 mora raditi kao **100% client-side JS** na GitHub Pages (bez servera).

### Ključni princip odabira (tvoja direktiva)
> Ne juримo mega-glave gdje divovi (calculator.net, omnicalculator, bankrate, cdc.gov, grammarly, adobe…) drže lokot. Biramo SERP-ove s **pukotinom** — gdje već rangiraju nezavisne/tanke stranice, dokazujući da se može probiti.

### Zašto neki alati imaju ogroman volumen a mi ih ipak ne uzimamo
`mortgage calculator` (2.74M) i `bmi calculator` (2.74M) su najveći, ali su **HARD** (NIH, Harvard, CDC, Bankrate, Zillow drže top 10). Uzeti ih kao primarne = bacanje resursa (Korak 1, §2). Umjesto toga uzimamo alate od 100k–1.2M gdje SERP curi.

---

## 1. MASTER TABLICA — 20 odabranih alata (rangirano po prilici)

Legenda: **Vol** = mj. pretrage glave (SAD) · **CPC** = high top-of-page bid (signal vrijednosti oglasa) · **Rank** = SEO probojnost za novu stranicu · **$$$** = monetizacijski tier

| # | Alat | Klaster | Vol/mj | CPC$ | Rank | $$$ | Zašto |
|---|------|---------|-------:|-----:|:----:|:---:|-------|
| 1 | **Fancy / Font Generator** | Text | 1.000.000 | 2.39 | 🟢 EASY | ★★★ | Ogroman volumen + SERP pun tankih nezavisnih |
| 2 | **Spinner / Wheel of Names** | Fun | 1.220.000 | 2.31 | 🟡 MED | ★★★ | Najveći volumen; klonovi upravo probili |
| 3 | **GPA Calculator** | Math/Edu | 823.000 | 4.10 | 🟡 MED | ★★★ | Visok CPC; .edu stranice ne konkuriraju nacionalno |
| 4 | **Compound Interest Calc** | Finance | 823.000 | 1.65 | 🟡 MED | ★★★ | Najbolji finance ulaz; moneychimp/male banke slabe |
| 5 | **Random Name Generator** | Fun | 201.000 | 9.73 | 🟡 MED | ★★★ | Vrlo visok CPC; spam/tiny stranice u top 10 |
| 6 | **JSON Formatter** | Dev | 110.000 | 11.47 | 🟡 MED | ★★★ | Najviši CPC; hrpa tankih json-*.com stranica |
| 7 | **TDEE Calculator** | Fitness | 550.000 | 1.30 | 🟡 MED | ★★ | Nova 2026 stranica (tdee.is) već rangira |
| 8 | **Morse Code Translator** | Fun | 368.000 | 0.00 | 🟢 EASY | ★ | Najlakši SERP; volumen + linkbait/brand |
| 9 | **Dice Roller** | Fun | 450.000 | 1.04 | 🟡 MED | ★★ | DnD niša; rolldice/flipsimu slabi |
| 10 | **Amortization Calculator** | Finance | 301.000 | 3.32 | 🟡 MED | ★★★ | amortization-calc.com (nezavisan) dokaz proboja |
| 11 | **Date Calculator** | Date | 673.000 | 1.46 | 🟡 MED | ★★ | Samo timeanddate autoritet, ostatak mekan |
| 12 | **Age Calculator** | Date | 673.000 | 0.01 | 🟡 MED | ★ | Golem volumen (traffic/authority anchor) |
| 13 | **UUID Generator** | Dev | 22.200 | 7.48 | 🟢 EASY | ★★ | Najotvoreniji dev SERP; visok CPC |
| 14 | **Macro Calculator** | Fitness | 110.000 | 1.46 | 🟡 MED | ★★ | Restoran/Shopify stranice u top 8 |
| 15 | **BMR Calculator** | Fitness | 165.000 | 0.57 | 🟡 MED | ★★ | Press-release/aggregator cure u top 8 |
| 16 | **Fraction Calculator** | Math | 368.000 | 1.62 | 🟡 MED | ★★ | Samo 2 diva; brighterly/calculate.co.nz slabi |
| 17 | **Standard Deviation Calc** | Math | 74.000 | 2.82 | 🟡 MED | ★★ | statcalc/ajdesigner slabi; stats klaster |
| 18 | **Fantasy Name Generator** | Text | 135.000 | 1.74 | 🟡 MED | ★★ | fantasynamegenerators tek #8; bu.edu curi |
| 19 | **Character Counter** | Text | 246.000 | 0.23 | 🟡 MED | ★ | charcounter/charactercounttool tanki EMD |
| 20 | **Tip Calculator** | Finance | 450.000 | 0.61 | 🟡 MED | ★ | Najjednostavniji; salecalc/thin konkurencija |

**Zbroj volumena glava: ~8.8M pretraga/mj (SAD)** — a svaki alat ima 50–800 long-tail varijanti koje višestruko množe taj broj (ukupni klaster-volumen je desetci milijuna). Realna procjena hvatanja → Korak 4.

**3 EASY proboja** (najbrži rezultati): Fancy Text, Morse Code, UUID.
**Zlatni MEDIUM** (volumen × CPC × probojnost): Spinner Wheel, GPA, Compound Interest, Random Name, JSON Formatter, TDEE, Amortization.

---

## 2. DETALJNI PROFILI PO KLASTERIMA

Klaster = grupa povezanih alata koji se međusobno interno linkaju i grade **topical authority** (Korak 1, Faza C). Money-page alat u centru, oko njega varijante + how-to članci.

---

### 🎡 KLASTER 1 — Fun & Random (viralni magnet za backlinkove + brand mentions)

Ovaj klaster je strateški: zabavni alati dobivaju **prirodne backlinkove i share-ove** (učionice, Discord, Reddit, forumi), što diže autoritet cijele domene i prosljeđuje ga money-page alatima (Korak 1, §4C).

#### 1.1 Spinner / Wheel of Names  🟡 MEDIUM
- **Glava:** `wheel of names` — **1.220.000/mj**, CPC $2.31 · `spin the wheel` — 1.000.000/mj
- **SERP:** wheeldecide.com, pickerwheel.com, **spinthewheel.io, heyspinner.com, spinwheelify, randomspinwheel** (novi SEO klonovi koji su UPRAVO probili) → dokaz da je niša i dalje probojna.
- **Long-tail:** random wheel (110k), random name picker (49.5k), wheel picker (49.5k), spin the wheel custom (40.5k), yes/no wheel, wheel of names random name picker.
- **Zašto:** golem volumen, dokazano probojno, viralno (nastavnici/streameri linkaju). CPC glave pristojan; većina long-tailova nisko CPC = traffic/authority igra.
- **Build:** Canvas + CSS rotacija, custom unosi, spremanje u URL/localStorage. Client-side. ✅

#### 1.2 Dice Roller  🟡 MEDIUM
- **Glava:** `dice roller` — **450.000/mj**, CPC $1.04
- **SERP:** random.org, calculator.net jaki, ali **dnddiceroller.com, rolldice.org, flipsimu** slabi/mali → probojno s poliranim DnD-fokusiranim alatom.
- **Long-tail:** virtual dice roller (33k), dnd/dungeons and dragons dice roller (27k×3), dice roller 1-6 (9.9k), roll two dice (6.6k).
- **Zašto:** stabilna RPG niša, evergreen, laka izrada, dobra za internal-link mrežu s wheel/coin.
- **Build:** JS random + 3D CSS/Canvas kockice, D4–D20 setovi. ✅

#### 1.3 Morse Code Translator  🟢 EASY
- **Glava:** `morse code translator` — **368.000/mj**, CPC $0.00
- **SERP:** **najotvoreniji** — morsetranslator.net, morsecode.world, funtranslations, coddy.tech, tools.timodenk.com (sve tanki nezavisni, gotovo bez DA85 lokota).
- **Long-tail:** morse alphabet translator (368k), morse translator online (60.5k), morse code generator (14.8k), morse code decoder/decipher (12k), convert morse code to english (6.6k).
- **Zašto:** ogroman volumen uz najlakši ranking. CPC ~$0 → čista traffic/authority + linkbait stranica (dodaj audio beep + kopiraj/podijeli → ljudi linkaju).
- **Build:** char-map dictionary + Web Audio API beep (točke/crte). ✅

#### 1.4 Random Name Generator  🟡 MEDIUM  ⭐ CPC $9.73
- **Glava:** `random name generator` — **201.000/mj**, CPC **$9.73**
- **SERP:** behindthename.com, randomwordgenerator.com sidre, ali **namey.muffinlabs, donjon.bin.sh** i čak spam govt.nz PDF u top 10 → iskoristive slabosti.
- **Long-tail:** random name picker/selector (49.5k×2), random account/username name generator (14.8k), nickname generator random (201k).
- **Zašto:** iznimno visok CPC za "random" alat (advertiseri ciljaju naming/branding). Odličan money-page unutar fun klastera.
- **Build:** kurirane liste imena (prvo/prezime/nickname/fantasy) + random + filteri (spol, porijeklo). ✅

**Expanzija klastera 1 (buduće supporting stranice):** coin flip, yes/no generator, random number 1-100, random letter, random team generator, truth or dare.

---

### 🔤 KLASTER 2 — Text & Fonts (lako rangiranje, ogroman volumen)

#### 2.1 Fancy / Font Generator  🟢 EASY  ⭐ FLAGSHIP
- **Glava:** `font generator` — **1.000.000/mj**, CPC $2.39 · `fancy text generator` — 74k, CPC **$5.54**
- **SERP:** **EASY** — creativefabrica, picsart, lingojam + pola top 10 su tanki nezavisni (texttrick.com, fancytexty.com, fancytextsgenerators, openl.io). Google ovdje rangira lagane stranice.
- **Long-tail:** create fancy text / fancy text maker (74k, $5.54), fancy font generator/creator/maker (40.5k×3, $2.03), text font generator (27k), fancy text gen (33k).
- **Zašto:** kombinacija ogromnog volumena + EASY ranka + pristojnog CPC = **najbolji pojedinačni alat u cijelom projektu**. Instagram/TikTok bio publika golema.
- **Build:** Unicode mapiranje (bold, italic, cursive, bubble, strikethrough…) + kopiraj gumb. Čista funkcija stringa. ✅

#### 2.2 Character Counter  🟡 MEDIUM
- **Glava:** `character counter` — **246.000/mj**, CPC $0.23
- **SERP:** grammarly/wordcounter.net/quillbot na vrhu, ALI 3 tanka EMD-a (**charactercounter.com, charactercounttool.com, charcounter.com**) drže page-1 → probojno superiornom stranicom.
- **Long-tail:** character count online (12k), character and word count (5.4k), character count tool (4.4k), twitter/chinese character counter, character count limit.
- **Zašto:** izbjegavamo `word counter` (HARD — Grammarly/Semrush), a `character counter` je njegov crackable rođak; social-media limiti (Twitter/X, meta, SMS) daju long-tailove.
- **Build:** `string.length`, riječi/rečenice/paragrafi, limiti platformi uživo. ✅

#### 2.3 Fantasy Name Generator  🟡 MEDIUM
- **Glava:** `fantasy name generator` — **135.000/mj**, CPC $1.74 · `fantasy username generator` — 135k
- **SERP:** reedsy, prowritingaid veliki, ali litrpgadventures, mythopedia, **bu.edu student stranica** cure; klasik fantasynamegenerators.com tek **#8** → prostor.
- **Long-tail:** elf name randomizer (18k), fantasy name generator female (2.4k), random character/elf/world name generator.
- **Zašto:** gaming/pisci evergreen; premošćuje s Random Name Generatorom (isti engine, dijele interne linkove).
- **Build:** kategorizirane fantasy liste (elf, dwarf, dragon, sci-fi) + spol/rasa filteri. ✅

**Expanzija klastera 2:** case converter (27k), text repeater, word frequency counter (EASY, 4.4k), bold text generator, cursive generator, small text generator.

---

### 💪 KLASTER 3 — Fitness & Health (dobar CPC, jak topical authority)

Fitness kalkulatori se prirodno klasteriraju (isti korisnik treba TDEE→BMR→makrose→kalorije) → snažni interni linkovi i "znamo ovu temu" signal Googleu.

#### 3.1 TDEE Calculator  🟡 MEDIUM  ⭐
- **Glava:** `tdee calculator` — **550.000/mj**, CPC $1.30
- **SERP:** tdeecalculator.net (#1, beatable EMD, NE DA85 div), builtwithscience, hybridcalisthenics + **nova 2026 stranica tdee.is već rangira** → svjež ulaz dokazano moguć.
- **Long-tail:** tdee (74k), tdee calculator to lose weight (12k), tdee calculator net (12k), tdee calorie calculator, total daily energy expenditure calculator.
- **Zašto:** središnji fitness alat, visok volumen, mekan SERP. Money-page klastera.
- **Build:** Mifflin-St Jeor / Katch-McArdle formule + activity multiplier. Čista matematika. ✅

#### 3.2 BMR Calculator  🟡 MEDIUM
- **Glava:** `bmr calculator` — **165.000/mj**, CPC $0.57 · `basal metabolic rate calculator` — 165k
- **SERP:** myfitnesspal/calculator.net/active jaki, ali **einpresswire press-release + alternativeto aggregator** u top 8 → cure slotovi.
- **Long-tail:** basal metabolic rate/weight/index calculator (varijante), bmr computation.
- **Build:** dijeli formulu s TDEE (BMR je baza) → savršen internal-link partner. ✅

#### 3.3 Macro Calculator  🟡 MEDIUM
- **Glava:** `macro calculator` — **110.000/mj**, CPC $1.46
- **SERP:** bodybuilding/mfp/precisionnutrition, ali **restoran (macroshealthyrestaurant.com), grittysoldier, eatcleanbro** (off-topic/thin) u top 8 → jasan prostor.
- **Long-tail:** macro calculator for weight/fat loss (12k×2), mfp/myfitnesspal macro calculator (12k), precision nutrition macro calculator (6.6k).
- **Build:** TDEE → podjela na P/C/F po ciljanju (cut/maintain/bulk) + presetovi (keto, balanced). ✅

**Expanzija klastera 3:** body fat calculator (74k, MED), ideal weight, calorie deficit, protein calculator, water intake, one-rep-max. (calorie/bmi = HARD, drži kao supporting how-to, ne money-page.)

---

### 💰 KLASTER 4 — Finance & Money (najviši CPC-jevi)

#### 4.1 Compound Interest Calculator  🟡 MEDIUM  ⭐ najbolji finance ulaz
- **Glava:** `compound interest calculator` — **823.000/mj**, CPC $1.65 · `compound interest` — 60.5k, CPC **$7.09**
- **SERP:** investor.gov, thecalculatorsite, ramsey, bankrate — ALI **moneychimp.com (drevni plain-HTML), myfsbonline, bnc.bank (male banke)** drže page-1 → najviše iskoristivih slabosti od svih finance upita.
- **Long-tail:** compound interest formula (60.5k), daily/monthly compound interest calculator, investment/savings growth calculator.
- **Zašto:** visok volumen, dobar CPC, i najbolji dokazani proboj u finance niši (Korak 1 princip: nađi pukotinu).
- **Build:** A=P(1+r/n)^(nt) + graf rasta (Chart bez libraryja ili laki canvas) + tablica po godinama. ✅

#### 4.2 Amortization Calculator  🟡 MEDIUM  ⭐ CPC $3.32
- **Glava:** `amortization calculator` — **301.000/mj**, CPC $3.32 · `amortization` — 74k, CPC **$14.34**
- **SERP:** bankrate/chase/calculator.net, ali **nezavisni amortization-calc.com u top 5** = dokaz da single-purpose alat probije.
- **Long-tail:** amortization table/chart calculator (301k), amortization schedule (74k, $7.63), mortgage/home/house amortization calculator (74k×4).
- **Zašto:** iznimno visok CPC (posudbe/hipoteke), a exact-match dedicated alat dokazano rangira. Ulaz u finance bez direktnog napada na `mortgage calculator` (HARD).
- **Build:** puna amortizacijska tablica (glavnica/kamata po ratama) + export CSV. ✅

#### 4.3 Tip Calculator  🟡 MEDIUM
- **Glava:** `tip calculator` — **450.000/mj**, CPC $0.61
- **SERP:** calculatestuff (#1 nezavisan), calculator.net, salecalc, čak Google Play listing → niska kompleksnost + slabi konkurenti = najbrži page-1.
- **Long-tail:** restaurant tip calculator (4.4k), gratuity/haircut/nail salon tip calculator, tip percentage calculator, tax and tip calculator.
- **Zašto:** najjednostavniji alat, brz proboj, dobra "everyday" traffic stranica koja hrani finance klaster internim linkovima.
- **Build:** iznos × % + split po osobama. Trivijalno. ✅

**Expanzija klastera 4:** savings goal, loan payoff, ROI, discount calculator (40.5k), currency-free conversions. (mortgage/paycheck/salary/sales-tax = HARD → supporting how-to only.)

---

### 🎓 KLASTER 5 — Math & Education

#### 5.1 GPA Calculator  🟡 MEDIUM  ⭐ CPC $4.10, Vol 823k
- **Glava:** `gpa calculator` — **823.000/mj**, CPC $4.10
- **SERP:** gpacalculator.io i gpacalculator.net (**nezavisni tool-siteovi već rangiraju**), calculator.net, + hrpa **.edu advising stranica koje ciljaju samo svoje studente** (ne konkuriraju nacionalno) → veliki prostor za jak općeniti alat.
- **Long-tail:** hs/high school gpa calculator (60.5k, $5.82), weighted gpa calculator (14.8k), cumulative gpa calculator (18k), college/semester gpa calculator, gpa from grades.
- **Zašto:** rijetka kombinacija — 823k volumen, $4.10 CPC (education advertiseri), I probojan SERP. Vrhunski money-page.
- **Build:** unos ocjena+kredita, weighted/unweighted, +/- skale, semester/cumulative. Client-side. ✅

#### 5.2 Fraction Calculator  🟡 MEDIUM
- **Glava:** `fraction calculator` — **368.000/mj**, CPC $1.62
- **SERP:** samo mathpapa + calculator.net pravi divovi; **brighterly, calculate.co.nz, dadsworksheets** slabiji + 2 slota potrošena na App/Play listinge → prostor.
- **Long-tail:** mixed fraction calculator (18k), decimal to fraction calculator (14.8k, $2.10), reducing/simplifying fractions calculator (8.1k×2), fraction with whole numbers.
- **Build:** zbroj/oduzmi/množi/dijeli razlomke, pojednostavljenje, decimalno↔razlomak. ✅

#### 5.3 Standard Deviation Calculator  🟡 MEDIUM
- **Glava:** `standard deviation calculator` — **74.000/mj**, CPC $2.82 (`standard deviation formula` — 110k)
- **SERP:** calculatorsoup/calculator.net/omni na vrhu, ali **statcalc.net, ajdesigner, standarddeviationcalculator.io** (nezavisni) u top 10 → probojno sa stats klasterom.
- **Long-tail:** find/compute/determine standard deviation calculator (74k), variance calculator, sample vs population SD.
- **Build:** unos skupa brojeva → mean, variance, SD (sample+population), koraci. ✅

**Expanzija klastera 5:** percentage increase (165k), average/mean calculator, grade calculator, ratio, scientific calculator (support), permutation/combination.

---

### 📅 KLASTER 6 — Date & Time

#### 6.1 Date Calculator  🟡 MEDIUM
- **Glava:** `date calculator` — **673.000/mj**, CPC $1.46
- **SERP:** samo timeanddate.com pravi autoritet; ostatak (**toolsana aggregator, shiftflow.app, .ac.in resource, Adobe eLearning blog**) mekan → jedan od najlakših visoko-volumnih.
- **Long-tail:** days between dates (90.5k×2), days/business days calculator (74k, 40.5k), time calculator by date (135k), date count calculator.
- **Build:** razlika između datuma, dodaj/oduzmi dane, radni dani, odbrojavanje. ✅

#### 6.2 Age Calculator  🟡 MEDIUM  (traffic/authority anchor)
- **Glava:** `age calculator` — **673.000/mj**, CPC $0.01
- **SERP:** calculator.net/calculatorsoup, ali **calculatestuff, dayschedule, agecalculator.su, tanka cornell.edu** → probojno.
- **Long-tail:** age calculator by birth date (27k), how old am i (8.1k), gestational/pregnancy age calculator (6.6k, $4.43!), age in months/days.
- **Zašto:** golem volumen, nizak CPC → traffic + authority anchor koji internim linkovima diže cijeli Date klaster; par long-tailova (gestational) ima $4+ CPC.
- **Build:** birth date → years/months/days/hours, next birthday countdown. ✅

**Expanzija klastera 6:** time duration calculator (135k), countdown timer (support — HARD za head), week number, sleep calculator, work hours calculator.

---

### 💻 KLASTER 7 — Developer Tools (najviši CPC, otvoreni SERP-ovi)

Dev alati su strateški zlato: SERP-ovi su **fragmentirani** (nema jednog "calculator.net" diva), CPC-jevi visoki (B2B/SaaS advertiseri), a publika (developeri) prirodno linkuje i dijeli.

#### 7.1 JSON Formatter  🟡 MEDIUM  ⭐ CPC $11.47
- **Glava:** `json formatter` — **110.000/mj**, CPC **$11.47**
- **SERP:** jsonformatter.org + curiousconcept jaki, ali SERP pun tankih (**jstoolset, online-json, json-indent, json.site**) → prostor za bolju dev-fokusiranu stranicu.
- **Long-tail:** json beautifier (18k, $13.59), json formatter online (14.8k, $15.31), json validator (12k), json to csv (6.6k), json file formatter, chrome extension.
- **Zašto:** najviši CPC u cijelom projektu + fragmentiran SERP. Vrhunski money-page.
- **Build:** JSON.parse/stringify + syntax highlight + validacija + tree view + minify. Sve client-side (privatnost = selling point). ✅

#### 7.2 UUID Generator  🟢 EASY  ⭐ CPC $7.48
- **Glava:** `uuid generator` — **22.200/mj**, CPC $7.48
- **SERP:** **najotvoreniji** — uuidgenerator.net (mid-DA) + male/osobne stranice (marcnuri blog, famkruithof, uuid.lol, string.is). Nema mega-autoriteta.
- **Long-tail:** random uuid (1.9k), uuid v4 (1.6k), guid generator (1.6k), generate uuid online, bulk uuid.
- **Zašto:** niži volumen ALI EASY + visok CPC + savršen dev-klaster partner JSON-u; brz proboj gradi dev autoritet.
- **Build:** `crypto.randomUUID()` + v1/v4 + bulk + kopiraj. Trivijalno. ✅

**Expanzija klastera 7:** base64 encoder (60.5k, $15!), color picker (301k), hex↔rgb, hash generator (md5/sha), url encoder, timestamp converter, regex tester, JWT decoder.

---

## 3. ŠTO SMO NAMJERNO IZBJEGLI (HARD — divovi drže lokot)

Dokumentirano da se ne vraćamo na njih kao primarne (mogu poslužiti kao supporting how-to članci u klasteru):

| Alat | Vol/mj | Zašto HARD |
|------|-------:|-----------|
| mortgage calculator | 2.74M | Wikipedia, Fannie Mae, Bankrate, sve banke, calculator.net |
| bmi calculator | 2.74M | NIH, Harvard, CDC (2×), .edu, cancer.org |
| word counter | 1.22M | Grammarly, Semrush, Quillbot, ZeroGPT |
| calorie calculator | 1.0M | Mayo Clinic, cancer.org, Forbes, Healthline |
| qr code generator | 823k | Adobe Express, Canva, qr-code-generator.com |
| paycheck calculator | 673k | ADP, Gusto, PaycheckCity, SmartAsset |
| countdown timer | 673k | timeanddate, online-stopwatch, TickCounter, vClock |
| percentage calculator | 550k | Symbolab, Omni, CalculatorSoup, Calculator.net |
| salary calculator | 301k | calculator.net, Indeed, PayScale, ADP |
| image resizer | 165k | Canva, Adobe, Shutterstock, Microsoft |
| sales tax calculator | 110k | Intuit, IRS.gov, Avalara, state .gov |
| calorie deficit / ideal weight | 301k / 22k | Omni, Wikipedia, MDCalc, medical authorities |

---

## 4. ARHITEKTURA ZA TOPICAL AUTHORITY (kako 20 alata → jedna SEO mašina)

```
                         [ HOME / all tools ]
      ┌──────────┬──────────┬─────────┬─────────┬────────┬────────┬──────────┐
   /fun/      /text/     /fitness/  /finance/  /math/   /date/    /dev/
   ├ wheel    ├ fancytext ├ tdee ◄──┐├ compound ├ gpa    ├ date    ├ json
   ├ dice     ├ charcount ├ bmr ────┤├ amortize ├ fraction├ age    ├ uuid
   ├ morse    ├ fantasy   ├ macro ──┘├ tip      └ stddev  └(+dur)   └(+base64)
   └ randname └(+case)    └(+bodyfat)└(+savings)
        ▲ međusobni interni linkovi unutar klastera (cluster mesh)
        │ + hub stranica linka na sve + svaki alat linka na 2-3 srodna
```

**Pravila (iz Koraka 1):**
- Svaki alat linka na **2–3 srodna alata iz istog klastera** ("Related tools").
- Svaki klaster ima **hub stranicu** (`/fitness/`) koja linka na sve svoje alate + kratki vodič.
- Svaki alat ima **1–2 supporting how-to članka** (iz People Also Ask) koji linkaju natrag na alat (prosljeđuju autoritet money-pageu).
- **Traffic anchori** (age, morse, wheel, fancytext — golem volumen, nizak CPC) prosljeđuju autoritet **money-pageovima** (gpa, json, amortization, random name — visok CPC) kroz interne linkove.

## 5. FAZIRANJE LANSIRANJA (redoslijed gradnje)

1. **Val 1 (brzi proboji, 4-8 tj):** Fancy Text 🟢, Morse 🟢, UUID 🟢, + Tip, Dice (jednostavni MEDIUM) → prvi rankovi, indeksacija, autoritet.
2. **Val 2 (zlatni MEDIUM, mj 2-3):** Spinner Wheel, GPA, Compound Interest, Random Name, JSON Formatter, TDEE.
3. **Val 3 (dopuna klastera, mj 3-5):** Amortization, Date, Age, Macro, BMR, Fraction, Std Dev, Fantasy Name, Character Counter.
4. **Val 4 (expanzija):** supporting how-to članci + expanzijski alati po klasteru (§ "Expanzija" iznad) → produbljivanje topical authority.

---

### TL;DR
20 alata odabrano na **pravim** podatcima (Keyword Planner volumen/CPC + živa SERP analiza). Svi su action-upiti bez AI Overviewa, svi buildable kao statični client-side JS, svi u SERP-ovima s dokazanom pukotinom (EASY/MEDIUM), organizirani u 7 međusobno-linkanih klastera za topical authority. Flagshipovi: **Fancy Text (1M, EASY)**, **Spinner Wheel (1.22M)**, **GPA ($4.10)**, **JSON Formatter ($11.47)**, **Random Name ($9.73)**. Ukupno ~8.8M/mj volumena glava + desetci milijuna long-tail.

*Sljedeće → Korak 3: točna funkcionalna specifikacija kako svaki alat radi (HTML/CSS/JS za GitHub Pages) + Korak 4: procjena prometa, rankinga i AdSense monetizacije.*
