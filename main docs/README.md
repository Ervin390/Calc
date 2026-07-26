# AdSense Tools — projekt istraživanja i plana

Statična stranica s besplatnim online alatima (kalkulatori / generatori / konverteri) koja organski rangira na Googleu i monetizira se preko Google AdSense. Hosting: GitHub Pages + custom domena. Jezik sadržaja: engleski (SAD). Rast: 100% organski.

## Strateška teza (u jednoj rečenici)
AI Overview **ne kanibalizira "action" upite** (calculator/generator/converter) jer korisnik mora *nešto napraviti* — pa ti upiti i dalje dobivaju organske klikove. Gradimo klastere brzih client-side alata u nišama gdje divovi **ne** drže lokot.

## Dokumenti (čitaj ovim redom)
| # | Dokument | Što sadrži |
|---|----------|-----------|
| 1 | [docs/01_SEO-MASTER.md](docs/01_SEO-MASTER.md) | Sinteza 4 SEO videa → izvor istine za izgradnju SEO mašine (playbook, checkliste, anti-patterni) |
| 2 | [docs/02_KEYWORDS-20-TOOLS.md](docs/02_KEYWORDS-20-TOOLS.md) | 20 odabranih alata na PRAVIM podatcima: volumen, CPC, konkurencija, long-tailovi, 7 klastera |
| 3 | [docs/03_TOOL-SPECS.md](docs/03_TOOL-SPECS.md) | Funkcionalna specifikacija svakog alata (logika/formula/UI/rubni slučajevi) za statični hosting |
| 4 | [docs/04_TRAFFIC-DEV-ADSENSE.md](docs/04_TRAFFIC-DEV-ADSENSE.md) | Procjena prometa/rankinga, dev setup + deploy, kompletni AdSense monetizacijski playbook |

## Podatci (dokazni materijal)
- `research/transcripts/` — transkripti 4 videa (`*.clean.md`) + metapodaci.
- `research/keywords/keywords_raw.csv` — **71.712** keyworda iz Google Keyword Plannera (volumen, CPC, konkurencija).
- `research/keywords/tool_profiles.json` — per-tool profili (glava + long-tailovi).

## Izvori istraživanja
- **SEO znanje:** Jesse Cunningham, Surfer Academy (Matt Kenyon), Nathan Gotch, Ahrefs (transkribirano i analizirano).
- **Keyword podatci:** Google Ads Keyword Planner API (live, geo=US, en).
- **Rankability:** analiza živih Google SERP-ova za 41 kandidata.

## Odabranih 20 alata (sažetak)
Fancy Text · Spinner Wheel · GPA · Compound Interest · Random Name · JSON Formatter · TDEE · Morse Code · Dice Roller · Amortization · Date · Age · UUID · Macro · BMR · Fraction · Standard Deviation · Fantasy Name · Character Counter · Tip.

**Flagshipovi:** Fancy Text (1M/mj, EASY) · Spinner Wheel (1.22M/mj) · GPA ($4.10 CPC) · JSON Formatter ($11.47 CPC) · Random Name ($9.73 CPC).

## Status
✅ Istraživanje i plan (Koraci 1–4) gotovi. Sljedeće: build (Eleventy skeleton → Val 1 alati → AdSense prijava). Vidi `04_TRAFFIC-DEV-ADSENSE.md` §11 (plan prvih 90 dana).
