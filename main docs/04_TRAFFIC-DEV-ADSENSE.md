# Korak 4 — Procjena prometa i rankinga, development i AdSense monetizacija

**Finalni dokument: kako ova stranica postaje magnet za klikove, rangira visoko organski i maksimizira AdSense zaradu.** Sve procjene su rasponi s jasno navedenim pretpostavkama (SEO nema garancija — Korak 1, §2).

---

## 0. Iskrena realnost prije brojki (pročitaj)

- **Nema garancije #1** (Korak 1). Dajemo si maksimalne uvjete za uspjeh, ne obećanje.
- **Novi domen ima "sandbox" period** ~3–6 mj gdje Google slabo rangira bez obzira na kvalitetu. Prvih pola godine je spora.
- **AdSense odobrenje je preduvjet** i za utility stranice je **teže** (rizik "low value content"). Rješenje je u §4 — bez toga nema zarade bez obzira na promet.
- **CPC iz Keyword Plannera ≠ AdSense RPM.** AdSense plaća po display RPM-u (prihod na 1000 pregleda), koji je funkcija niše, ne search-CPC-a 1:1. Modeliramo RPM realno u §3.
- **Ovo je 12–24 mjesečna igra**, ne quick win. Ali promet je evergreen i compound (raste sam nakon što autoritet sjedne).

---

## 1. MODEL PROMETA

### 1.1 CTR po poziciji (organski, 2026, bez AI Overviewa — vrijedi za naše action-upite)
| Pozicija | ~CTR |
|---|---|
| #1 | 27–35% |
| #2 | 13–16% |
| #3 | 9–11% |
| #4 | 6–8% |
| #5 | 4–6% |
| #6–10 | 2–4% |

### 1.2 Realno hvatanje za NOVU stranicu (nakon 12–18 mj dobre izvedbe)
- **EASY alati** (Fancy Text, Morse, UUID) → realno pozicija 2–5 → hvatamo ~8–12% volumena glave + dosta long-tailova.
- **MEDIUM alati** → realno pozicija 5–9 (dno str. 1) na glavi, ali **više na long-tailovima** (gdje divovi ne ciljaju) → efektivno ~3–5% ekvivalenta glave.
- Long-tailovi (50–800 po alatu) donose dodatni sloj gdje rangiramo lakše i više.

### 1.3 Per-tool procjena (zreo portfelj, ~12–18 mj, REALISTIČAN scenarij)
| Alat | Vol glave | Rank | ~capture | ~sesije/mj |
|---|---:|:--:|---:|---:|
| Fancy Text | 1.000.000 | EASY | 5% | 50.000 |
| Morse Code | 368.000 | EASY | 10% | 37.000 |
| Age Calculator | 673.000 | MED | 4% | 27.000 |
| Spinner Wheel | 1.220.000 | MED | 2.5% | 30.000 |
| GPA Calculator | 823.000 | MED | 3% | 25.000 |
| Compound Interest | 823.000 | MED | 2.5% | 20.000 |
| Date Calculator | 673.000 | MED | 3% | 20.000 |
| Dice Roller | 450.000 | MED | 4% | 18.000 |
| Tip Calculator | 450.000 | MED | 4% | 18.000 |
| TDEE | 550.000 | MED | 3% | 16.000 |
| Fraction | 368.000 | MED | 3% | 11.000 |
| Character Counter | 246.000 | MED | 4% | 10.000 |
| Amortization | 301.000 | MED | 3% | 9.000 |
| Random Name | 201.000 | MED | 4% | 8.000 |
| Fantasy Name | 135.000 | MED | 5% | 6.750 |
| BMR | 165.000 | MED | 4% | 6.600 |
| JSON Formatter | 110.000 | MED | 5% | 5.500 |
| Macro | 110.000 | MED | 4% | 4.400 |
| Std Deviation | 74.000 | MED | 4% | 3.000 |
| UUID | 22.000 | EASY | 12% | 2.600 |
| **UKUPNO** | **~8.8M** | | | **~330.000/mj** |

> Ovo je **cilj zrelog portfelja**, ne mjesec 3. Long-tailovi mogu dodati +20–40%.

### 1.4 Ramp prometa (organske sesije/mj)
| Faza | Pesimistično | **Realistično** | Optimistično |
|---|---:|---:|---:|
| Mj 0–3 (indeks + AdSense) | 1.000 | 5.000 | 15.000 |
| Mj 3–6 (EASY rangira) | 10.000 | 35.000 | 80.000 |
| Mj 6–12 (MED na str. 1) | 40.000 | 120.000 | 250.000 |
| Mj 12–18 (portfelj zreo) | 90.000 | **250.000** | 450.000 |
| Mj 18–24 (autoritet compound) | 180.000 | **450.000** | 800.000+ |

