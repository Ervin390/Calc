# Korak 1 — SEO Master Dokument

**Izvor znanja i istine za izgradnju statične tool/kalkulator stranice koja organski rangira #1 i monetizira se preko Google AdSense.**

Ovaj dokument je sinteza 4 videa vodećih SEO autoriteta (2024–2026). Sve tvrdnje su izvučene iz transkripata (`research/transcripts/*.clean.md`) i preformulirane za NAŠ slučaj: statična HTML/CSS/JS stranica na GitHub Pages, engleski jezik, cilj = maksimalna organska posjećenost + AdSense zarada.

---

## 0. Izvori (transkribirano i analizirano)

| # | Video | Kanal | Objava | Views | Fokus koji smo uzeli |
|---|-------|-------|--------|-------|----------------------|
| V1 | How I Rank #1 on Google in 3 Minutes | Jesse Cunningham | 2024-01 | 155K | Indeksacija, velocity, refresh, slike, listicle |
| V2 | How to Rank #1 in Google in 2026: 3-Step Playbook | Surfer Academy (Matt Kenyon) | 2026-02 | 44K | Intent, format-match, E-E-A-T, topical authority, internal linking |
| V3 | 4 Steps to Rank #1 in Google (2026 SEO Plan) | Nathan Gotch | 2024-11 | 198K | On-page eksploatacija konkurencije, engagement triggeri, klasteri, linkbait |
| V4 | SEO in 2026: How I'd Rank in the AI Era | Ahrefs | 2026-03 | 53K | **AI-era: action queries = zlatna žila za alate**, brand mentions, query fanout |

---

## 1. ⭐ GLAVNI UVID — zašto baš tool/kalkulator stranica pobjeđuje u 2026 (V4)

> Ahrefs istraživanje: kad se pojavi AI Overview, #1 rezultat gubi **58% klikova** (bilo 35% prije godinu dana). Informativni sadržaj krvari.

**ALI** — postoji cijela kategorija upita koju AI Overview **ne dira**:

- `mortgage calculator`, `backlink checker`, `word counter`, `snow removal service`, `username generator`…
- Google zna da korisnik treba **KLIKNUTI i OBAVITI RADNJU** — sama informacija ga ne zadovoljava. Zato AI Overview za te upite **ne postoji** i klik ide na organski rezultat.

Suprotno tome, čisto informativni upiti (`what is a mortgage`, `how to calculate BMI`, `what is compound interest`) → AI Overview pojede klik.

### Litmus test za SVAKI keyword koji razmatramo (obavezno):
> **"Može li AI u potpunosti zadovoljiti korisnika za ovaj upit samo tekstom?"**
> - DA → AI Overview pojede klik → **preskačemo** (osim kao pomoćni članak u klasteru).
> - NE (korisnik mora nešto izračunati / generirati / provjeriti / konvertirati) → **ciljamo agresivno**. To su naši "money pages".

**Modifikatori koji označavaju action-query (naša ciljna skupina):**
`calculator`, `generator`, `converter`, `counter`, `checker`, `maker`, `formatter`, `tester`, `editor`, `tool`, `simulator`, `analyzer`.

Ovaj uvid je razlog zašto cijeli projekt ima smisla: **gradimo hrpu malih action-tool stranica koje su strukturno imune na AI Overview kanibalizaciju.**

---

## 2. Mindset / realne provjere prije nego bilo što napravimo (V2)

Matt Kenyon (10+ god. SEO) daje 3 provjere koje direktno oblikuju našu strategiju:

1. **Ne juri ultra-kompetitivne termine koje divovi drže godinama/desetljećima.** Za novu stranicu to je bacanje resursa. → *Naša direktiva: biramo keyworde gdje SERP NIJE zaključan od DA90+ divova (calculator.net, omnicalculator, rapidtables…). Tražimo pukotine.*
2. **Rangirati #1 je pola posla; ostati #1 je trajni rad.** Nakon vrha imaš metu na leđima. → *Planiramo kontinuirani refresh (vidi Faza E).*
3. **Ne moraš rangirati #1 za sve.** Najteži dio SEO-a nije izvedba nego **prioritizacija.** → *Zato Korak 2 rangira 20 alata po realnoj šansi, ne po golom volumenu.*

