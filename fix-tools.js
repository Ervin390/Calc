const fs = require('fs');

const p = 'src/blog/how-to-calculate-90-days-from-today.md';
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('/blog/business-days-vs-calendar-days-guide/', '/blog/business-days-calculator-contract-deadlines/');
  fs.writeFileSync(p, c, 'utf8');
}

const toolsToFix = [
  'src/tools/stripe-fee-calculator/index.njk',
  'src/tools/hours-calculator/index.njk',
  'src/tools/hourly-to-salary-calculator/index.njk',
  'src/tools/time-and-a-half-calculator/index.njk',
  'src/tools/mortgage-overpayment-calculator/index.njk'
];

const clusterSnippet = '{% from "cluster.njk" import clusterGuides %}\n{{ clusterGuides(tools | findByKey("slug", page.fileSlug)) }}\n\n';

for (const tPath of toolsToFix) {
  if (!fs.existsSync(tPath)) continue;
  let tContent = fs.readFileSync(tPath, 'utf8');
  if (!tContent.includes('clusterGuides')) {
    tContent = tContent.replace('<div class="author">', clusterSnippet + '<div class="author">');
    fs.writeFileSync(tPath, tContent, 'utf8');
  }
}

console.log('Successfully updated tool templates');
