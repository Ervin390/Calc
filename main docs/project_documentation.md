# QuixCalc: Project Architecture & Development Overview

This document summarises the architecture, SEO setup and launch state of the 20-tool web portal at **quixcalc.com**. It is written so another engineer or model can pick the project up without reading every file.

> Renamed from the working title "QuickTools" to **QuixCalc** on 26 July 2026, when quixcalc.com was purchased.

## 1. Project Goal & Value Proposition
Build a fast, ad-supported portal of 20 free utility tools (calculators, formatters, generators) that wins long-tail organic search. The strategic bet, taken from `01_SEO-MASTER.md`, is that *action queries* ("tip calculator", "uuid generator") are structurally resistant to AI Overview click cannibalisation, because the searcher has to click and do something. Informational queries are not.

## 2. Tech Stack
- **Static site generator:** Eleventy 3 (`.eleventy.js`), Nunjucks templates.
- **Styling:** vanilla CSS with a design-token system (`src/assets/style.css`). Light and dark themes are driven entirely by CSS custom properties on `:root` and `[data-theme="dark"]`.
- **Logic:** vanilla JavaScript, one file per tool, no framework. All computation is client side.
- **Hosting:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`), custom domain through `CNAME`.

## 3. Repository Layout
```
.eleventy.js              Eleventy config: filters, collections, transforms
package.json              build / serve / verify / check scripts
scripts/verify-build.js   pre-launch build verifier, runs in CI
src/
  _data/site.json         brand, domain, GA id, author, default OG image
  _data/nav.json          the six categories and the footer links
  _data/tools.json        single source of truth for all 20 tools
  _includes/layout.njk    the only layout: head, schema, nav, breadcrumb, footer
  _includes/tool-grid.njk toolGrid() macro, renders a category's cards
  static/                 copied to site root: CNAME, favicon.ico, ads.txt,
                          site.webmanifest, .nojekyll
  _includes/cluster.njk   clusterGuides() / clusterFooter() macros
  _includes/ad-slot.njk   adSlot() macro, inert until adsenseId is set
  _includes/critical.css  inlined in <head>, first paint needs no network
  index.njk               homepage, built from tools.json + nav.json
  embed.njk               /embed/, the embeddable-widget linkbait asset
  search-index.njk        generates /search-index.json for site search
  {fun,dev,finance,       the six category hubs
   health,math,date}/
  tools/<slug>/           index.njk + <tool>.js, published at /<slug>/
  blog/                   40 posts + blog.json directory data
  sitemap.njk             generates /sitemap.xml
  robots.njk              generates /robots.txt
  404.njk                 generates /404.html
  about|contact|privacy|terms.njk
```

## 4. Data-driven tool listing
`src/_data/tools.json` holds slug, display name, icon, card blurb, category and a `popular` flag for all 20 tools. The homepage, all six hubs and the 404 page render their card grids from it through the `toolGrid()` macro. Adding a tool means adding a directory plus one entry in that file. It is no longer possible for a tool to be silently missing from its hub, which is how five tools ended up without a category page before the rebrand.

## 5. Tool Ecosystem (20 tools, 6 clusters)
- **Fun & Random** (`/fun/`): Dice Roller, Random Name Generator, Morse Code Translator, Spinner Wheel
- **Text & Developer** (`/dev/`): JSON Formatter, UUID Generator, Character Counter, Fancy Text Generator, Fantasy Name Generator
- **Finance & Money** (`/finance/`): Compound Interest, Amortization, Tip Calculator
- **Fitness & Health** (`/health/`): TDEE, BMR, Macro Calculator
- **Math & Education** (`/math/`): GPA, Fraction, Standard Deviation
- **Date & Time** (`/date/`): Date Calculator, Age Calculator

## 6. State management (`src/assets/state.js`)
Restores a tool's inputs from the URL query string first (shared links win), otherwise from `localStorage` under a `quixcalc_state_<path>` key. Writes back on interaction.

Two behaviours matter:
- A `hydrating` flag suppresses all writes during the initial synthetic event dispatch. Without it, a first-time visitor's clean URL was immediately rewritten with default query parameters.
- URL rewrites are debounced to 250 ms because browsers rate-limit `history.replaceState` and typing fires fast.

Textarea contents are deliberately excluded from the URL to avoid over-long URLs.

## 7. SEO implementation
Everything below is emitted by `layout.njk` on every page unless noted.

- **Canonical:** self-referencing, absolute, always query-string free. This is what consolidates the shareable `?a=1&b=2` tool URLs back onto the clean URL.
- **Titles:** `title` (or `metaTitle` where the H1 is long) plus `| QuixCalc`. Held under ~60 characters.
- **Descriptions:** unique per page, under 158 characters, enforced by the verifier.
- **Open Graph and Twitter:** full set including a 1200x630 card at `/assets/og-default.png`.
- **JSON-LD**, one `@graph` per page, branching on page type:
  - always `Organization` + `WebSite`
  - tool pages: `WebApplication` with a per-category `applicationCategory`
  - blog posts: `BlogPosting` with `datePublished` / `dateModified`
  - category hubs: `CollectionPage`
  - everything else: `WebPage`
  - plus `BreadcrumbList` on every non-home page (Home › Category › Tool)
- **FAQPage** is generated automatically by the `faqSchema` transform in `.eleventy.js`, which parses the `<section class="faq">` markup. The visible FAQ is the single source of truth, so the two can never drift. Currently on 27 pages.
- **Clean URLs:** directory-style permalinks throughout. A `cleanUrls` transform strips any `/index.html` that a hand edit reintroduces, and the verifier fails the build if one survives.
- **Analytics:** GA4 `G-HJ4XCPKY84`, configured from `site.json`.
- **robots.txt** points at the sitemap and deliberately does *not* block query strings, so Google can read the canonical rather than being locked out of a URL it might still index.
- **sitemap.xml** is generated from a `sitemap` collection with per-type priority and `lastmod` from `updated` or the file date. 72 URLs.

## 8. Build verification (`npm run verify`)
Runs against `_site/` and fails on: leftover "quicktools" strings, `/index.html` links, missing or duplicate titles and descriptions, missing or query-carrying canonicals, zero or multiple `<h1>`, unparseable JSON-LD, missing OG tags, a missing analytics tag, broken internal links, sitemap/page mismatches, missing root files, and any tool directory whose JavaScript failed to copy. It runs in CI before deploy.

## 9. Current state
- 74 pages build clean, 73 in the sitemap, verifier passes.
- All 20 tools execute without console errors at 485px and at desktop width. Clipboard writes are guarded against permission rejection.
- No horizontal overflow on any page tested.
- Dark mode is complete: 536 hex colours plus 4 named colours were migrated to semantic tokens.
- Cluster loop closed in all three directions: 20/20 tools link to both guides, 40/40 guides link to their tool and their sibling.
- Google Analytics is the only third-party request. Pages are roughly 7 KB gzipped.

## 10. Consent

Google Consent Mode v2 runs in `layout.njk` before `gtag.js` loads. All four storage signals start denied. In the EEA, UK and Switzerland `analytics_storage` stays denied, which puts GA4 into cookieless ping mode, so nothing is stored on the visitor's device. Everywhere else analytics is granted on load. The three `ad_*` signals stay denied globally because AdSense is not live.

When AdSense goes on, a certified CMP has to come first. It then drives these values through `gtag('consent', 'update', ...)`. No change to the default block is needed.

## 11. Open items before monetisation
1. **Author identity.** Doc 01 treats Experience as the heaviest E-E-A-T factor and wants a real byline, bio and photo. Pending a decision.
2. **ads.txt.** `src/static/ads.txt` is a commented placeholder. Insert the real publisher ID once AdSense approves.
3. **Consent Management Platform.** Required before personalised ads can serve to the EEA and UK. Google Funding Choices inside the AdSense account is the cheapest route.
4. **Search Console.** The domain TXT record is in place. Submit `https://quixcalc.com/sitemap.xml` after the first deploy, then request indexing on the 20 tool pages.
5. **Guide length.** Six of the thinnest guides were expanded past 700 words. The remaining 34 sit between 450 and 650, which doc 01 accepts since it rejects the idea of a target word count, but they are the obvious place to add depth later.

