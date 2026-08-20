---
title: firewatch
description: A countdown to financial independence that runs entirely on your own machine.
date: 2026-08-04
repo: https://github.com/wLotherington/firewatch
wip: true
---

firewatch answers one question: how long until I'm financially independent?
Every few months I upload bank statements and pay stubs, and it gives me a
countdown plus concrete suggestions like "cancel that gym membership and
retire 4 months earlier." Everything runs on my own machine: no bank logins,
no aggregators, no analytics, no cloud.

![The firewatch dashboard on synthetic demo data: FIRE countdown, net worth, and spending](../assets/firewatch-dashboard.png)

## Getting the math right

Most FIRE calculators multiply your annual spending by 25 and call it a day.
I wanted a countdown I could actually trust, so most of the work went into
the details that the simple math gets wrong:

- Retirement accounts are locked until 59½, so taxable accounts have to
  bridge the gap before 401k and HSA money is allowed to count. Pre-tax
  balances get a tax haircut, and illiquid holdings don't count toward the
  runway at all. The naive 25x date is shown alongside so you can see the
  difference.
- Spending never double-counts. Card payoffs are detected as transfers
  between my own accounts, and overlapping statement uploads get
  deduplicated, so batch-uploading messy statements every few months just
  works.
- All of the money math is done in integer cents, and dates are plain month
  arithmetic on ISO strings. No floating-point dollars anywhere.
- The solver simulates month by month, then binary searches for the earliest
  retirement date that works.

A few other decisions I made along the way:

- The financial engine is pure logic with no I/O, which makes it easy to
  test. The server and dashboard are thin layers on top.
- Everything stays local. The only network calls are anonymous price lookups.
  Even the AI will be local: statement extraction and transaction
  categorization will run on a model on my own machine (llama.cpp), so no
  financial data is ever sent anywhere. The Apple Watch complication I have
  planned will talk to it over Tailscale; there will never be a public API.
- A public repo about private finances needs some guardrails, so the data
  directory lives outside the repo, a pre-commit hook blocks statement-like
  files and card-number-shaped strings, and every test fixture is synthetic.
- No native dependencies. Node's built-in SQLite means `pnpm install` never
  compiles anything.

## Status

Still early. I'm building it in phases that each end with a working system.
Phase 1, the financial engine and dashboard, is done. Statement ingestion,
local LLM statement extraction, and recurring-charge analytics are next. The
full roadmap is in the [repo](https://github.com/wLotherington/firewatch).