> Nitko ne može GARANTIRATI #1. Ono što možemo: stvoriti **maksimalan broj pobjedničkih uvjeta** da damo sebi najveću moguću šansu. To je cijela filozofija ovog dokumenta.

---

## 3. Kako Google rangira 2026 — objedinjeni model (V2+V3+V4)

Rangiranje = zbroj signala u 4 sloja. Za našu tool stranicu svaki sloj se konkretno adresira:

| Sloj | Što Google gleda | Naš odgovor na tool stranici |
|------|------------------|------------------------------|
| **A. Relevantnost / Intent** | Poklapa li stranica točnu namjeru upita i format SERP-a | Sam alat na vrhu = 100% intent match za action-query |
| **B. Kvaliteta / E-E-A-T** | Iskustvo, ekspertiza, autoritet, povjerenje | Radni alat + metodologija + autor + datumi + primjeri |
| **C. Topical authority** | Ima li stranica ekosistem povezanog sadržaja | Klasteri: hub + varijante alata + how-to + FAQ, interno linkani |
| **D. Off-site trust** | Backlinkovi + **brand mentions** (2026 najjači AI-signal) | Linkbait stat/embed stranice, biti "onaj alat" koji ljudi linkaju |

Ključne promjene 2026 koje ugrađujemo:
- **Experience (prvo E) je sada najteže ponderiran** faktor E-E-A-T (V2). Signali: originalni screenshotovi, korak-po-korak iz stvarnog rada, brojke iz slučajeva, osobne bilješke, **pravi autor s bylineom i fotkom**, datum objave + zadnjeg ažuriranja, TOC, TLDR.
- **Brand mentions > backlinkovi/DR** za vidljivost u AI Overviews (V4). Query fanout: AI razbije upit na desetke podupita i spaja odgovore iz stranica koje rangiraju za njih.
- **Nema idealnog word counta** (V2). Pitanje nije "koliko dugo" nego "što korisnik treba znati i jesam li to pokrio potpuno".

---

## 4. PLAYBOOK — faza po faza

### FAZA A — Odabir keyworda i intenta (temelj Koraka 2)

1. **Litmus test iz §1** na svaki kandidat keyword (može li AI zadovoljiti? → ne → uzmi).
2. **Izgradnja liste** (V4 trik, mi to radimo preko Google Keyword Plannera): unesi široke seedove niše → matching terms → filtriraj modifikatorima (`calculator`, `converter`, `generator`…) → sve su to action-upiti za besplatne alate.
3. **Proučit SERP za svaki** (V2): izguglaj termin i gledaj:
   - Tko rangira? Ako je top 5 = DA90+ divovi (calculator.net, omni, rapidtables) → **teško, deprioritiziraj** osim ako imaju vidljivu slabost.
   - Koji je **format**? (samostalni alat? listicle? članak s embed alatom?) → mi moramo dati isti format + bolji.
   - Koji je **intent**? Ako je miješan (V2), pokrivamo dominantni + ponudimo "buffet".
4. **Traži pukotine** (V3 "exploit competitors"): loši URL-ovi, title bez exact-match fraze, tanak sadržaj, ružan/spor alat, nema mobilne verzije, zastarjelo. Svaka slabost = naš ulaz.

### FAZA B — Izgradnja savršene tool stranice ("money page")

