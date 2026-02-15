# AirPulse - Project Reference

## Overview
Static website showing Airbnb quarterly financial results from Q1 2023 onward.
Data sourced exclusively from official Airbnb Shareholder Letters at investors.airbnb.com
(hosted on s26.q4cdn.com/656283129/).

**Owner:** Archit Sadana
**Site URL:** https://architsadana-commits.github.io/airbnb-quarterly-results/
**Repo:** https://github.com/architsadana-commits/airbnb-quarterly-results (public)
**Current Data Through:** Q4 2025

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

## IMPORTANT: How to Add a New Quarter

**The site does NOT auto-update when results come out.** It is a static site with manually entered data. You must update the data yourself (or ask Claude Code to do it).

### Generic Steps for Any New Quarter (e.g. Q1 2026)

**Step 1 — Get the data**
Download the shareholder letter PDF from investors.airbnb.com when published.
URL pattern:
```
https://s26.q4cdn.com/656283129/files/doc_financials/{year}/q{quarter}/Airbnb_Q{quarter}-{year}-Shareholder-Letter.pdf
```
Example for Q1 2026:
```
https://s26.q4cdn.com/656283129/files/doc_financials/2026/q1/Airbnb_Q1-2026-Shareholder-Letter.pdf
```
Convert to text:
```bash
pdftotext ~/Downloads/Airbnb_Q1-2026-Shareholder-Letter.pdf /tmp/q1_2026.txt
```

**Step 2 — Edit data.js**
Open `~/vscode/airbnb-quarterly-results/data.js` and:
1. Add a new entry at the end of the `QUARTERS` array (see template below)
2. Update these variables at the top:
   - `LATEST_QUARTER` → e.g. `'Q1 2026'`
   - `LATEST_QUARTER_END` → e.g. `'March 31, 2026'`
   - `SHAREHOLDER_LETTER_DATE` → the publish date
3. Update `OUTLOOK` with new forward guidance (next quarter + full year)
4. Update `REGIONAL` with new regional performance data (quarter label + 4 regions)

New quarter template for data.js:
```javascript
{
  label: "Q1 '26", period: 'Q1 2026',
  revenue: ????, revenueYoY: ??, revenueYoYExFx: ??,
  netIncome: ????, netIncomeMargin: ??,
  adjEbitda: ???, ebitdaMargin: ??,
  fcf: ???, fcfMargin: ??,
  ttmFcf: ????, ttmFcfMargin: ??,
  nightsBooked: ???.?, nightsYoY: ??,
  gbv: ??.?, gbvYoY: ??, gbvYoYExFx: ??,
  adr: ???.??, adrYoY: ??,
  operatingCashFlow: ????,
  cashAndLiquidAssets: ?????,
  fundsHeldForGuests: ????,
  unearned: ????,
  shareRepurchases: ???,
  remainingBuybackAuth: ????,
  fullyDilutedShares: ???,
  impliedTakeRate: ??.?,
  appBookingShare: ??,
  appBookingGrowth: ??,
},
```

**Step 3 — Update index.html (9 locations)**
1. **Hero section (~line 29):** Update headline, subtitle date, and 6 metric cards
2. **Section header (~line 74):** Update range text "through Q_ 20__"
3. **Y/Y comparison table (~line 161):** New quarter vs same quarter prior year (all 12 rows)
4. **Q/Q comparison table (~line 258):** New quarter vs previous quarter (all 8 rows)
5. **Full quarterly data table header (~line 343):** Add new `<th class="highlight-col">` column, move highlight class from previous quarter
6. **Full quarterly data table rows:** Add `<td class="highlight-col"><strong>value</strong></td>` to each of the 13 metric rows, remove highlight from previous quarter's cells
7. **Regional performance section (~line 546):** Update heading, chart titles, and 4 regional cards
8. **Outlook section (~line 594):** Update heading, subtitle, and 4 outlook cards
9. **Balance sheet section (~line 627):** Update date and 6 balance sheet cards
10. **Footer (~line 665):** Update data source citation

**Step 4 — Update cache-busting version**
In `index.html`, update the query string on script tags at the bottom:
```html
<script src="data.js?v=2026q1"></script>
<script src="charts.js?v=2026q1"></script>
```
This forces browsers to fetch the latest files instead of using cached versions.

**Step 5 — Push to deploy**
```bash
cd ~/vscode/airbnb-quarterly-results
git add data.js index.html REFERENCE.md
git commit -m "Add Q1 2026 results"
git push
```
Site updates automatically within 1-2 minutes.

**Or just open Claude Code and say:**
> "Update the site with Q1 2026 results released"

Claude Code will automatically download the PDF, extract the data, and update all files.

---

## Key Metrics Tracked

