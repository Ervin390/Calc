/**
 * datePages.js — Data file for programmatic date pages.
 *
 * IMPORTANT: dates are computed AT BUILD TIME here so Eleventy bakes
 * the final date string directly into the static HTML. Googlebot's
 * first (renderingless) pass therefore sees the answer immediately,
 * which fixes the "Loading…" empty-state problem and the ranking split
 * between exact-date queries (position ~9) and generic "from today"
 * queries (position ~60).
 *
 * This file runs every time `npm run build` is called, which the
 * GitHub Actions daily cron triggers at 00:00 UTC, keeping dates fresh.
 */

const DAYS_CONFIG = [
  {
    days: 7,
    useCase: "Seven days is one full calendar week. It's the standard turnaround for many short-term commitments: processing times for government applications, return-window confirmations on smaller purchases, and freelance invoice grace periods all commonly default to 7 calendar days.",
    examples: [
      "Most online retailers allow 7 days to report a damaged item.",
      "A job offer acceptance window is frequently 7 days.",
      "Bank wires between domestic accounts are often confirmed within 7 business days, but the calendar-day counterpart is one week."
    ]
  },
  {
    days: 14,
    useCase: "Fourteen days is the golden standard for consumer return policies. EU law mandates a 14-day cooling-off period from delivery for almost all online purchases. Landlords in many US states must also return security deposits within 14 to 21 days of a tenant vacating.",
    examples: [
      "Under EU eCommerce regulations, you have 14 days to return most online purchases.",
      "Credit-card dispute windows often trigger a 14-day provisional credit.",
      "Many subscription trials last 14 days before the first charge."
    ]
  },
  {
    days: 21,
    useCase: "Twenty-one days is a widely referenced deadline in employment and consumer law. US federal law allows 21 days to review and sign a ADEA severance agreement. Sprint-based project teams running three-week sprints also use 21-day milestones.",
    examples: [
      "US ADEA gives employees 21 days to consider a severance offer.",
      "Three-week sprint teams plan deliverables on a 21-day cycle.",
      "Some utility companies require 21 days notice before disconnection."
    ]
  },
  {
    days: 30,
    useCase: "Thirty days is the most universal deadline in business and law. Notice periods for resigning from a job, month-to-month lease termination, credit-card billing cycles, and magazine cancellation windows all converge on 30 calendar days.",
    examples: [
      "Most white-collar employment contracts require 30 days written notice.",
      "Month-to-month residential lease terminations typically require 30 days notice.",
      "Credit card statement cycles are usually billed every 30 days.",
      "PayPal dispute resolution must be opened within 180 days but status follows 30-day windows."
    ]
  },
  {
    days: 45,
    useCase: "Forty-five days sits between one and two months, making it a common intermediate deadline in contracts, insurance, and B2B procurement. US mortgage lenders typically issue rate-lock agreements for 45 days. Extended freelance project milestones also default to 45 days.",
    examples: [
      "Most mortgage rate locks in the US last 45 to 60 days.",
      "US COBRA continuation healthcare coverage election window is 60 days, but the initial notice period is 45 days.",
      "Many government procurement bids have a 45-day evaluation period."
    ]
  },
  {
    days: 60,
    useCase: "Sixty days, or two calendar months, appears in real-estate transactions, mortgage rate-locks, visa processing and probationary project milestones. COBRA health insurance election windows in the US are 60 days. Many B2B payment terms cap at Net-60.",
    examples: [
      "Net-60 payment terms give B2B customers 60 days to pay invoices.",
      "COBRA health insurance election: 60 days from qualifying event.",
      "Standard real-estate closing periods range from 30 to 60 days.",
      "Rate-lock agreements on jumbo mortgages typically run 60 days."
    ]
  },
  {
    days: 90,
    useCase: "Ninety days is the most important programmatic date in business. New-hire probationary periods are almost universally set at 90 days. US B1/B2 tourist visas permit stays of up to 90 days. Many vendor contracts, SLA review cycles, and performance-improvement plans also span 90 days.",
    examples: [
      "US B1/B2 tourist visas allow a maximum 90-day stay per entry.",
      "Most corporate new-hire probationary periods run 90 calendar days.",
      "Quarterly business reviews and OKR cycles reset every 90 days.",
      "Net-90 is the longest payment term traded in standard B2B agreements.",
      "IRS and CRA tax installment reminders are issued 90 days before the due date."
    ]
  },
  {
    days: 100,
    useCase: "One hundred days is the classic political and executive accountability benchmark. The first 100 days of a US presidential term or a new CEO's tenure are the standard window for setting priorities. Project management frameworks also use 100-day milestones for transformation programs.",
    examples: [
      "US presidents are traditionally judged on their first 100 days in office.",
      "Consulting firms run 100-day transformation roadmaps for new executives.",
      "Major infrastructure projects set 100-day milestone reviews.",
      "Many warranty extension programs start coverage from day 0 and expire at day 100."
    ]
  },
  {
    days: 180,
    useCase: "One hundred eighty days is six calendar months, the standard for product warranties, US work visas, and many legal statutes of limitations for filing small claims. Non-immigrant visas allowing a visa run between entries also commonly impose a 180-day restriction.",
    examples: [
      "Standard manufacturer warranties often run 180 days (6 months).",
      "PayPal Buyer Protection must be claimed within 180 days of payment.",
      "US H-1B cap-exempt applications allow a 180-day grace period after employment ends.",
      "Many countries limit tourist stays to 180 days per rolling year."
    ]
  },
  {
    days: 365,
    useCase: "Three hundred sixty-five days is one full calendar year. Annual performance reviews, software licence renewals, professional certifications, and recurring insurance policies all measure their cycles in 365-day increments. Leap years contain 366 days.",
    examples: [
      "Annual subscription licences (Microsoft 365, Adobe CC) renew every 365 days.",
      "Most employee annual performance review cycles span 365 days.",
      "CPR and fire-safety certifications typically expire after 365 days.",
      "Professional indemnity insurance policies renew on a 365-day cycle."
    ]
  }
];

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function formatDate(d) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function formatShort(d) {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const today = new Date();
// UTC date string so all builds worldwide produce the same date
const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

module.exports = DAYS_CONFIG.map((cfg) => {
  const target = addDays(utcToday, cfg.days);
  return {
    days: cfg.days,
    targetDateLong: formatDate(target),   // "Monday, October 20, 2026"
    targetDateShort: formatShort(target), // "October 20, 2026"
    targetISO: target.toISOString().split("T")[0], // "2026-10-20"
    weeks: Math.floor(cfg.days / 7),
    remainderDays: cfg.days % 7,
    approxMonths: (cfg.days / 30.44).toFixed(1),
    businessDays: Math.round(cfg.days * 5 / 7),
    useCase: cfg.useCase,
    examples: cfg.examples,
  };
});