**On-page temelj (V3 — spoon-feed algoritam kao jednogodišnjaku):**
- **URL** sadrži cijelu keyword frazu: `/percentage-calculator/` (ne `/tools/p1`). Ovo je najjači URL-signal.
- **Title tag** = **exact match** primarne fraze na početku (leaked Google "title match score"). Npr. `Percentage Calculator - Fast & Free`. Bez telefona/šuma.
- **H1** vidljiv korisniku, sadrži frazu.
- **Prvi paragraf** sadrži primarnu frazu prirodno u prvoj rečenici.
- **Meta description** s frazom (mali faktor, ali piše za CTR jer je **organski CTR dokazani faktor** — V3).
- **Topic coverage** > keyword stuffing (V3): pokrij svaku podtemu potpuno (koliko god rečenica treba).

**Format-match (V2):** za action-query format je "interaktivni alat + kratko objašnjenje". Zato:
- Alat je **iznad pregiba (above the fold)**, radi instant, bez scrolla, bez logina. (V3: većina ljudi ne scrolla; 80% čita samo naslov → alat mora biti prva stvar.)
- Ispod alata: kako se koristi (koraci), formula/logika, 2-3 primjera s brojkama, FAQ (iz People Also Ask), povezani alati.

**Engagement trigger (V3):** sam interaktivni alat JE engagement trigger — masivno diže dwell time i interakciju (Google koristi user signale). Dodatno: kopiranje rezultata, "share", presetovi.

**E-E-A-T na tool stranici (V2):**
- Pravi **autor** (byline + kratki bio + fotka), `Published` + `Last updated` datum.
- **Metodologija**: "Kako ovaj kalkulator računa" (formula, izvor, edge-caseovi) = dokaz ekspertize.
- Originalni screenshotovi / primjeri / mali case ("izračunali smo za X, evo rezultata").
- TLDR + Table of Contents za duže stranice.

**Brzina (kritično za statičnu stranicu + AdSense + CWV):** vidi Faza D.

### FAZA C — Topical authority i arhitektura (V2 + V3, srce dugoročnog rankinga)

Model "money page u centru mreže povjerenja":

```
            [HUB: /calculators/ ]
                    |
   ┌────────────┬───┴────────┬─────────────┐
[percentage-   [percentage-  [percentage-   [what is percentage  ← how-to (info)
 calculator]    increase-     of-a-number]    change - blog]
 (money)        calculator]   (money)          |
   │  ▲            (money)                      └─(internal link ↑ na money page)
   └──┴── međusobno interno linkanje (cluster) ──┘
```

- **Klaster oko svake teme** (V2): ne jedna stranica, nego ekosistem. Google bira stranicu koja ima *cijeli ekosistem* pokriven, ne usamljenu svježu stranicu.
- **Supporting informativni članci** (V3, iz People Also Ask): "what is percentage change", "how to calculate percentage increase". DA, njih AI Overview dijelom pojede — ALI oni **hrane klaster** i **prosljeđuju autoritet interno na money page** (alat).
- **Interno linkanje = najmoćnija riječ u SEO-u** (V2): svaki backlink koji uhvati bilo koja pomoćna stranica prosljeđuje autoritet **prema gore, na money page** kroz interne linkove. "Rising tide lifts the whole ship."
- **Redoslijed (V2, važno):** prvo izgradi topical authority (klaster + interni linkovi), TEK ONDA lovi backlinkove.

### FAZA D — Indeksacija i tehnika (V1, prilagođeno statičnoj GitHub Pages stranici)

4 obavezna alata od dana 1 (V1): **Google Search Console, Google Analytics (GA4), sitemap.xml, provjera indeksacije.**

