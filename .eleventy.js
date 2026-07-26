const fs = require("fs");

module.exports = function (eleventyConfig) {
  // ---------------------------------------------------------------
  // Passthrough copy
  // ---------------------------------------------------------------
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Tool pages are authored in src/tools/<slug>/ but published at the site
  // root (/<slug>/) because doc 01 wants the keyword phrase to be the whole
  // path. Each tool's script has to land next to its page or the relative
  // <script src="tool.js"> breaks, so the copy targets are built per tool.
  for (const slug of fs.readdirSync("src/tools")) {
    const dir = `src/tools/${slug}`;
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".js")) continue;
      eleventyConfig.addPassthroughCopy({ [`${dir}/${file}`]: `${slug}/${file}` });
    }
  }

  // ---------------------------------------------------------------
  // Filters
  // ---------------------------------------------------------------

  // Absolute URL for canonicals, OG tags, schema and the sitemap.
  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).href;
    } catch (e) {
      return url;
    }
  });

  // 2026-07-25 -> ISO 8601 (schema.org / sitemap lastmod)
  eleventyConfig.addFilter("isoDate", (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d) ? "" : d.toISOString().split("T")[0];
  });

  // 2026-07-25 -> "July 25, 2026"
  eleventyConfig.addFilter("readableDate", (date) => {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Strip HTML and clamp — used to keep meta descriptions inside 155 chars.
  eleventyConfig.addFilter("truncate", (str, len = 155) => {
    if (!str) return "";
    const clean = String(str).replace(/<[^>]*>/g, "").trim();
    if (clean.length <= len) return clean;
    return clean.slice(0, clean.lastIndexOf(" ", len - 1)) + "…";
  });

  // Escape a string for safe embedding inside JSON-LD.
  eleventyConfig.addFilter("jsonEscape", (str) => {
    if (!str) return "";
    return JSON.stringify(String(str)).slice(1, -1);
  });

  // Rough reading time for blog posts (E-E-A-T signal).
  eleventyConfig.addFilter("readingTime", (content) => {
    if (!content) return 1;
    const words = String(content).replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  // Look up an object in a list by property — Nunjucks has no selectattr.
  eleventyConfig.addFilter("findByKey", (list, key, value) => {
    if (!Array.isArray(list) || value === undefined || value === null) return null;
    return list.find((item) => item && item[key] === value) || null;
  });

  // All tools belonging to one category, in declaration order.
  eleventyConfig.addFilter("byCategory", (tools, key) => {
    if (!Array.isArray(tools)) return [];
    return tools.filter((t) => t.category === key);
  });

  eleventyConfig.addFilter("where", (list, key, value) => {
    if (!Array.isArray(list)) return [];
    return list.filter((item) => item && item[key] === value);
  });

  // Which tool cluster does this guide belong to?
  eleventyConfig.addFilter("findByPostUrl", (tools, url) => {
    if (!Array.isArray(tools) || !url) return null;
    return tools.find((t) => (t.posts || []).some((p) => p.url === url)) || null;
  });

  // ---------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------
  eleventyConfig.addCollection("blog", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  eleventyConfig.addCollection("tools", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/tools/*/index.njk")
      .sort((a, b) => a.url.localeCompare(b.url))
  );

  // Every page that should appear in sitemap.xml.
  eleventyConfig.addCollection("sitemap", (collectionApi) =>
    collectionApi.getAll().filter((item) => {
      if (item.data.eleventyExcludeFromCollections) return false;
      if (item.data.sitemapExclude === true) return false;
      if (!item.url || item.url === false) return false;
      // Only real HTML pages.
      return item.url.endsWith("/") || item.url.endsWith(".html");
    })
  );

  // ---------------------------------------------------------------
  // Transforms
  // ---------------------------------------------------------------

  // Auto-generate FAQPage structured data from the hand-written
  // <section class="faq"> blocks, so the markup stays the single
  // source of truth and the two can never drift apart.
  eleventyConfig.addTransform("faqSchema", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    if (content.includes('"@type": "FAQPage"')) return content;

    const section = content.match(
      /<section[^>]*class="[^"]*\bfaq\b[^"]*"[^>]*>([\s\S]*?)<\/section>/i
    );
    if (!section) return content;

    const strip = (s) =>
      s
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const pairs = [];
    const qRe = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
    let m;
    while ((m = qRe.exec(section[1])) !== null) {
      const question = strip(m[1]);
      const answer = strip(m[2]);
      if (question && answer) pairs.push({ question, answer });
    }
    if (pairs.length === 0) return content;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pairs.map((p) => ({
        "@type": "Question",
        name: p.question,
        acceptedAnswer: { "@type": "Answer", text: p.answer },
      })),
    };

    return content.replace(
      "</head>",
      `<script type="application/ld+json">\n${JSON.stringify(schema)}\n</script>\n</head>`
    );
  });

  // Safety net: no production URL may ever expose "/index.html".
  // Catches anything a hand-edit or a future template reintroduces.
  eleventyConfig.addTransform("cleanUrls", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    return content.replace(
      /(href|src|content)="([^"]*?)\/index\.html(["#?])/g,
      '$1="$2/$3'
    );
  });

  // ---------------------------------------------------------------
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Directory-style output ("/tools/tip-calculator/") so live URLs
    // never expose an "index.html" suffix.
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