---

## 2. Zašto će rangirati (sažetak poluga iz Koraka 1–3)
1. **Action-upiti bez AI Overviewa** → klik ide organiku (potvrđeno u SERP analizi).
2. **Odabrani samo probojni SERP-ovi** (EASY/MEDIUM), izbjegnuti divovi.
3. **Savršen intent/format-match**: alat above-the-fold = 100% zadovoljava upit.
4. **Topical authority**: 7 klastera, interni linkovi prosljeđuju autoritet money-pageovima.
5. **Vrhunski Core Web Vitals** (statični, vanilla JS) = tehnička prednost nad sporim konkurentima.
6. **E-E-A-T**: formula/metodologija, autor, datumi, primjeri po svakom alatu.
7. **Linkbait + brand mentions**: ugradivi widgeti, dijeljivi rezultati, Morse tablica.

---

## 3. MODEL ZARADE (AdSense)

### 3.1 Kako AdSense plaća
Prihod = **RPM × (pregledi / 1000)**. RPM ovisi o niši (vrijednost oglasa), geo (SAD/UK plaćaju najviše), formatu i broju oglasa. Naša publika je pretežno SAD (ciljamo en-US) = premium.

### 3.2 Procjena RPM-a po klasteru (display, US-heavy)
| Klaster | ~RPM | Zašto |
|---|---:|---|
| Finance (compound, amortization, tip) | $12–25 | Najvrjedniji oglasi (posudbe, investicije) |
| Dev (JSON, UUID) | $8–18 | B2B/SaaS advertiseri, visok CPC |
| Fitness (TDEE, BMR, macro) | $5–10 | Suplementi, dijete, fitness |
| Math/Edu (GPA, fraction, std dev) | $4–8 | Edukacija, kursevi |
| Text/Fonts (fancy text, char counter) | $3–5 | Niži intent |
| Date (age, date) | $2–5 | Nizak komercijalni intent |
| Fun (wheel, dice, morse, names) | $2–4 | Zabavni, nizak intent |
| **Blended (ponderiran prometom)** | **~$5–7** | Traffic magneti su low-RPM, money-pageovi high-RPM |

### 3.3 Ramp zarade (blended RPM ~$6, pregledi ≈ sesije × 1.3)
| Faza | Sesije/mj (real.) | Pregledi/mj | **AdSense/mj** |
|---|---:|---:|---:|
| Mj 3–6 | 35.000 | 45.000 | ~$270 |
| Mj 6–12 | 120.000 | 155.000 | ~$930 |
| Mj 12–18 | 250.000 | 325.000 | **~$1.950** |
| Mj 18–24 | 450.000 | 585.000 | **~$3.500** |

### 3.4 ⭐ Najveća poluga: premium ad mreže na skali
Kad pređeš **~50–100k sesija/mj**, kvalificiraš se za **Ezoic / Raptive (bivši AdThrive) / Mediavine** koje plaćaju **2–4× AdSense RPM** ($12–25 blended umjesto $6).
- Mj 18–24 na Mediavine/Raptive RPM ($15): 585.000 pregleda × $15 = **~$8.800/mj**.
- Optimistično (800k sesija × 1.3 = 1.04M pregleda × $18) = **~$18.700/mj**.

**Zaključak monetizacije:** AdSense je start (mj 1–12). Prava zarada dolazi (a) skaliranjem prometa i (b) prelaskom na premium mrežu. Realistična 24-mjesečna meta: **$3.500–9.000/mj**; optimistična s premium mrežom: **$12k–19k/mj**.

---

## 4. AdSense ODOBRENJE (preduvjet — bez ovoga nema ničega)

Utility stranice Google često odbija zbog **"low value content"**. Kako proći:
1. **Custom domena** (imaš je) — nikad ne apliciraj s `*.github.io`.
2. **Bogat sadržaj po alatu** (ne goli alat): how-to koraci + formula/metodologija + 2–3 primjera + FAQ. Min ~600–1000 riječi korisnog teksta po money-pageu. **Ovo je razlog zašto Korak 3 propisuje sadržajne blokove.**
3. **Obavezne stranice:** About (pravi autor + misija), Contact (pravi email), **Privacy Policy** (mora spominjati kolačiće/AdSense), Terms. Bez Privacy Policy = automatsko odbijanje.
4. **15–25 kvalitetnih indeksiranih stranica** prije prijave, ne 3.
5. **Malo organskog prometa** prije prijave (par tjedana indeksacije) pomaže.
6. Bez drugog oglasnog koda, bez copyright materijala, originalne slike/ikone.
7. **Redoslijed:** lansiraj Val 1 (5–8 alata) + About/Privacy/Contact → indeksiraj → sačekaj 2–4 tj → prijavi AdSense → tek onda ubacuj oglase.

