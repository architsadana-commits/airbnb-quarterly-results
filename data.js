// =============================================================================
// Airbnb Quarterly Results - Data Source
// =============================================================================
// ALL data sourced from official Airbnb Shareholder Letters at investors.airbnb.com
// (hosted on s26.q4cdn.com/656283129/)
//
// HOW TO ADD A NEW QUARTER:
//   1. Download the new shareholder letter PDF from investors.airbnb.com
//   2. Add a new entry to the QUARTERS array below
//   3. Update LATEST_QUARTER label
//   4. Update the comparisons in HERO, YOY_COMPARISON, and QOQ_COMPARISON
//   5. Update REGIONAL and OUTLOOK sections
//   6. Redeploy: wrangler pages deploy . --project-name=airbnb-quarterly-results
// =============================================================================

const LATEST_QUARTER = 'Q4 2025';
const LATEST_QUARTER_END = 'December 31, 2025';
const SHAREHOLDER_LETTER_DATE = 'February 12, 2026';

// Each quarter's data from official shareholder letters
// Add new quarters by appending to this array
const QUARTERS = [
  {
    label: "Q1 '23", period: 'Q1 2023',
    revenue: 1818, revenueYoY: 20, revenueYoYExFx: 24,
    netIncome: 117, netIncomeMargin: 6,
    adjEbitda: 262, ebitdaMargin: 14,
    fcf: 1581, fcfMargin: 87,
    ttmFcf: 3790,
    nightsBooked: 121.1, nightsYoY: 19,
    gbv: 20.4, gbvYoY: 19,
    adr: 168.43, adrYoY: 0,
    operatingCashFlow: 1587,
    cashAndLiquidAssets: 10624,
    unearned: 2172,
  },
  {
    label: "Q2 '23", period: 'Q2 2023',
    revenue: 2484, revenueYoY: 18, revenueYoYExFx: 19,
    netIncome: 650, netIncomeMargin: 26,
    adjEbitda: 819, ebitdaMargin: 33,
    fcf: 900, fcfMargin: 36,
    ttmFcf: 3894,
    nightsBooked: 115.1, nightsYoY: 11,
    gbv: 19.1, gbvYoY: 13,
    adr: 166.01, adrYoY: 1,
    operatingCashFlow: 909,
    cashAndLiquidAssets: 10369,
    unearned: 2347,
  },
  {
    label: "Q3 '23", period: 'Q3 2023',
    revenue: 3397, revenueYoY: 18, revenueYoYExFx: 14,
    netIncome: 4374, netIncomeMargin: 129, // includes $2.8B one-time tax benefit
    adjEbitda: 1834, ebitdaMargin: 54,
    fcf: 1310, fcfMargin: 39,
    ttmFcf: 4246,
    nightsBooked: 113.2, nightsYoY: 14,
    gbv: 18.3, gbvYoY: 17,
    adr: 161.38, adrYoY: 3,
    operatingCashFlow: 1325,
    cashAndLiquidAssets: 10986,
    unearned: 1467,
  },
  {
    label: "Q4 '23", period: 'Q4 2023',
    revenue: 2218, revenueYoY: 17, revenueYoYExFx: 14,
    netIncome: -349, netIncomeMargin: -16,
    adjEbitda: 738, ebitdaMargin: 33,
    fcf: 46, fcfMargin: 2,
    ttmFcf: 3837,
    nightsBooked: 98.8, nightsYoY: 12,
    gbv: 15.5, gbvYoY: 15,
    adr: 156.73, adrYoY: 3,
    operatingCashFlow: 63,
    cashAndLiquidAssets: 10095,
    unearned: 1427,
  },
  {
    label: "Q1 '24", period: 'Q1 2024',
    revenue: 2142, revenueYoY: 18, revenueYoYExFx: 18,
    netIncome: 264, netIncomeMargin: 12,
    adjEbitda: 424, ebitdaMargin: 20,
    fcf: 1909, fcfMargin: 89,
    ttmFcf: 4165,
    nightsBooked: 132.6, nightsYoY: 9,
    gbv: 22.9, gbvYoY: 12,
    adr: 172.88, adrYoY: 3,
    operatingCashFlow: 1923,
    cashAndLiquidAssets: 11128,
    unearned: 2621,
  },
  {
    label: "Q2 '24", period: 'Q2 2024',
    revenue: 2748, revenueYoY: 11, revenueYoYExFx: 11,
    netIncome: 555, netIncomeMargin: 20,
    adjEbitda: 894, ebitdaMargin: 33,
    fcf: 1043, fcfMargin: 38,
    ttmFcf: 4308,
    nightsBooked: 125.1, nightsYoY: 9,
    gbv: 21.2, gbvYoY: 11,
    adr: 169.53, adrYoY: 2,
    operatingCashFlow: 1051,
    cashAndLiquidAssets: 11286,
    unearned: 2434,
  },
  {
    label: "Q3 '24", period: 'Q3 2024',
    revenue: 3732, revenueYoY: 10, revenueYoYExFx: 10,
    netIncome: 1368, netIncomeMargin: 37,
    adjEbitda: 1958, ebitdaMargin: 52,
    fcf: 1074, fcfMargin: 29,
    ttmFcf: 4072,
    nightsBooked: 122.8, nightsYoY: 8,
    gbv: 20.1, gbvYoY: 10,
    adr: 163.64, adrYoY: 1,
    operatingCashFlow: 1078,
    cashAndLiquidAssets: 11280,
    unearned: 1657,
  },
  {
    label: "Q4 '24", period: 'Q4 2024',
    revenue: 2480, revenueYoY: 12, revenueYoYExFx: 12,
    netIncome: 461, netIncomeMargin: 19,
    adjEbitda: 765, ebitdaMargin: 31,
    fcf: 458, fcfMargin: 18,
    ttmFcf: 4484,
    nightsBooked: 111.0, nightsYoY: 12,
    gbv: 17.6, gbvYoY: 13,
    adr: 158.13, adrYoY: 1,
    operatingCashFlow: 466,
    cashAndLiquidAssets: 10636,
    unearned: 1616,
  },
  {
    label: "Q1 '25", period: 'Q1 2025',
    revenue: 2272, revenueYoY: 6, revenueYoYExFx: 8,
    netIncome: 154, netIncomeMargin: 7,
    adjEbitda: 417, ebitdaMargin: 18,
    fcf: 1781, fcfMargin: 78,
    ttmFcf: 4356,
    nightsBooked: 143.1, nightsYoY: 8,
    gbv: 24.5, gbvYoY: 7,
    adr: 171.34, adrYoY: -1,
    operatingCashFlow: 1789,
    cashAndLiquidAssets: 11532,
    unearned: 2857,
  },
  {
    label: "Q2 '25", period: 'Q2 2025',
    revenue: 3096, revenueYoY: 13, revenueYoYExFx: 13,
    netIncome: 642, netIncomeMargin: 21,
    adjEbitda: 1043, ebitdaMargin: 34,
    fcf: 962, fcfMargin: 31,
    ttmFcf: 4275,
    nightsBooked: 134.4, nightsYoY: 7,
    gbv: 23.5, gbvYoY: 11,
    adr: 174.48, adrYoY: 3,
    operatingCashFlow: 975,
    cashAndLiquidAssets: 11400,
    unearned: 1820,
  },
  {
    label: "Q3 '25", period: 'Q3 2025',
    revenue: 4095, revenueYoY: 10, revenueYoYExFx: 10,
    netIncome: 1374, netIncomeMargin: 34,
    adjEbitda: 2051, ebitdaMargin: 50,
    fcf: 1349, fcfMargin: 33,
    ttmFcf: 4550, ttmFcfMargin: 38,
    nightsBooked: 133.6, nightsYoY: 9,
    gbv: 22.9, gbvYoY: 14, gbvYoYExFx: 12,
    adr: 171.29, adrYoY: 5,
    operatingCashFlow: 1356,
    cashAndLiquidAssets: 11719,
    fundsHeldForGuests: 7209,
    unearned: 1820,
    shareRepurchases: 857,
    remainingBuybackAuth: 6600,
    fullyDilutedShares: 646,
    impliedTakeRate: 17.9,
    // Additional Q3 2025 details
    appBookingShare: 62, // % of nights booked via app
    appBookingGrowth: 17, // app bookings Y/Y growth %
  },

  {
    label: "Q4 '25", period: 'Q4 2025',
    revenue: 2778, revenueYoY: 12, revenueYoYExFx: 11,
    netIncome: 341, netIncomeMargin: 12,
    adjEbitda: 786, ebitdaMargin: 28,
    fcf: 521, fcfMargin: 19,
    ttmFcf: 4613, ttmFcfMargin: 38,
    nightsBooked: 121.9, nightsYoY: 10,
    gbv: 20.4, gbvYoY: 16, gbvYoYExFx: 13,
    adr: 167.51, adrYoY: 6,
    operatingCashFlow: 526,
    cashAndLiquidAssets: 11049,
    fundsHeldForGuests: 6959,
    unearned: 1743,
    shareRepurchases: 1100,
    remainingBuybackAuth: 5600,
    fullyDilutedShares: 614,
    impliedTakeRate: 13.6,
    appBookingShare: 64,
    appBookingGrowth: 20,
  },
];

