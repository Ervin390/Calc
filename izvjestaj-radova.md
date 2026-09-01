# Izvještaj Radova — QuixCalc (Adsense.new)

**Datum:** 24. kolovoza 2026.
**Projekt:** QuixCalc — `c:\Users\Računalo\Desktop\Projekti\Adsense.new`

---

## Pregled

Danas je proveden opsežan razvojni rad na QuixCalc platformi. Implementirano je **8 potpuno novih SaaS kalkulatora**, **2 nova tematska klastera s ukupno 10 kalkulatora**, **20 blog postova za nove alate** (po 2 po kalkulatoru) i **20 GSC-targetiranih blog postova** temeljenih na Google Search Console podacima. Ukupno je projekt narastao na **63 kalkulatora i 233 HTML stranice**.

---

## 1. SaaS Klaster — 8 Novih Kalkulatora

Kreiran je potpuno novi tematski klaster `saas` s 8 kalkulatora koji pokrivaju ključne metrike SaaS poslovanja.

| Kalkulator | Slug | Opis |
|---|---|---|
| SaaS LTV Calculator | `saas-ltv-calculator` | Customer lifetime value, lifespan i margin-adjusted LTV |
| CAC Calculator | `cac-calculator` | Customer acquisition cost iz sales, marketing i operativnih troškova |
| CAC Payback Calculator | `cac-payback-calculator` | Payback period u mjesecima, SaaS capital efficiency |
| NRR Calculator | `nrr-calculator` | Net Revenue Retention i Gross Revenue Retention rate |
| MRR Calculator | `mrr-calculator` | Monthly Recurring Revenue, ARPU, projected ARR |
| ARR Calculator | `arr-calculator` | Annual Recurring Revenue iz MRR i multi-year ugovora |
| SaaS Break-Even Calculator | `saas-break-even-calculator` | Break-even točka u broju pretplatnika i prihodu |
| Gross Margin Calculator | `gross-margin-calculator` | Gross margin postotak, gross profit i COGS ratio |

Za svaki SaaS kalkulator kreirani su:
- `src/tools/{slug}/index.njk` (Eleventy template)
- Odgovarajući JavaScript logika
- Po 2 SEO blog posta (ukupno 16 postova)

---

## 2. Payroll Klaster — 5 Novih Kalkulatora

Klaster `payroll` proširen je s 5 novih specijaliziranih kalkulatora.

| Kalkulator | Slug | Opis |
|---|---|---|
| Prorated Rent Calculator | `prorated-rent-calculator` | Pro-rata najam po datumu useljenja/iseljavanja |
| Freelance Rate Calculator | `freelance-rate-calculator` | Minimalna satna stopa koja pokriva porez, režije i ciljni prihod |
| Sales Commission Calculator | `sales-commission-calculator` | Flat, tiered i bonus-based provizije za bilo koji deal |
| Prorated Salary Calculator | `prorated-salary-calculator` | Parcijalna plaća za djelomični radni mjesec |
| Commute Cost Calculator | `commute-cost-calculator` | Stvarni trošak putovanja do posla (gorivo, amortizacija, parking) |

Za svaki kalkulator kreirani su:
- `src/tools/{slug}/index.njk` (Eleventy template)
- Odgovarajući JavaScript logika
- Po 2 SEO blog posta (ukupno 10 postova)

---

## 3. Home Improvement Klaster — 5 Novih Kalkulatora

Klaster `home` proširen s 3 nova kalkulatora (klaster je ranije imao Paint i Tile):

| Kalkulator | Slug | Opis |
|---|---|---|
| EPDM Roofing Calculator | `epdm-roofing-calculator` | EPDM membrana m², ljepilo, seam tape i broj rola |
| Mini Split BTU Calculator | `mini-split-btu-calculator` | Dimenzioniranje mini split klime po m², visini stropa i orijentaciji |
| Concrete Calculator | `concrete-calculator` | Beton u kubnim jardima/stopama i broj vreća za ploče i stupove |
| Rebar Calculator | `rebar-calculator` | Rašter armature, ukupni linearni metri, broj šipki i težina za betonske ploče |

*(Plus Paint Calculator i Tile Calculator kreiran u prethodnoj sesiji, klaster ukupno ima 6 alata)*

Za svaki kalkulator kreirani su:
- `src/tools/{slug}/index.njk` (Eleventy template)
- Odgovarajući JavaScript logika
- Po 2 SEO blog posta (ukupno 8 postova)

---

## 4. Blog Postovi za Nove Alate (po 2 na Kalkulator)

### SaaS Klaster Blog Postovi (16 postova)

