---
layout: layout.njk
title: How Long Should a Password Be in 2026?
description: Most people use passwords that are far too short. Here is what the research says about password length, why it matters more than complexity, and how to fix yours today.
category: blog
date: 2026-08-02
updated: 2026-08-02
excerpt: Security guidelines have changed a lot in the last five years. Here is exactly how long your passwords should be and why most of yours are probably not there yet.
tags: post
permalink: /blog/how-long-should-password-be/
---

# How Long Should a Password Be in 2026?

Most people are using passwords that are too short. Not by a little. By a lot.

The average person's password is somewhere around 8 to 10 characters. Security research and the latest NIST guidelines both suggest you should be aiming for a minimum of 16 and ideally more for anything sensitive. There is a large gap between where most people are and where they should be.

This gap matters because password cracking technology has improved dramatically. What used to take months takes hours now thanks to specialised hardware and distributed computing.

## The Math Behind Password Strength

Password strength is measured in something called entropy: the total number of possible combinations an attacker would need to try before landing on yours.

A password using only lowercase letters gives 26 options per character. An 8-character lowercase password has 26 to the power of 8 possible combinations. That sounds like a lot until you realise modern GPU-based cracking rigs can test billions of guesses per second.

In 2024, independent security researchers demonstrated that an 8-character password using any combination of upper and lowercase letters and numbers could be cracked in under an hour using off-the-shelf hardware costing a few thousand dollars.

Adding symbols helps. But increasing length helps more.

Compare an 8-character password using all character types (about 6.7 quadrillion combinations) to a 16-character password using all character types. The 16-character version has roughly 6.7 x 10 to the power of 30 combinations. That is not two times safer. That is incomprehensibly safer.

## What NIST Actually Recommends Now

The National Institute of Standards and Technology revised its password guidelines in 2024. The updated guidance shifted away from forcing complexity rules (uppercase, number, symbol requirements) in favour of promoting longer passwords.

The key recommendations from NIST SP 800-63B are:

Allow passwords of at least 64 characters. Most sites currently cap out far below this. Systems should allow users to create very long passwords rather than enforcing short maximums.

Length is more important than complexity. A 20-character sentence made of random words is harder to crack than a 10-character string of mixed characters. The phrase "correct-horse-battery-staple" (from the famous XKCD comic) is approximately 100 years beyond the reach of brute-force attacks.

Do not require periodic rotation without cause. Forcing users to change passwords every 90 days creates predictable patterns (Password1! becomes Password2!) without improving security. Only change passwords when there is evidence of compromise.

## Using a Password Generator for Better Results

Random password generators solve most of these problems automatically. Our [password generator](/password-generator/) uses the Web Crypto API to produce cryptographically secure random values, not basic random numbers. You set the length, choose your character types, and get a result that no attacker could predict.

Set the length to at least 16 for most accounts. For anything critical like your email, bank, or primary password manager master password use 20 or more.

The key is that the password must then be stored properly. Writing 20 random characters on paper and keeping it safe is actually fine and is explicitly acknowledged in modern security guidance. Using a password manager like Bitwarden, 1Password, or KeePass is better for most people because it makes using unique long passwords for every site practical.

## The One Habit That Improves Security More Than Anything Else

Use a different password for every account. Not variations. Not the same password with a different number at the end. A completely unique password for each service.

The reason is credential stuffing. When a company gets breached (and hundreds do every year), the stolen email-password combinations are tested against every other major site within hours. If you use the same password for your email and your Amazon account and your Reddit account, a breach of any single one of those opens all three.

A password manager makes this completely manageable. You only need to remember one master password. Every other password can be a 20-character random string that you never need to type by hand.

Use our free [password generator](/password-generator/) to create strong random passwords for each of your accounts. It runs entirely in your browser and keeps nothing.

---

**Generate a strong password now with our [Password Generator](/password-generator/).**

**Related tools:** [UUID Generator](/uuid-generator/) | [Character Counter](/character-counter/)