---

## 5. Postavljanje i optimizacija oglasa (bez ubijanja rankinga)
- **Placement:** 1 oglas ispod alata (nakon što je korisnik dobio rezultat), 1 in-content između sekcija, 1 sidebar (samo desktop). **Nikad iznad H1 ili alata.**
- **Lazy-load** sve oglase (IntersectionObserver) → CWV (LCP/CLS) ostaje zelen.
- **Rezerviraj visinu** ad kontejnera (fiksni min-height) → **CLS = 0**.
- **Ručni slotovi > Auto Ads** na početku (Auto Ads znaju ubaciti oglas iznad alata i srušiti UX/CWV).
- Max ~3 oglasa po stranici dok je nova; skaliraj tek kad promet raste.
- Prati **RPM po stranici** u AdSense/GA4 → gasi loše, jačaj money-pageove.

---

## 6. DEVELOPMENT — konkretan setup

### 6.1 Repo struktura (Eleventy)
```
adsense-tools/
├─ src/
│  ├─ _includes/ layout.njk, header, footer, ad-slot, faq, related, author
│  ├─ _data/ site.json, tools.json (svih 20: url, keyword, cluster, meta)
│  ├─ assets/ style.css, js/{format,clipboard,share,storage,units,canvas-chart,ads,analytics}.js
│  ├─ tools/ <slug>/index.njk + <slug>.js   (po alatu)
│  ├─ <cluster>/index.njk  (hub stranice: /fun/ /finance/ ...)
│  ├─ about.njk, contact.njk, privacy.njk, terms.njk
│  ├─ index.njk (home + all tools grid)
│  ├─ sitemap.njk (auto iz kolekcija), robots.txt, 404.html
├─ .github/workflows/deploy.yml  (build + deploy na Pages)
├─ CNAME  (custom domena)
├─ package.json (.eleventy.js)
```

### 6.2 Deploy na GitHub Pages + custom domena
1. Repo → GitHub. `.eleventy.js` output u `_site/`.
2. GitHub Action: `npm ci && npx @11ty/eleventy` → deploy `_site` na `gh-pages` (ili Pages via Actions).
3. Settings → Pages → izvor = Actions. Dodaj **custom domenu** → napiši `CNAME` file → u DNS registraru postavi `A`/`CNAME` na GitHub Pages IP-ove. Uključi **Enforce HTTPS**.
4. **Google Search Console**: verificiraj domenu (DNS TXT). Pošalji `sitemap.xml`.
5. **GA4**: dodaj tag u layout. Poveži GSC ↔ GA4.

### 6.3 Tehnički must-have (iz Koraka 1)
- `sitemap.xml` (auto) + `robots.txt` (link na sitemap).
- **JSON-LD** po alatu: `WebApplication` + `FAQPage` + `BreadcrumbList`.
- Kritični CSS inline, ostalo async. JS `defer`/ES module. Slike WebP + `loading=lazy` + alt.
- **CWV budžet:** LCP < 2.0s, CLS < 0.05, INP < 200ms (mjeri Lighthouse prije i poslije oglasa).
- Canonical URL, OpenGraph/Twitter meta (za share/CTR).
- Opcijski **PWA** (service worker) → offline + brzina + re-engagement.

### 6.4 Redoslijed gradnje (val po val, iz Koraka 2 §5)
- **Val 1 (tj 1–4):** skeleton (layout, style, moduli) + Fancy Text, Morse, UUID, Tip, Dice + About/Privacy/Contact/Terms → indeksiraj → prijavi AdSense.
- **Val 2 (mj 2–3):** Spinner Wheel, GPA, Compound Interest, Random Name, JSON, TDEE + hub stranice.
- **Val 3 (mj 3–5):** preostalih 9 + supporting how-to članci + interni linkovi.
- **Val 4 (mj 5+):** expanzijski alati po klasteru + linkbait widgeti.

---

## 7. Kako postati MAGNET ZA KLIKOVE (CTR + engagement)
- **Title za CTR** (organski CTR je ranking faktor — Korak 1): exact-match fraza + benefit ("Free, No Signup", "Instant"). Emojis oprezno.
- **Meta description** koji obećava trenutni rezultat.
- **Above-the-fold alat** koji radi u < 1s → nizak bounce, visok dwell time (user signali).
- **Rich results**: FAQ schema → PAA/rich snippet realestate = veći CTR.
- **Share/embed petlja**: svaki rezultat ima deep-link + "embed this tool" → dovodi promet i backlinkove (viralni loop).
- **Brzina** = i ranking i konverzija (manje napuštanja).
- **"Related tools"** blok → pages/session raste → više oglasnih pregleda + bolji signali.