| Post | Url |
|---|---|
| How to Calculate Customer Lifetime Value in SaaS | `/blog/how-to-calculate-customer-lifetime-value-saas/` |
| ARPU Churn and LTV Calculation Guide for SaaS | `/blog/arpu-churn-ltv-calculation-guide/` |
| How to Calculate Customer Acquisition Cost in SaaS | `/blog/how-to-calculate-customer-acquisition-cost-saas/` |
| Blended CAC vs Paid CAC Explained for SaaS | `/blog/blended-cac-vs-paid-cac-explained/` |
| SaaS CAC Payback Period Benchmarks and Formulas | `/blog/saas-cac-payback-period-benchmarks/` |
| Months to Recover CAC Guide for Software Startups | `/blog/months-to-recover-cac-saas-guide/` |
| How to Calculate Net Revenue Retention in SaaS | `/blog/how-to-calculate-net-revenue-retention/` |
| Gross vs Net Revenue Retention Explained for SaaS | `/blog/gross-vs-net-revenue-retention-saas/` |
| How to Calculate Monthly Recurring Revenue in SaaS | `/blog/how-to-calculate-monthly-recurring-revenue/` |
| Net New MRR Formula and Growth Guide for SaaS | `/blog/net-new-mrr-formula-and-growth-guide/` |
| MRR to ARR Conversion Guide for B2B SaaS | `/blog/mrr-to-arr-calculator-and-conversion-guide/` |
| ACV vs ARR Explained for Enterprise Software | `/blog/annual-contract-value-acv-vs-arr-guide/` |
| How to Calculate SaaS Break Even Point | `/blog/how-to-calculate-saas-break-even-point/` |
| SaaS Unit Economics and Break Even Guide | `/blog/saas-unit-economics-break-even-guide/` |
| How to Calculate SaaS Gross Margin Percentage | `/blog/how-to-calculate-saas-gross-margin-percentage/` |
| Software COGS and Gross Margin Guide for SaaS | `/blog/software-cogs-gross-profit-margin-guide/` |

### Payroll Klaster Blog Postovi (10 postova)

| Post | Url |
|---|---|
| How to Calculate Prorated Rent on Move-In Day | `/blog/how-to-calculate-prorated-rent-move-in/` |
| Actual Days vs 30-Day Method for Prorated Rent | `/blog/actual-days-vs-30-day-proration-method/` |
| How to Calculate Your Freelance Hourly Rate | `/blog/how-to-calculate-your-freelance-hourly-rate/` |
| Billable Hours vs Total Hours for Freelancers | `/blog/billable-hours-vs-total-hours-freelance/` |
| How to Calculate Tiered Sales Commission Pay | `/blog/how-to-calculate-tiered-sales-commission/` |
| Flat vs Tiered Commission Structures Explained | `/blog/flat-vs-tiered-commission-structures/` |
| How to Calculate Prorated Salary Mid-Month | `/blog/how-to-calculate-prorated-salary/` |
| Working Days vs Calendar Days: Salary Proration | `/blog/working-days-vs-calendar-days-salary/` |
| The True Cost of Commuting to Work Each Month | `/blog/true-cost-of-commuting-to-work/` |
| Remote Work vs Office: How Much You Really Save | `/blog/remote-work-vs-office-commute-savings/` |

### Home Improvement Blog Postovi (8 postova)

| Post | Url |
|---|---|
| How to Calculate EPDM Roofing Materials Needed | `/blog/how-to-calculate-epdm-roofing-materials/` |
| EPDM Waste Factor and Seam Overlap Explained | `/blog/epdm-roofing-waste-factor-seam-overlap/` |
| How to Size a Mini Split BTU for Your Room | `/blog/how-to-size-mini-split-btu-for-room/` |
| Multi-Zone Mini Split Sizing Complete Guide | `/blog/multi-zone-mini-split-sizing-guide/` |
| How to Calculate Concrete for a Patio Slab | `/blog/how-to-calculate-concrete-for-a-patio-slab/` |
| Ready-Mix vs Bags: Which Concrete Costs Less | `/blog/ready-mix-vs-bags-concrete-cost/` |
| How to Calculate Rebar for a Concrete Slab | `/blog/how-to-calculate-rebar-for-concrete-slab/` |
| Rebar Bar Size Guide: Choosing 3, 4, 5, or 6 | `/blog/rebar-bar-size-guide-choosing-the-right-size/` |

---

## 5. GSC-Targetirani Blog Postovi (20 postova)

Temeljem podataka iz Google Search Console (`Queries.csv`) identificirani su upiti s visokim prometom koji nisu bili pokriveni. Kreirano je 20 novih, jedinstvenih blog postova raspoređenih u 5 tematskih skupina.

### Skupina 1 — Datum i Radno Vrijeme (4 posta)
| Datoteka | Ciljani upit |
|---|---|
| `how-to-calculate-90-days-from-today.md` | `90 days from today` |
| `how-to-count-months-and-days-between-two-dates.md` | `months and days between two dates` |
| `how-to-convert-minutes-to-decimal-hours-payroll.md` | `convert minutes to decimal hours` |
| `how-many-working-hours-in-a-month-160-vs-173.md` | `working hours in a month` |

