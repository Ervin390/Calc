---
layout: layout.njk
title: How to Calculate Hours Worked for Payroll Without Getting It Wrong
description: Calculating hours worked sounds simple until someone works overtime, crosses midnight, or has irregular break times. Here is how to do it accurately every time.
category: blog
date: 2026-08-02
updated: 2026-08-02
excerpt: Time calculation errors in payroll are more common than most managers expect. Here is the right way to calculate hours worked for any shift pattern.
tags: post
permalink: /blog/hours-worked-calculator-payroll/
---

# How to Calculate Hours Worked for Payroll Without Getting It Wrong

Calculating hours worked seems like it should be one of the simplest things in office administration. You have a start time and an end time. You subtract one from the other. You have your answer.

In practice it goes wrong regularly. Overnight shifts produce negative numbers. Decimal conversion trips people up. Lunch breaks get applied inconsistently. One small error multiplied across dozens of employees and multiple pay periods can add up to serious money in either direction.

Here is how to do it right every time.

## Step One: Convert to Total Minutes

Clock time in hours and minutes does not subtract like normal numbers. Eight-thirty minus nine-fifteen does not give you a useful number using standard arithmetic.

The reliable method is to convert both times to minutes from midnight first.

Start time of 09:15 = 9 x 60 + 15 = 555 minutes from midnight.
End time of 17:45 = 17 x 60 + 45 = 1065 minutes from midnight.
Duration = 1065 minus 555 = 510 minutes.

Now convert back: 510 divided by 60 = 8 hours and 30 minutes. Or 8.5 in decimal hours.

Our [time duration calculator](/time-duration-calculator/) handles this automatically. Enter a start and end time and you get the duration in hours and minutes, total minutes, and decimal hours in one step.

## Overnight Shifts: The Common Error

Overtime and overnight work create the most frequent errors in manual time calculations.

A shift starting at 22:00 and ending at 06:00 the following morning is 8 hours long. But if you try to calculate it directly: 06:00 minus 22:00 gives you a negative number.

The fix is to add 24 hours (or 1440 minutes) to the end time when the end time is earlier than the start time.

06:00 in minutes = 360. Add 1440: 360 + 1440 = 1800 minutes.
Start time 22:00 = 1320 minutes.
Duration = 1800 minus 1320 = 480 minutes = 8 hours.

The [time duration calculator](/time-duration-calculator/) handles this automatically. If you enter an end time earlier than the start time it assumes the work crossed midnight and adjusts the result accordingly.

## Converting to Decimal Hours for Payroll

Most payroll software and rate calculations work in decimal hours rather than hours and minutes. This makes multiplying by hourly rates straightforward.

To convert: take the total minutes and divide by 60.

510 minutes / 60 = 8.5 decimal hours.
A worker on $17.50 per hour for 8.5 hours earns: 8.5 x $17.50 = $148.75 before tax.

Do not convert 30 minutes as 0.30 decimal hours. That is a common mistake. Thirty minutes is 0.5 decimal hours because there are 60 minutes in a full hour not 100.

## Handling Breaks

The standard approach is to deduct unpaid break time from the total duration after calculating it.

A shift from 08:00 to 16:30 with a 30-minute unpaid lunch break:
Total duration = 8 hours 30 minutes = 510 minutes.
Minus 30-minute break = 480 minutes = 8 decimal hours.

Some payroll systems handle this automatically. Others require manual entry of net worked time. Either way calculate the gross shift duration first then deduct breaks separately.

## Using a Tool vs Manual Calculation

For individual calculations or checking your own timesheet our [time duration calculator](/time-duration-calculator/) is the fastest option. Enter your times and the result appears immediately in hours and minutes decimal hours and total minutes together.

For regular payroll at any scale beyond a few employees dedicated payroll software like Gusto QuickBooks Payroll or Xero handles time tracking and calculations automatically. These tools integrate with time tracking apps and reduce the manual error surface to near zero.

For freelancers a simple time log in a spreadsheet combined with the decimal hours format from this calculator is usually sufficient for generating accurate invoices.

---

**Calculate your shift hours instantly with our [Time Duration Calculator](/time-duration-calculator/).**

**Related tools:** [Age Calculator](/age-calculator/) | [Date Calculator](/date-calculator/)