---

## 8. RAST: linkovi i brand mentions (Korak 1, §4C + §5)
- **Embeddable widgeti** (wheel, compound interest, morse tablica): "ugradi na svoju stranicu" → svaki embed = backlink.
- **Linkbait stranice**: statistike (npr. "tipping statistics 2026"), Morse tablica, konverzijske tablice.
- **Brand mentions** (najjači AI-signal): odgovori na Redditu/forumima gdje alat rješava pitanje, kratki YouTube demo, Quora.
- **Interno linkanje** prvo (prije lova na backlinkove) — hub + cluster mesh + traffic anchori → money-pageovi.
- **Digital PR**: ponudi alat kao resurs relevantnim blogovima (fitness/edu/dev).

---

## 9. KPI-jevi i reaktivni SEO ritam (Korak 1, Faza E)
**Tjedno (30 min u GSC):**
- Compare zadnjih 28 dana vs prethodnih → koje stranice rastu/padaju.
- Pale stranice → refresh (bolji primjeri, novi datum) → Request Indexing.
- Rastuće → dodaj interne linkove, proširi klaster.
- Nove PAA prilike → dodaj FAQ/how-to.

**Mjesečno:** RPM po stranici, CWV audit, pruniraj/spoji tanke stranice (sitewide penalty rizik), plan sljedećeg vala.

**Sjeverne zvijezde:** organske sesije/mj · indeksirane stranice · money-page pozicije · AdSense RPM · prihod/mj.

---

## 10. Rizici i iskreni expected value
| Rizik | Ublažavanje |
|---|---|
| AdSense odbijanje | Bogat sadržaj + obavezne stranice + custom domena (§4) |
| Sandbox / spor start | EASY alati prvo, konzistentna izvedba, strpljenje 6+ mj |
| Divovi ojačaju | Long-tail + klaster autoritet + brzina; izbjegnut head-to-head |
| Google algo update | Diversificiran portfelj (7 klastera), bez black-hat |
| Nizak RPM fun-toolova | Miks s finance/dev money-pageovima + premium mreža na skali |
| Ovisnost o jednom alatu | 20 alata → nijedan nije single point of failure |

**Iskren zaključak:** uz dobru i dosljednu izvedbu, realistična meta je **~250k sesija/mj i ~$2k/mj (AdSense) do mj 12–18**, te **~450k sesija/mj i $3.5k–9k/mj do mj 24** (viši kraj s prelaskom na premium mrežu). Optimistično dvogodišnje: **$12k–19k/mj**. Pesimistično (spora izvedba/loš niz updateova): $300–800/mj. Downside je ograničen (nizak trošak: domena + vrijeme), upside je velik i evergreen.

---

## 11. PRVIH 90 DANA — akcijski plan
1. **Tj 1:** registriraj custom domenu · repo + Eleventy skeleton · layout/style/JS moduli · GA4 + GSC.
2. **Tj 2:** izgradi Val 1 alate (Fancy Text, Morse, UUID, Tip, Dice) s punim sadržajnim blokovima.
3. **Tj 3:** About/Privacy/Contact/Terms · sitemap/robots/schema · deploy · Request Indexing svih.
4. **Tj 4:** 2–4 tj indeksacije; dodaj po 1 how-to članak/alat; interni linkovi.
5. **Tj 5–6:** **Prijavi AdSense.** Počni Val 2 (Spinner, GPA, Compound Interest, JSON, TDEE, Random Name).
6. **Tj 7–10:** hub stranice + cluster mesh linkovi · prvi embeddable widget (wheel) · Reddit/forum mentions.
7. **Tj 11–12:** Val 3 start · prvi GSC reaktivni ciklus · postavi oglase (nakon odobrenja) uz CWV provjeru.

---

### TL;DR (cijeli projekt)
Statična stranica s 20 client-side action-toolova (koje AI Overview ne dira), odabranih na pravim Keyword Planner + SERP podatcima gdje divovi ne drže lokot, posloženih u 7 topical-authority klastera, s vrhunskim CWV i E-E-A-T signalima. Realistična meta: **~250–450k organskih sesija/mj i $2k–9k/mj** unutar 12–24 mj (s premium ad mrežom optimistično dvoznamenkasto tisuće/mj). Preduvjet #1: proći AdSense odobrenje (bogat sadržaj + custom domena + obavezne stranice). Igra je evergreen i compound — spor start, ali raste sam.
