# AirPulse - Project Reference

## Overview
Static website showing Airbnb quarterly financial results starting from Q3 2025.
Data sourced exclusively from official Airbnb Shareholder Letters at investors.airbnb.com
(hosted on s26.q4cdn.com/656283129/).

**Owner:** Archit Sadana (private, not for redistribution)
**Access:** Airbnb employees only via Cloudflare Access (@airbnb.com email gate)

---

## Project Structure

```
airbnb-quarterly-results/
  index.html          # Page layout and structure
  styles.css          # All styling (responsive, dark hero, Airbnb palette)
  data.js             # ALL quarterly data - only file to edit for new quarters
  charts.js           # Chart.js rendering - auto-reads from data.js
  airbnb-logo.svg     # Airbnb Bélo logo (symbol only, no wordmark)
  deploy.sh           # One-command Cloudflare Pages deploy
  REFERENCE.md        # This file
```

## How to Add a New Quarter (e.g., Q4 2025)

1. Download the shareholder letter PDF from investors.airbnb.com
   - URL pattern: `https://s26.q4cdn.com/656283129/files/doc_financials/YYYY/qN/Airbnb_QN-YYYY-Shareholder-Letter.pdf`
   - Convert to text: `pdftotext <file>.pdf <file>.txt`

2. Edit `data.js` only:
   - Uncomment the Q4 '25 template at the bottom of the `QUARTERS` array
   - Fill in numbers from the shareholder letter
   - Update `LATEST_QUARTER`, `LATEST_QUARTER_END`, `SHAREHOLDER_LETTER_DATE`
   - Update `OUTLOOK` section with any new forward guidance
   - Update `REGIONAL` section with new regional data

3. Update `index.html` comparison tables:
   - Y/Y comparison table (Q4 2025 vs Q4 2024)
   - Q/Q comparison table (Q4 2025 vs Q3 2025)
   - Hero section cards with latest quarter highlights

4. Redeploy:
   ```bash
   cd ~/vscode/airbnb-quarterly-results
   wrangler pages deploy . --project-name=airbnb-quarterly-results
   ```

Charts, full data table, and trend lines update automatically from data.js.

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

## Hosting & Access Control

**Platform:** Cloudflare Pages (free tier)
**URL:** `https://airbnb-quarterly-results.pages.dev`
**Auth:** Cloudflare Access with @airbnb.com email restriction

### Setup Steps (one-time)
1. `wrangler login` (authenticate with Cloudflare)
2. `wrangler pages deploy . --project-name=airbnb-quarterly-results`
3. Cloudflare Zero Trust dashboard (one.dash.cloudflare.com):
   - Access > Applications > Add Self-hosted
   - Domain: `airbnb-quarterly-results.pages.dev`
   - Policy: Allow → Emails ending in `@airbnb.com`

### Redeploy (after edits)
```bash
cd ~/vscode/airbnb-quarterly-results
wrangler pages deploy . --project-name=airbnb-quarterly-results
```

## Tech Stack
- HTML/CSS/JS (no build step, no framework)
- Chart.js 4.4.4 (via CDN)
- Inter font (via Google Fonts)
- Cloudflare Pages + Access for hosting/auth

## Data Sources Used in Build

| Quarter | Source Document |
|---------|---------------|
| Q1 2023 – Q3 2025 | Airbnb Q3 2025 Shareholder Letter (Nov 6, 2025) |
| Q4 2025 | Pending — expected mid-to-late February 2026 |

All data was extracted from the official PDF at:
`s26.q4cdn.com/656283129/files/doc_financials/2025/q3/Airbnb_Q3-2025-Shareholder-Letter.pdf`

Extracted using `pdftotext` and verified against the quarterly summary tables in the letter.

## Design Decisions
- **Header:** Airbnb Bélo (symbol only) + "AirPulse"
- **Hero:** Dark gradient with key Q3 2025 metrics
- **Charts:** 11 interactive Chart.js visualizations with latest quarter highlighted
- **Tables:** Y/Y comparison, Q/Q comparison, full historical data (scrollable)
- **Regional:** 4-region breakdown with growth rates and highlights
- **Outlook:** Forward guidance cards from latest shareholder letter
- **Privacy:** noindex/nofollow meta, "Private & Confidential" badge, Cloudflare Access