// Q1 2026 guidance (from Q4 2025 shareholder letter)
const OUTLOOK = {
  quarter: 'Q1 2026',
  items: [
    {
      label: 'Q1 2026 Revenue Guidance',
      value: '$2.59B - $2.63B',
      detail: '14% to 16% Y/Y growth, inclusive of ~3pp FX tailwind. Implied take rate expected up slightly Y/Y.',
    },
    {
      label: 'Q1 2026 GBV Growth',
      value: 'Low-teens Y/Y',
      detail: 'Driven by high-single-digit growth in Nights & Seats Booked and moderate ADR increase (price appreciation + FX).',
    },
    {
      label: 'Q1 2026 Adj. EBITDA Margin',
      value: '~Flat Y/Y',
      detail: 'Approximately flat year-over-year in Q1 2026.',
    },
    {
      label: 'FY 2026 Revenue Growth',
      value: 'At least low-double-digits',
      detail: 'Revenue growth expected to accelerate. EBITDA margin stable Y/Y as top-line efficiencies reinvested in marketing, product, and technology.',
    },
  ],
};

// Regional performance for latest quarter (Q4 2025)
const REGIONAL = {
  quarter: 'Q4 2025',
  regions: [
    {
      name: 'North America',
      nightsGrowth: 'Mid-single digit',
      nightsGrowthApprox: 5,
      adrChange: 5,
      adrChangeExFx: null,
      highlights: 'Continued strong demand for domestic travel and trips with longer lead times. ADR +5% driven by mix shift toward short-term stays and entire homes with 4+ bedrooms.',
    },
    {
      name: 'EMEA',
      nightsGrowth: 'High-single digit',
      nightsGrowthApprox: 8,
      adrChange: 12,
      adrChangeExFx: 4,
      highlights: 'Acceleration vs Q3 2025 with broad improvement across core and expansion markets including UK, Spain, and Italy. ADR +12% (+4% ex-FX).',
    },
    {
      name: 'Latin America',
      nightsGrowth: 'High-teens%',
      nightsGrowthApprox: 18,
      adrChange: 9,
      adrChangeExFx: 3,
      highlights: 'Brazil origin nights +20%, first-time bookers +17%. Mexico origin nights accelerated to high-teens Y/Y. ADR +9% (+3% ex-FX).',
    },
    {
      name: 'Asia Pacific',
      nightsGrowth: 'Mid-teens%',
      nightsGrowthApprox: 15,
      adrChange: 2,
      adrChangeExFx: 2,
      highlights: 'Continued strength in Japan domestic travel. India origin nights +50% Y/Y, first-time bookers +60% Y/Y.',
    },
  ],
};

// Helper: extract arrays for charts
function getField(field) {
  return QUARTERS.map(q => q[field]);
}

function getLabels() {
  return QUARTERS.map(q => q.label);
}

function getLatestIndex() {
  return QUARTERS.length - 1;
}