## 11. Changes made in the 26 July 2026 production pass

Everything below was brought in line with `01_SEO-MASTER.md` and `03_TOOL-SPECS.md`.

**URLs.** Tool pages moved from `/tools/<slug>/` to `/<slug>/`, so the whole path is the keyword phrase as doc 01 Faza B requires. Each tool's script is copied next to its page by a per-tool passthrough rule generated in `.eleventy.js`, because the relative `<script src="tool.js">` depends on it.

**Cluster interlinking.** This was the single biggest gap. Before the pass, all 40 guides linked to their tool and nothing linked back, so authority flowed one way and stopped. Now every tool links to both of its guides, and every guide links to its tool, its sibling guide and its category hub. The verifier fails the build if any of those links go missing.

**UX contract from doc 03 section 0.3.** Added `aria-live` result regions on all 20 tools, `for=` on 32 orphaned labels, `inputmode` on 35 numeric inputs, an `aria-label` on the fraction operator select, and a Share plus Copy result bar on every tool driven by `assets/share.js`.

**Copy.** The exact H1 phrase now appears in the first sentence on all 20 tools. 116 em dashes were removed site-wide, which the project's own style rules already banned. The six thinnest guides were expanded past 700 words with real material rather than padding, and reading times were recalculated from actual word counts.

**Performance.** Inter is self-hosted as two woff2 subsets, critical CSS is inlined and the full sheet loads deferred. Google Analytics is now the only third-party request on the page.

**Linkbait.** `/embed/` builds a sandboxed, lazily loaded iframe snippet for any of the 20 tools, with a live preview. Loading a tool with `?embed=1` strips the site chrome. Doc 01 section 8 asks for one linkbait asset per cluster; this covers all six at once.

**Search.** A header search dialog filters a 66-entry JSON index covering tools, categories and guides. Keyboard driven, opens with `/`.

**Ad slots.** Scaffolded per doc 03 section 0.2, one below the tool and one mid-content, with a lazy IntersectionObserver loader. They render nothing while `adsenseId` in `site.json` is empty, which is the state for launch.

**Bugs found and fixed.** Two pre-existing mojibake characters (the multiplication sign in the fraction calculator dropdown and a bold W in the fancy text sample) were showing as black diamonds. Four hardcoded `background: white` rules broke dark mode. Both classes of problem are now caught by the verifier.

### Deliberately not done

- **Author byline, bio and photo.** Doc 01 calls Experience the heaviest E-E-A-T factor and asks for a real author. Deferred pending a decision on who the author is.
- **Images.** Doc 01 asks for 16:9 WebP images with alt text. Skipped by decision; the tools are the content here.
- **HowTo schema.** Doc 03 marks it optional. The `how` sections are prose rather than discrete steps, so marking them up as HowTo would misrepresent the page, and Google retired HowTo rich results in 2023. Not worth the risk.
