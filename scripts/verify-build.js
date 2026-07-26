#!/usr/bin/env node
/**
 * Pre-launch build verifier.
 *
 * Runs against _site/ after an Eleventy build and fails the process on
 * anything that would embarrass us in Search Console: dead internal
 * links, missing canonicals, leftover /index.html suffixes, duplicate
 * titles, unparseable JSON-LD, or pages absent from the sitemap.
 *
 *   node scripts/verify-build.js
 */

const fs = require("fs");
const path = require("path");

const SITE = "_site";
const ORIGIN = "https://quixcalc.com";
const OLD_BRAND = /quicktools/i;

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ---------------------------------------------------------------- utils
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    e.isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}

if (!fs.existsSync(SITE)) {
  console.error(`✗ ${SITE}/ does not exist. Run the build first.`);
  process.exit(1);
}

const allFiles = walk(SITE);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
const rel = (f) => f.slice(SITE.length);

// Set of every path the built site can actually serve.
const served = new Set();
for (const f of allFiles) {
  const r = rel(f);
  served.add(r);
  if (r.endsWith("/index.html")) served.add(r.slice(0, -"index.html".length));
}

// ---------------------------------------------------------------- checks
const titles = new Map();
const descriptions = new Map();
const canonicals = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const where = rel(file);

  // -- leftover brand ------------------------------------------------
  if (OLD_BRAND.test(html)) {
    const m = html.match(/.{0,40}quicktools.{0,40}/i);
    fail(`${where}: old brand still present: "${m[0].trim()}"`);
  }

  // -- mojibake --------------------------------------------------------
  // A U+FFFD in the output means a character was lost somewhere upstream
  // and the visitor sees a black diamond.
  if (html.includes("�")) {
    const m = html.match(/.{0,40}�.{0,40}/);
    fail(`${where}: replacement character in output: "${m[0].trim()}"`);
  }

  // -- house style: no em or en dashes in prose ------------------------
  const body = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  if (/[—–]/.test(body)) {
    const m = body.match(/.{0,45}[—–].{0,45}/);
    fail(`${where}: em or en dash in copy: "${m[0].replace(/<[^>]*>/g, "").trim()}"`);
  }

  // -- /index.html in links -----------------------------------------
  const dirty = [...html.matchAll(/(?:href|src)="([^"]*\/index\.html[^"]*)"/g)];
  for (const d of dirty) fail(`${where}: link still ends in /index.html — ${d[1]}`);

  // -- title ---------------------------------------------------------
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (!title) fail(`${where}: missing <title>`);
  else {
    if (title.length > 65) warn(`${where}: title is ${title.length} chars — "${title}"`);
    if (titles.has(title)) fail(`${where}: duplicate title, also on ${titles.get(title)}`);
    else titles.set(title, where);
  }

  // -- description ---------------------------------------------------
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) fail(`${where}: missing meta description`);
  else {
    if (desc.length > 160) warn(`${where}: description is ${desc.length} chars`);
    if (desc.length < 60) warn(`${where}: description is only ${desc.length} chars`);
    if (descriptions.has(desc)) fail(`${where}: duplicate description, also on ${descriptions.get(desc)}`);
    else descriptions.set(desc, where);
  }

  // -- canonical -----------------------------------------------------
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!canon) fail(`${where}: missing canonical`);
  else {
    if (!canon.startsWith(ORIGIN)) fail(`${where}: canonical not on ${ORIGIN} — ${canon}`);
    if (canon.includes("?")) fail(`${where}: canonical carries a query string — ${canon}`);
    canonicals.add(canon.slice(ORIGIN.length));
  }

  // -- one H1 --------------------------------------------------------
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) fail(`${where}: no <h1>`);
  if (h1s > 1) fail(`${where}: ${h1s} <h1> elements, expected exactly 1`);

  // -- structured data parses ---------------------------------------
  for (const b of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(b[1]);
    } catch (e) {
      fail(`${where}: invalid JSON-LD — ${e.message}`);
    }
  }

  // -- open graph ----------------------------------------------------
  for (const prop of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!html.includes(`property="${prop}"`)) fail(`${where}: missing ${prop}`);
  }

  // -- analytics -----------------------------------------------------
  if (!html.includes("googletagmanager.com/gtag/js?id=G-")) {
    fail(`${where}: Google Analytics tag missing`);
  }

  // -- internal links resolve ----------------------------------------
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    const target = m[1];
    if (served.has(target)) continue;
    if (served.has(target + "/")) continue;
    if (served.has(target + "index.html")) continue;
    fail(`${where}: broken internal link → ${target}`);
  }
}

// ---------------------------------------------------------------- sitemap
const sitemapPath = path.join(SITE, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  fail("sitemap.xml was not generated");
} else {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const inSitemap = new Set(locs.map((l) => l.replace(ORIGIN, "")));

  for (const loc of locs) {
    if (!loc.startsWith(ORIGIN)) fail(`sitemap.xml: URL not on ${ORIGIN} — ${loc}`);
    const p = loc.replace(ORIGIN, "");
    if (!served.has(p) && !served.has(p + "index.html")) {
      fail(`sitemap.xml: lists a URL that is not built — ${loc}`);
    }
  }
  for (const c of canonicals) {
    if (c === "/404.html") continue;
    if (!inSitemap.has(c)) fail(`sitemap.xml: missing indexable page — ${c}`);
  }
  if (new Set(locs).size !== locs.length) fail("sitemap.xml: contains duplicate URLs");
  console.log(`  sitemap.xml lists ${locs.length} URLs`);
}

