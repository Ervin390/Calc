---
title: "Loan Amortization Formula Step by Step Math"
description: "Master the mathematical loan amortization formula step-by-step to calculate principal, interest, and monthly mortgage payments."
date: 2026-08-24
updated: 2026-08-24
tags:
  - post
  - finance
tool: /mortgage-overpayment-calculator/
---

# Loan Amortization Formula Step by Step Math

Loan amortization is the process of spreading loan repayments over a fixed timeline through equal monthly installments. Each monthly payment is split into two parts: **Interest** (the lender's fee) and **Principal** (reducing your outstanding balance).

This guide breaks down the mathematical amortization formula step-by-step, showing how to manually construct an amortization schedule using our [<a href="/mortgage-overpayment-calculator/">Mortgage Overpayment Calculator</a>](/mortgage-overpayment-calculator/).

---

## The Standard Amortization Formula

To calculate the fixed monthly payment ($PMT$) on an amortizing loan:

$$PMT = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

Where:
- $P$ = Principal loan amount (e.g., $200,000)
- $r$ = Periodic monthly interest rate ($\text{Annual Rate} \div 12$)
- $n$ = Total number of monthly payments ($\text{Loan Term in Years} \times 12$)

---

## Step-by-Step Worked Example

Calculate the monthly payment for a **$100,000 loan** at a **6.0% annual interest rate** over **30 years** ($n = 360$ months):

### Step 1: Calculate monthly interest rate ($r$)
$$r = \frac{6.0\%}{12} = \frac{0.06}{12} = 0.005$$

### Step 2: Calculate $(1 + r)^n$
$$(1 + 0.005)^{360} = (1.005)^{360} \approx 6.022575$$

### Step 3: Solve the PMT equation
$$PMT = 100,000 \times \frac{0.005 \times 6.022575}{6.022575 - 1}$$
$$PMT = 100,000 \times \frac{0.030113}{5.022575} = 100,000 \times 0.0059955 = \mathbf{\$599.55}$$

---

## How Interest vs Principal Shifts Over Time

During early loan months, interest dominates the payment. As the principal drops, monthly interest charges decrease, accelerating principal paydown.

```
Month 1:   $599.55 Payment ($500.00 Interest + $99.55 Principal)
Month 180: $599.55 Payment ($332.10 Interest + $267.45 Principal)
Month 360: $599.55 Payment ($2.98 Interest + $596.57 Principal)
```

---

## Automate Amortization & Overpayments

Generate full payment schedules and calculate early payoff savings using our free [<a href="/mortgage-overpayment-calculator/">Mortgage Overpayment Calculator</a>](/mortgage-overpayment-calculator/). Explore additional tools in our [<a href="/finance/">Finance Category</a>](/finance/).

For loan payoff acceleration methods, see [<a href="/blog/pay-off-mortgage-5-years-early/">Pay Off Mortgage 5 Years Early</a>](/blog/pay-off-mortgage-5-years-early/).
