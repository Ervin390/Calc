---
noindex: true
sitemapExclude: true
title: "How to Calculate Stripe Processing Fees"
description: "Learn how to calculate Stripe credit card processing fees, international transaction surcharges, and how to gross up invoices."
date: 2026-08-24
updated: 2026-08-24
tags:
  - post
  - saas
tool: /stripe-fee-calculator/
---

# How to Calculate Stripe Processing Fees

Stripe is the leading payment processor for online businesses, e-commerce stores, and SaaS platforms. However, standard payment processing fees can erode profit margins if businesses do not account for fixed transaction charges and percentage fees.

This guide explains Stripe's pricing structure, how to calculate gross-up invoice totals to pass processing fees to clients, and how to estimate costs using our [<a href="/stripe-fee-calculator/">Stripe Fee Calculator</a>](/stripe-fee-calculator/).

---

## Standard Stripe Pricing Structure (US)

For standard domestic credit card transactions in the United States, Stripe charges:

$$\text{Stripe Fee} = (\text{Transaction Amount} \times 2.9\%) + \$0.30$$

- **Percentage Fee:** 2.9% per successful card charge.
- **Fixed Fee:** $0.30 fixed fee per transaction.

### Additional Fee Types:

- **International Cards:** +1.5% surcharge (total 4.4% + $0.30).
- **Currency Conversion:** +1.0% surcharge if currency conversion is required.
- **Stripe Invoicing:** +0.4% per paid invoice (capped at $2.00 or custom rates).

---

## Standard Fee vs Gross-Up Invoice Formula

When selling a product for **$100.00**, standard processing deducts:

$$\text{Fee} = (\$100 \times 0.029) + \$0.30 = \$2.90 + \$0.30 = \$3.20$$
$$\text{Net Payout} = \$100.00 - \$3.20 = \mathbf{\$96.80}$$

### The "Gross-Up" Formula (Passing Fees to Client):

If you want to receive exactly **$100.00 net payout**, you must charge the customer slightly more than $103.20, because the 2.9% fee applies to the new, higher total amount.

$$\text{Gross Amount} = \frac{\text{Desired Net Payout} + \text{Fixed Fee}}{1 - \text{Percentage Rate}}$$

$$\text{Gross Amount} = \frac{\$100.00 + \$0.30}{1 - 0.029} = \frac{\$100.30}{0.971} = \mathbf{\$103.30}$$

```
Charge Customer: $103.30
Stripe Fee (2.9% + $0.30): ($103.30 x 0.029) + $0.30 = $3.30
Net Payout to You: $103.30 - $3.30 = $100.00 EXACTLY
```

---

## Fee Comparison Matrix

| Sale Amount | Standard Stripe Fee | Net Payout | Grossed-Up Charge for $100 Net |
| :--- | :--- | :--- | :--- |
| **$10.00** | $0.59 (5.9%) | $9.41 | $10.61 |
| **$50.00** | $1.75 (3.5%) | $48.25 | $51.80 |
| **$100.00** | $3.20 (3.2%) | $96.80 | $103.30 |
| **$50.000** | $14.80 (2.96%) | $485.20 | $515.24 |

---

## Automate Your Fee Calculations

Instantly calculate exact Stripe transaction fees and required invoice gross-up amounts using our free [<a href="/stripe-fee-calculator/">Stripe Fee Calculator</a>](/stripe-fee-calculator/). For more commercial utilities, visit our [<a href="/saas/">SaaS & Business Category</a>](/saas/).

For comparison with PayPal rates, see our guide [<a href="/blog/paypal-goods-and-services-fee-percentage/">PayPal Goods and Services Fee Percentage</a>](/blog/paypal-goods-and-services-fee-percentage/).
