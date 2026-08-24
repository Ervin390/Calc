---
title: "How to Compute Standard Deviation of the Mean"
description: "Learn how to compute the standard deviation of the mean (standard error) using formulas, step-by-step examples, and sample size adjustments."
date: 2026-08-24
updated: 2026-08-24
tags:
  - post
  - math
tool: /standard-deviation-calculator/
---

# How to Compute Standard Deviation of the Mean

In statistics, the **standard deviation of the mean**-commonly referred to as the **Standard Error of the Mean (SEM)**-measures how accurately a sample mean represents the true population mean.

While the standard sample standard deviation ($s$) measures the variability of individual observations within a single sample dataset, the standard error ($SE_{\bar{x}}$) measures the variability of sample means if you were to repeat the experiment multiple times.

This guide explains the formula, provides a step-by-step worked example, and demonstrates how to calculate it using our [<a href="/standard-deviation-calculator/">Standard Deviation Calculator</a>](/standard-deviation-calculator/).

---

## The Formula for Standard Deviation of the Mean

The standard error of the mean is calculated by dividing the sample standard deviation ($s$) by the square root of the total sample size ($n$):

$$\text{SEM} = \frac{s}{\sqrt{n}}$$

Where:
- $s$ = Sample standard deviation
- $n$ = Total number of observations in the sample
- $\sqrt{n}$ = Square root of the sample size

---

## Step-by-Step Calculation Example

Suppose a laboratory measures test scores across a sample of $n = 25$ students, finding a sample mean of $\bar{x} = 85$ and a sample standard deviation of $s = 10$.

### Step 1: Calculate the square root of the sample size ($n$)

$$\sqrt{n} = \sqrt{25} = 5$$

### Step 2: Divide sample standard deviation ($s$) by $\sqrt{n}$

$$\text{SEM} = \frac{10}{5} = 2.0$$

**Interpretation:** The estimated average distance between our sample mean (85) and the true overall population mean is 2.0 points.

---

## Standard Deviation vs Standard Error

| Metric | Standard Deviation ($s$) | Standard Error ($\text{SEM}$) |
| :--- | :--- | :--- |
| **What it Measures** | Spread of individual data points | Uncertainty of the sample mean |
| **Formula** | $\sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}$ | $\frac{s}{\sqrt{n}}$ |
| **Effect of Sample Size** | Remains stable as $n$ grows | Decreases as $n$ grows |

---

## Automate Your Statistical Calculations

Calculate sample standard deviation, population standard deviation, variance, and sample means instantly using our free [<a href="/standard-deviation-calculator/">Standard Deviation Calculator</a>](/standard-deviation-calculator/). For more tools, visit our [<a href="/math/">Math & Education Category</a>](/math/).

For a complete beginner's step-by-step statistical guide, see our article on [<a href="/blog/standard-deviation-step-by-step/">Standard Deviation Step-by-Step</a>](/blog/standard-deviation-step-by-step/).