| Metric | Source Field in data.js |
|--------|----------------------|
| Revenue | `revenue`, `revenueYoY`, `revenueYoYExFx` |
| Net Income | `netIncome`, `netIncomeMargin` |
| Adjusted EBITDA | `adjEbitda`, `ebitdaMargin` |
| Free Cash Flow | `fcf`, `fcfMargin`, `ttmFcf`, `ttmFcfMargin` |
| Nights & Seats Booked | `nightsBooked`, `nightsYoY` |
| Gross Booking Value | `gbv`, `gbvYoY`, `gbvYoYExFx` |
| Average Daily Rate | `adr`, `adrYoY` |
| Operating Cash Flow | `operatingCashFlow` |
| Cash & Liquid Assets | `cashAndLiquidAssets` |
| Funds Held for Guests | `fundsHeldForGuests` |
| Unearned Fees | `unearned` |
| Share Repurchases | `shareRepurchases` |
| Remaining Buyback Auth | `remainingBuybackAuth` |
| Implied Take Rate | `impliedTakeRate` |
| Fully Diluted Shares | `fullyDilutedShares` |
| App Booking Share | `appBookingShare`, `appBookingGrowth` |

## Where to Find Each Number in the Shareholder Letter

The PDF has a consistent structure. Here's where to find each metric:

| Metric | Location in PDF |
|--------|----------------|
| Revenue, Revenue Y/Y, ex-FX | Page 1 summary box + "Quarterly Summary" table near end |
| Net Income, NI Margin | Page 1 summary box + income statement |
| Adj. EBITDA, Margin | Page 1 summary box + EBITDA reconciliation table |
| FCF, FCF Margin, TTM FCF | Page 1 summary box + FCF reconciliation table |
| Nights Booked, Y/Y | Page 1 summary box + "Quarterly Summary" table |
| GBV, Y/Y, ex-FX | Page 1 summary box + "Quarterly Summary" table |
| ADR, Y/Y | "Quarterly Summary" table (labeled "GBV per Night and Seats Booked") |
| Operating Cash Flow | "Balance Sheet and Cash Flows" section + FCF reconciliation |
| Cash & Liquid Assets | "Balance Sheet and Cash Flows" section + quarterly summary |
| Funds Held for Guests | "Balance Sheet and Cash Flows" section + quarterly summary |
| Unearned Fees | Quarterly summary table (near balance sheet data) |
| Share Repurchases | "Capital Allocation" section |
| Remaining Buyback Auth | "Capital Allocation" section |
| Fully Diluted Shares | Income statement (diluted weighted-average shares) |
| Implied Take Rate | "Monetization and Take Rate" section |
| App Booking Share/Growth | "Business and Financial Performance" section |
| Regional Data | "Geographic Performance" section (4 bullet points) |
| Outlook/Guidance | "Outlook" section (Q1 + Full Year guidance) |

## Tech Stack
- HTML/CSS/JS (no build step, no framework)
- Chart.js 4.4.4 (via CDN)
- Inter font (via Google Fonts)
- GitHub Pages for hosting

## Data Sources

| Quarter | Source Document |
|---------|---------------|
| Q1 2023 – Q3 2025 | Airbnb Q3 2025 Shareholder Letter (Nov 6, 2025) |
| Q4 2025 | Airbnb Q4 2025 Shareholder Letter (Feb 12, 2026) |

All data extracted from official PDFs at:
`s26.q4cdn.com/656283129/files/doc_financials/2025/q3/Airbnb_Q3-2025-Shareholder-Letter.pdf`
`s26.q4cdn.com/656283129/files/doc_financials/2025/q4/Airbnb_Q4-2025-Shareholder-Letter.pdf`
Extracted using `pdftotext` and verified against quarterly summary tables.

## Design
- **Header:** Airbnb Bélo (symbol only) + "AirPulse"
- **Hero:** Dark gradient with latest quarter headline metrics
- **Charts:** 11 interactive Chart.js visualizations (latest quarter highlighted)
- **Tables:** Y/Y comparison, Q/Q comparison, full historical data (scrollable)
- **Regional:** 4-region breakdown with growth rates
- **Outlook:** Forward guidance cards from latest shareholder letter

## Known Gotchas

1. **Browser caching:** Always update the `?v=` query parameter on `<script>` tags in `index.html` when updating data. Without this, browsers will serve stale `data.js` and charts won't reflect new data.
2. **charts.js is fully dynamic:** It reads everything from `data.js` via `getLabels()`, `getField()`, `getLatestIndex()`. No changes needed to `charts.js` when adding a new quarter.
3. **index.html has hardcoded values:** The hero, comparison tables, regional highlights, outlook cards, and balance sheet cards all contain hardcoded numbers that must be manually updated. Only the 11 charts auto-update.
4. **Highlight class migration:** When adding a new quarter column to the full data table, you must move `class="highlight-col"` from the previous quarter's `<th>` and `<td>` elements to the new quarter's elements.
5. **Q/Q comparison seasonality:** Quarter-over-quarter comparisons will often show large negative changes (e.g. Q4 vs Q3) due to travel seasonality. This is normal — Q3 is peak travel season.
6. **Net income margin >100%:** Q3 2023 shows 129% NI margin due to a one-time $2.8B tax benefit. This is correct per the shareholder letter.

## Build & Deploy History
- **2026-02-15:** Added Q4 2025 data from shareholder letter published Feb 12, 2026. Fixed browser caching issue by adding `?v=` cache-busting to script tags.
- **2026-02-12:** Initial build with Q3 2025 data. Deployed to GitHub Pages.
  - Repo: github.com/architsadana-commits/airbnb-quarterly-results
  - URL: architsadana-commits.github.io/airbnb-quarterly-results/