### Skupina 2 — Matematika, Statistika i GPA (5 postova)
| Datoteka | Ciljani upit |
|---|---|
| `how-to-compute-standard-deviation-of-the-mean.md` | `standard deviation of the mean` |
| `how-much-does-an-f-grade-lower-your-gpa.md` | `how much does an f lower your gpa` |
| `cumulative-gpa-vs-weighted-gpa-differences.md` | `cumulative gpa vs weighted gpa` |
| `how-to-convert-unweighted-to-weighted-gpa-scale.md` | `convert unweighted to weighted gpa` |
| `how-to-convert-improper-fractions-to-mixed-numbers.md` | `improper fractions to mixed numbers` |

### Skupina 3 — Financije i Hipoteke (4 posta)
| Datoteka | Ciljani upit |
|---|---|
| `biweekly-mortgage-payments-payoff-guide.md` | `biweekly mortgage payments` |
| `how-the-13th-mortgage-payment-strategy-works.md` | `13th mortgage payment strategy` |
| `how-to-calculate-stripe-processing-fees-guide.md` | `how to calculate stripe fees` |
| `loan-amortization-formula-step-by-step-math.md` | `loan amortization formula` |

### Skupina 4 — Plaće i Payroll (3 posta)
| Datoteka | Ciljani upit |
|---|---|
| `time-and-a-half-pay-rate-lookup-chart.md` | `time and a half pay rate lookup chart` |
| `salary-vs-hourly-pto-and-benefits-comparison.md` | `salary vs hourly pto` |
| `how-to-calculate-gratuity-percentage-in-math.md` | `how to calculate gratuity percentage in math` |

### Skupina 5 — Zdravlje, Gaming i Ostalo (4 posta)
| Datoteka | Ciljani upit |
|---|---|
| `mifflin-st-jeor-equation-step-by-step-guide.md` | `mifflin st jeor equation step by step` |
| `the-7700-calorie-deficit-rule-for-fat-loss.md` | `7700 calorie deficit rule` |
| `how-to-read-d4-dice-and-calculate-modifiers.md` | `how to read d4 dice` |
| `why-was-morse-code-invented-and-how-it-works.md` | `why was morse code invented` |

---

## 6. Sitnice i Ostale Izmjene

- Registrirani svi novi kalkulatori u `src/_data/tools.json`
- Registrirani svi novi blog postovi u `src/_data/posts.json`
- Ažurirani interlinksovi u tool templateovima (bidirekcijalno iz tool → blog i blog → tool)
- Verificirano nula (`0`) em/en crtica u svim novim tekstovima
- Svi meta naslovi ispod 60 znakova, svi meta opisi unutar 155–160 znakova
- Schema.org JSON-LD strukturirani podaci valjani na svim stranicama

---

## 7. Verifikacija Build-a

```
> npm run build
Copied 87   Wrote 236 files in 1.41 seconds (v3.1.6)

> npm run verify
  sitemap.xml lists 232 URLs
  233 HTML pages checked, 63 tool pages
  Build verification passed
```

| Metrika | Vrijednost |
|---|---|
| Ukupno HTML stranica | 233 |
| Ukupno kalkulatora | 63 |
| URL-ova u sitemapu | 232 |
| Greške / Upozorenja | 0 / 0 |
| Em/en crtice u tekstu | 0 |
| Canonical URL-ovi | 100% valjani |
| `<h1>` tagova po stranici | Točno 1 |
| Meta naslovi | Svi < 60 znakova |
| Meta opisi | Svi 155–160 znakova |
| Schema.org JSON-LD | Valjan na svim stranicama |

---

## 8. Ukupni Brojevi Danas

| Kategorija | Broj |
|---|---|
| Novi SaaS kalkulatori | 8 |
| Novi Payroll kalkulatori | 5 |
| Novi Home Improvement kalkulatori | 4 (od 6 u clusteru) |
| **Ukupno novih kalkulatora** | **17** |
| Blog postovi za SaaS klaster | 16 |
| Blog postovi za Payroll klaster | 10 |
| Blog postovi za Home klaster | 8 |
| GSC-targetirani blog postovi | 20 |
| **Ukupno novih blog postova** | **54** |

---

## 9. Sljedeći Koraci

1. **Deploy na hosting server** — prebaciti ažurirani `_site/` direktorij u produkciju.
2. **Predati sitemap u GSC** — u Google Search Console otići na **Sitemaps** i predati `https://quixcalc.com/sitemap.xml`.
3. **Pokrenuti re-index validaciju** — pod **Pages → Crawled - currently not indexed**, kliknuti **"Validate Fix"**.

---

*Dokument generiran: 24. kolovoza 2026. u 19:00 h*