// ---------------------------------------------------------------- required files
for (const f of [
  "robots.txt",
  "sitemap.xml",
  "404.html",
  "CNAME",
  "favicon.ico",
  "site.webmanifest",
  "assets/style.css",
  "assets/state.js",
  "assets/og-default.png",
  "assets/favicon.svg",
  "assets/apple-touch-icon.png",
]) {
  if (!fs.existsSync(path.join(SITE, f))) fail(`missing required file: ${f}`);
}

// robots must point at the sitemap
if (fs.existsSync(path.join(SITE, "robots.txt"))) {
  const r = fs.readFileSync(path.join(SITE, "robots.txt"), "utf8");
  if (!r.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) fail("robots.txt: sitemap directive missing or wrong");
}

// Tool pages publish at the site root, so the list comes from the data file
// rather than from a directory scan.
const toolData = JSON.parse(fs.readFileSync("src/_data/tools.json", "utf8"));
const toolDirs = toolData.map((t) => t.slug);

for (const t of toolData) {
  const dir = path.join(SITE, t.slug);
  if (!fs.existsSync(dir)) {
    fail(`${t.slug}: tool page was not built`);
    continue;
  }
  const files = fs.readdirSync(dir);
  if (!files.includes("index.html")) fail(`${t.slug}: no index.html`);
  if (!files.some((f) => f.endsWith(".js"))) {
    fail(`${t.slug}: no JavaScript file was copied — the tool will not work`);
  }

  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");

  // Cluster loop: the money page has to link back to the guides that feed it.
  for (const p of t.posts || []) {
    if (!html.includes(`href="${p.url}"`)) {
      fail(`${t.slug}: missing cluster link to ${p.url}`);
    }
  }

  // doc 03 section 0.3 UX contract
  if (!html.includes("aria-live")) fail(`${t.slug}: result region has no aria-live`);
  const numeric = [...html.matchAll(/<input[^>]*type="number"[^>]*>/g)];
  for (const m of numeric) {
    if (!/inputmode=/.test(m[0])) {
      fail(`${t.slug}: numeric input without inputmode — ${m[0].slice(0, 70)}`);
      break;
    }
  }
  const ids = [...html.matchAll(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"[^>]*>/g)].map((m) => m[1]);
  const labelled = new Set([...html.matchAll(/<label[^>]*for="([^"]+)"/g)].map((m) => m[1]));
  // A control nested inside its <label> is associated implicitly and needs no for=.
  const wrapped = new Set();
  for (const m of html.matchAll(/<label[^>]*>([\s\S]*?)<\/label>/g)) {
    for (const inner of m[1].matchAll(/<(?:input|select|textarea)[^>]*\bid="([^"]+)"/g)) {
      wrapped.add(inner[1]);
    }
  }
  for (const id of ids) {
    if (labelled.has(id) || wrapped.has(id)) continue;
    const tag = html.match(new RegExp(`<(?:input|select|textarea)[^>]*\\bid="${id}"[^>]*>`));
    if (tag && /aria-label(?:ledby)?=/.test(tag[0])) continue;
    fail(`${t.slug}: form control #${id} has no associated label`);
  }
}

// Every guide must point back at its tool and at its sibling guide.
const postData = JSON.parse(fs.readFileSync("src/_data/posts.json", "utf8"));
for (const [slug, p] of Object.entries(postData)) {
  const f = path.join(SITE, "blog", slug, "index.html");
  if (!fs.existsSync(f)) {
    fail(`blog/${slug}: not built`);
    continue;
  }
  const html = fs.readFileSync(f, "utf8");
  const owner = toolData.find((t) => (t.posts || []).some((x) => x.url === p.url));
  if (!owner) {
    fail(`blog/${slug}: not attached to any tool cluster`);
    continue;
  }
  if (!html.includes(`href="${owner.url}"`)) fail(`blog/${slug}: no link to its tool ${owner.url}`);
  const sibling = owner.posts.find((x) => x.url !== p.url);
  if (sibling && !html.includes(`href="${sibling.url}"`)) {
    fail(`blog/${slug}: no link to sibling guide ${sibling.url}`);
  }
}

// ---------------------------------------------------------------- report
console.log(`\n  ${htmlFiles.length} HTML pages checked, ${toolDirs.length} tool pages\n`);

if (warnings.length) {
  console.log(`  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`    ! ${w}`);
  console.log("");
}

if (errors.length) {
  console.error(`  ${errors.length} error(s):`);
  for (const e of errors) console.error(`    ✗ ${e}`);
  console.error("\nBuild verification FAILED\n");
  process.exit(1);
}

console.log("  Build verification passed\n");
