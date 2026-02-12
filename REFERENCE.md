# AirPulse - Project Reference

## Overview
Static website showing Airbnb quarterly financial results starting from Q3 2025.
Data sourced exclusively from official Airbnb Shareholder Letters at investors.airbnb.com
(hosted on s26.q4cdn.com/656283129/).

**Owner:** Archit Sadana
**Site URL:** https://architsadana-commits.github.io/airbnb-quarterly-results/
**Repo:** https://github.com/architsadana-commits/airbnb-quarterly-results (public)

---

## Project Structure

```
airbnb-quarterly-results/
  index.html          # Page layout and structure
  styles.css          # All styling (responsive, dark hero, Airbnb palette)
  data.js             # ALL quarterly data - ONLY file to edit for new quarters
  charts.js           # Chart.js rendering - auto-reads from data.js
  airbnb-logo.svg     # Airbnb Bélo logo (symbol only, no wordmark)
  deploy.sh           # Legacy Cloudflare deploy script (not used - using GitHub Pages)
  REFERENCE.md        # This file
```

## Hosting

**Platform:** GitHub Pages (free)
**URL:** https://architsadana-commits.github.io/airbnb-quarterly-results/
**Repo:** https://github.com/architsadana-commits/airbnb-quarterly-results
**Branch:** main, path: / (root)
**Auto-deploy:** Yes — every `git push` to main triggers a rebuild

---

## IMPORTANT: Q4 2025 Update

**The site does NOT auto-update when Q4 results come out.** It is a static site with manually entered data. You must update the data yourself (or ask Claude Code to do it).

### How to Add Q4 2025 (step-by-step)

**Step 1 — Get the data**
Download the Q4 2025 shareholder letter PDF from investors.airbnb.com when published.
Try this URL pattern:
```
https://s26.q4cdn.com/656283129/files/doc_financials/2025/q4/Airbnb_Q4-2025-Shareholder-Letter.pdf
```
Convert to text:
```bash
pdftotext ~/Downloads/Airbnb_Q4-2025-Shareholder-Letter.pdf /tmp/q4_2025.txt
```

**Step 2 — Edit data.js**
Open `~/vscode/airbnb-quarterly-results/data.js` and:
1. Uncomment the `Q4 '25` template block at the bottom of the `QUARTERS` array
2. Fill in the numbers from the shareholder letter
3. Update these variables at the top:
   - `LATEST_QUARTER` → `'Q4 2025'`
   - `LATEST_QUARTER_END` → `'December 31, 2025'`
   - `SHAREHOLDER_LETTER_DATE` → the publish date
4. Update `OUTLOOK` with any new forward guidance
5. Update `REGIONAL` with new regional performance data

**Step 3 — Update index.html**
- Hero section: update headline metrics
- Y/Y comparison table: Q4 2025 vs Q4 2024
- Q/Q comparison table: Q4 2025 vs Q3 2025
- Outlook section: replace with new guidance (Q1 2026)

**Step 4 — Push to deploy**
```bash
cd ~/vscode/airbnb-quarterly-results
git add .
git commit -m "Add Q4 2025 results"
git push
```
Site updates automatically within 1-2 minutes.

**Or just open Claude Code and say:**
> "Q4 2025 results are out. Update AirPulse with the new data from the shareholder letter."

---

## Key Metrics Tracked

| Metric | Source Field in data.js |
|--------|----------------------|
| Revenue | `revenue`, `revenueYoY`, `revenueYoYExFx` |
| Net Income | `netIncome`, `netIncomeMargin` |
| Adjusted EBITDA | `adjEbitda`, `ebitdaMargin` |
| Free Cash Flow | `fcf`, `fcfMargin`, `ttmFcf` |
| Nights & Seats Booked | `nightsBooked`, `nightsYoY` |
| Gross Booking Value | `gbv`, `gbvYoY`, `gbvYoYExFx` |
| Average Daily Rate | `adr`, `adrYoY` |
| Operating Cash Flow | `operatingCashFlow` |
| Cash & Liquid Assets | `cashAndLiquidAssets` |
| Share Repurchases | `shareRepurchases` |
| Implied Take Rate | `impliedTakeRate` |
| Fully Diluted Shares | `fullyDilutedShares` |

## Tech Stack
- HTML/CSS/JS (no build step, no framework)
- Chart.js 4.4.4 (via CDN)
- Inter font (via Google Fonts)
- GitHub Pages for hosting

## Data Sources

| Quarter | Source Document |
|---------|---------------|
| Q1 2023 – Q3 2025 | Airbnb Q3 2025 Shareholder Letter (Nov 6, 2025) |
| Q4 2025 | Pending — expected mid-to-late February 2026 |

All data extracted from official PDF at:
`s26.q4cdn.com/656283129/files/doc_financials/2025/q3/Airbnb_Q3-2025-Shareholder-Letter.pdf`
Extracted using `pdftotext` and verified against quarterly summary tables.

## Design
- **Header:** Airbnb Bélo (symbol only) + "AirPulse"
- **Hero:** Dark gradient with latest quarter headline metrics
- **Charts:** 11 interactive Chart.js visualizations (latest quarter highlighted)
- **Tables:** Y/Y comparison, Q/Q comparison, full historical data (scrollable)
- **Regional:** 4-region breakdown with growth rates
- **Outlook:** Forward guidance cards from latest shareholder letter

## Build & Deploy History
- **2026-02-12:** Initial build with Q3 2025 data. Deployed to GitHub Pages.
  - Repo: github.com/architsadana-commits/airbnb-quarterly-results
  - URL: architsadana-commits.github.io/airbnb-quarterly-results/