Za statičnu stranicu konkretno:
- `sitemap.xml` (auto-generiran build skriptom) + `robots.txt` s poveznicom na sitemap.
- Nakon objave/izmjene stranice → **GSC → URL Inspection → Test Live URL → Request Indexing** (V1: "zamoli Google da reindeksira"). Ubrzava first-index dramatski.
- **Velocity**: objavljuj konzistentno; svježina + revidiranje = signal.
- **Slike** (V1): 16:9 (Google Discover to voli), konvertiraj u **WebP**, **preimenuj file** u opisno ime, **alt text na svaku sliku**.
- **Core Web Vitals** (naša prednost — statična stranica je brza po defaultu): inline kritični CSS, lazy-load ne-kritičnog, bez teških frameworka, alat radi na vanilla JS. **AdSense skripte odgodi/lazy-load** da ne ubiju CWV (detalji u Koraku 4).
- **JSON-LD schema** (statički ubačen): `WebApplication` / `SoftwareApplication` za alat, `FAQPage` za FAQ, `BreadcrumbList`. Bez servera radimo sve kao statički `<script type="application/ld+json">`.

### FAZA E — Održavanje i rast: reaktivni SEO (V1)

Ovo je ono što, po Jesseu, razdvaja stranice koje rastu od onih koje stagniraju:
- **GSC → Compare** (npr. zadnjih 28 dana vs prethodni period) → **Pages** → sortiraj po razlici klikova.
  - Stranica **pala** ("otišla u ponor") → refresh je: bolji featured image, jači intro, novi primjeri, ažuriraj datum → Request Indexing.
  - Stranica **raste** → dodaj joj interne linkove, proširi klaster oko nje.
- **Prune/fix tanak sadržaj** (V1 kritično): loše/tanke stranice povlače cijelu domenu dolje = **sitewide penalty**. Bolje 20 odličnih tool stranica nego 100 tankih. Svaku tanku ili popravi ili makni.
- **Refresh ciklus**: iz sitemapa nađi stranice starije od X, dodaj slike/primjere, osvježi copy i datum.

---

## 5. AI-era sloj (V4 + V2) — biti citiran, ne samo rangiran

Iako action-toolove AI Overview ne dira, oko njih gradimo brand koji AI voli citirati (donosi mentions + backlinkove):
- **Brand mentions su najjači AI-visibility signal** (V4, jači od backlinkova/DR). Cilj: da nas ljudi spominju kao "taj besplatni [X] alat".
- **Query fanout**: AI razbije "best percentage calculator" na podupite; ako smo spomenuti na listicle/comparison/review stranicama koje rangiraju za te podupite → ulazimo u odgovor.
- **Gdje AI vuče izvore**: Google AIO ← YouTube/Reddit/Quora; ChatGPT ← publisheri/news; Perplexity ← niche/regionalne. → Taktika: kratki YouTube demo alata, Reddit/forum odgovori gdje je alat koristan, gostujući spomeni.
- **Linkbait za mentions** (V3): stranice sa statistikama ("50 X statistics for 2026") i **embeddable widgeti** ("ugradi naš kalkulator na svoju stranicu" → svaki embed = backlink) privlače linkove; "what time is it" tip sadržaja ne privlači.

---

## 6. AdSense-specifičan sloj (most prema Koraku 4)

Napetost koju moramo balansirati: oglasi = zarada, ali loše postavljeni oglasi ubijaju CWV i UX → padne ranking → padne zarada. Pravila:
- **Sadržaj mora biti stvarno koristan i originalan** (AdSense politika "low value / thin content" je #1 razlog odbijanja utility stranica). Naš alat + metodologija + FAQ + primjeri = prolazna vrijednost.
- **Custom domena** (imamo je) znatno diže šansu odobrenja vs `*.github.io`.
- Oglasi **ispod alata i unutar teksta**, nikad ne guraju alat ispod pregiba, nikad iznad H1. Lazy-load AdSense da CWV ostane zelen.
- Detaljna monetizacijska mehanika, RPM procjene i placement → **Korak 4**.

---

## 7. PER-PAGE launch checklist (zalijepi za svaki novi tool)

- [ ] Keyword prošao litmus test (§1): AI ne može zadovoljiti upit.
- [ ] SERP provjeren: nije zaključan od DA90+ divova bez slabosti.
- [ ] URL = `/exact-keyword-phrase/`.
- [ ] Title: exact-match fraza na početku, bez šuma, pisano za CTR.
- [ ] H1 vidljiv, sadrži frazu; primarna fraza u 1. rečenici.
- [ ] Meta description s frazom, privlačan za klik.
- [ ] **Alat radi instant, iznad pregiba, bez scrolla, mobilno savršen.**
- [ ] Ispod: kako koristiti + formula/metodologija + 2-3 primjera + FAQ (iz PAA).
- [ ] Autor (byline+bio+fotka), Published + Last updated datum.
- [ ] JSON-LD: WebApplication + FAQPage + BreadcrumbList.
- [ ] Slike 16:9, WebP, opisni filename, alt text.
- [ ] Min. 3 interna linka na povezane alate/članke iz klastera; 1+ link natrag s hub stranice.
- [ ] Lighthouse: LCP < 2.5s, CLS < 0.1 (prije nego se dodaju oglasi i poslije).
- [ ] Sitemap ažuriran → GSC Request Indexing.

## 8. SITE-WIDE checklist

- [ ] GSC + GA4 + sitemap.xml + robots.txt postavljeni.
- [ ] Hub/kategorijske stranice s internim linkovima na sve alate.
- [ ] Svaki klaster: money tool + varijante + 2+ how-to članka, međusobno linkani.
- [ ] Nema tankih stranica (sitewide penalty rizik).
- [ ] Bar 1 linkbait asset po klasteru (statistike / embeddable widget).
- [ ] Konzistentan brand (logo, autor, o-nama, kontakt, privacy — nužno i za AdSense).

## 9. ANTI-PATTERNI (ne raditi)

- ❌ Juriti termine koje divovi drže bez vidljive slabosti (V2).
- ❌ Tanke stranice "samo da ih ima" → sitewide penalty (V1).
- ❌ Keyword stuffing umjesto potpune topic coverage (V3).
- ❌ Mit o idealnom word countu (V2) — piši koliko treba da pokriješ, ni riječ više.
- ❌ Telefon/šum u title tagu (V3) — kvari CTR.
- ❌ Alat guran ispod pregiba iza zida teksta (kvari intent-match i dwell time).
- ❌ Oglasi iznad alata / agresivan layout koji ruši CWV i UX.
- ❌ Loviti backlinkove prije nego postoji topical klaster (V2 redoslijed).

---

## 10. Kako ovo primjenjujemo na STATIČNU GitHub Pages stranicu

Ograničenja (nema servera, samo HTML/CSS/JS) i kako ih rješavamo:

| Potreba | Standardno (server) | Naše statično rješenje |
|---------|---------------------|------------------------|
| Sam alat | backend izračun | **100% client-side JS** (idealno — brzo, indeksabilno) |
| Schema | dinamički | statički `<script type="application/ld+json">` po stranici |
| Sitemap | plugin | build skripta generira `sitemap.xml` |
| Templating | CMS | statički generator / šablone + build (npr. Eleventy ili čisti HTML partiali) |
| Ažuriranje datuma | CMS | u build/front-matteru |
| Analytics/GSC | isto | GA4 tag + GSC verifikacija preko HTML file/DNS |

Zaključak: statična stranica je **prednost** za ovaj model — savršen CWV, jeftin/besplatan hosting, alat je čisti client-side JS koji Google lako indeksira, a AdSense-u treba samo kvalitetan sadržaj + custom domena.

---

### TL;DR (jedna rečenica)
Gradimo klastere brzih client-side action-toolova (koje AI Overview ne dira), svaki savršeno intent/format-matchan i on-page optimiziran, povezane internim linkovima u topical authority mrežu, održavane reaktivnim GSC ciklusom, i monetizirane AdSenseom bez žrtvovanja brzine — birajući isključivo keyworde s dobrim volumenom gdje divovi NE drže zaključan SERP.

*Sljedeće → Korak 2: Keyword Planner istraživanje + odabir 20 alata s najboljom rankability/volumen/revenue kombinacijom.*
