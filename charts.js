// Charts - pulls all data from data.js
// To add a new quarter, only edit data.js — charts update automatically.

const LABELS = getLabels();
const HIGHLIGHT = getLatestIndex();

// Color palette
const CORAL = '#FF5A5F';
const CORAL_LIGHT = 'rgba(255, 90, 95, 0.15)';
const BLUE = '#0066FF';
const BLUE_LIGHT = 'rgba(0, 102, 255, 0.12)';
const GREEN = '#008A05';
const GREEN_LIGHT = 'rgba(0, 138, 5, 0.12)';
const DARK = '#222222';
const GRAY = '#B0B0B0';
const AMBER = '#E8A317';
const AMBER_LIGHT = 'rgba(232, 163, 23, 0.12)';

// Chart defaults
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.color = '#767676';
Chart.defaults.plugins.legend.display = false;
Chart.defaults.plugins.tooltip.backgroundColor = '#222222';
Chart.defaults.plugins.tooltip.titleFont = { weight: '600', size: 13 };
Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.displayColors = true;
Chart.defaults.plugins.tooltip.boxPadding = 4;

function highlightBg(baseColor, lightColor) {
  return getField('revenue').map((_, i) => i === HIGHLIGHT ? baseColor : lightColor);
}

function highlightPoint(color) {
  return getField('revenue').map((_, i) => i === HIGHLIGHT ? color : color.replace(')', ', 0.5)').replace('rgb', 'rgba'));
}

function highlightRadius() {
  return getField('revenue').map((_, i) => i === HIGHLIGHT ? 6 : 3);
}

// 1. Revenue Chart
new Chart(document.getElementById('revenueChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [{
      label: 'Revenue ($M)',
      data: getField('revenue'),
      backgroundColor: highlightBg(CORAL, 'rgba(255, 90, 95, 0.35)'),
      borderRadius: 6,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: ctx => `Revenue: $${ctx.raw.toLocaleString()}M` }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v / 1000}B` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 2. Net Income Chart
const niData = getField('netIncome');
new Chart(document.getElementById('netIncomeChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [{
      label: 'Net Income ($M)',
      data: niData,
      backgroundColor: niData.map((v, i) =>
        i === HIGHLIGHT ? (v >= 0 ? GREEN : '#C13515') : (v >= 0 ? GREEN_LIGHT : 'rgba(193,53,21,0.2)')
      ),
      borderColor: niData.map((v, i) =>
        i === HIGHLIGHT ? (v >= 0 ? GREEN : '#C13515') : 'transparent'
      ),
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const v = ctx.raw;
            return `Net Income: ${v < 0 ? '-' : ''}$${Math.abs(v).toLocaleString()}M`;
          }
        }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v / 1000}B` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 3. Adjusted EBITDA with margin line
new Chart(document.getElementById('ebitdaChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [
      {
        label: 'Adjusted EBITDA ($M)',
        data: getField('adjEbitda'),
        backgroundColor: highlightBg(CORAL, 'rgba(255, 90, 95, 0.35)'),
        borderRadius: 6,
        borderSkipped: false,
        yAxisID: 'y',
        order: 2,
      },
      {
        label: 'EBITDA Margin (%)',
        data: getField('ebitdaMargin'),
        type: 'line',
        borderColor: BLUE,
        backgroundColor: BLUE,
        pointBackgroundColor: getField('ebitdaMargin').map((_, i) => i === HIGHLIGHT ? BLUE : 'rgba(0,102,255,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y1',
        order: 1,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } }
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.datasetIndex === 0) return `EBITDA: $${ctx.raw.toLocaleString()}M`;
            return `Margin: ${ctx.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v.toLocaleString()}M` }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        max: 60,
        grid: { display: false },
        ticks: { callback: v => `${v}%` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 4. Free Cash Flow
new Chart(document.getElementById('fcfChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [{
      label: 'Free Cash Flow ($M)',
      data: getField('fcf'),
      backgroundColor: highlightBg(BLUE, 'rgba(0, 102, 255, 0.3)'),
      borderRadius: 6,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: ctx => `FCF: $${ctx.raw.toLocaleString()}M` }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v.toLocaleString()}M` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 5. TTM FCF
new Chart(document.getElementById('ttmFcfChart'), {
  type: 'line',
  data: {
    labels: LABELS,
    datasets: [{
      label: 'TTM Free Cash Flow ($M)',
      data: getField('ttmFcf'),
      borderColor: BLUE,
      backgroundColor: BLUE_LIGHT,
      fill: true,
      pointBackgroundColor: getField('ttmFcf').map((_, i) => i === HIGHLIGHT ? BLUE : 'rgba(0,102,255,0.5)'),
      pointRadius: highlightRadius(),
      borderWidth: 2.5,
      tension: 0.35,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: ctx => `TTM FCF: $${ctx.raw.toLocaleString()}M` }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${(v/1000).toFixed(1)}B` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 6. Nights & Seats Booked
new Chart(document.getElementById('nightsChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [
      {
        label: 'Nights & Seats Booked (M)',
        data: getField('nightsBooked'),
        backgroundColor: highlightBg('#6C63FF', 'rgba(108, 99, 255, 0.3)'),
        borderRadius: 6,
        borderSkipped: false,
        yAxisID: 'y',
        order: 2,
      },
      {
        label: 'Y/Y Growth (%)',
        data: getField('nightsYoY'),
        type: 'line',
        borderColor: CORAL,
        backgroundColor: CORAL,
        pointBackgroundColor: getField('nightsYoY').map((_, i) => i === HIGHLIGHT ? CORAL : 'rgba(255,90,95,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y1',
        order: 1,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } }
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.datasetIndex === 0) return `Booked: ${ctx.raw}M`;
            return `Y/Y: +${ctx.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 80,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `${v}M` }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        max: 25,
        grid: { display: false },
        ticks: { callback: v => `${v}%` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 7. GBV
new Chart(document.getElementById('gbvChart'), {
  type: 'bar',
  data: {
    labels: LABELS,
    datasets: [
      {
        label: 'GBV ($B)',
        data: getField('gbv'),
        backgroundColor: highlightBg(GREEN, 'rgba(0, 138, 5, 0.25)'),
        borderRadius: 6,
        borderSkipped: false,
        yAxisID: 'y',
        order: 2,
      },
      {
        label: 'Y/Y Growth (%)',
        data: getField('gbvYoY'),
        type: 'line',
        borderColor: CORAL,
        backgroundColor: CORAL,
        pointBackgroundColor: getField('gbvYoY').map((_, i) => i === HIGHLIGHT ? CORAL : 'rgba(255,90,95,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2,
        tension: 0.3,
        yAxisID: 'y1',
        order: 1,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } }
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            if (ctx.datasetIndex === 0) return `GBV: $${ctx.raw}B`;
            return `Y/Y: +${ctx.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 12,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v}B` }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        max: 25,
        grid: { display: false },
        ticks: { callback: v => `${v}%` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 8. ADR
new Chart(document.getElementById('adrChart'), {
  type: 'line',
  data: {
    labels: LABELS,
    datasets: [{
      label: 'ADR ($)',
      data: getField('adr'),
      borderColor: AMBER,
      backgroundColor: AMBER_LIGHT,
      fill: true,
      pointBackgroundColor: getField('adr').map((_, i) => i === HIGHLIGHT ? AMBER : 'rgba(232,163,23,0.5)'),
      pointRadius: highlightRadius(),
      borderWidth: 2.5,
      tension: 0.35,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: { label: ctx => `ADR: $${ctx.raw.toFixed(2)}` }
      }
    },
    scales: {
      y: {
        min: 150,
        max: 180,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `$${v}` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 9. Revenue Y/Y Growth
new Chart(document.getElementById('growthChart'), {
  type: 'line',
  data: {
    labels: LABELS,
    datasets: [
      {
        label: 'Revenue Y/Y (%)',
        data: getField('revenueYoY'),
        borderColor: CORAL,
        backgroundColor: CORAL_LIGHT,
        fill: true,
        pointBackgroundColor: getField('revenueYoY').map((_, i) => i === HIGHLIGHT ? CORAL : 'rgba(255,90,95,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2.5,
        tension: 0.35,
      },
      {
        label: 'Nights Booked Y/Y (%)',
        data: getField('nightsYoY'),
        borderColor: BLUE,
        backgroundColor: 'transparent',
        pointBackgroundColor: getField('nightsYoY').map((_, i) => i === HIGHLIGHT ? BLUE : 'rgba(0,102,255,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.35,
      },
      {
        label: 'GBV Y/Y (%)',
        data: getField('gbvYoY'),
        borderColor: GREEN,
        backgroundColor: 'transparent',
        pointBackgroundColor: getField('gbvYoY').map((_, i) => i === HIGHLIGHT ? GREEN : 'rgba(0,138,5,0.5)'),
        pointRadius: highlightRadius(),
        borderWidth: 2,
        borderDash: [2, 4],
        tension: 0.35,
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, pointStyle: 'circle', padding: 16, font: { size: 11 } }
      },
      tooltip: {
        callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.raw}%` }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 25,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `${v}%` }
      },
      x: { grid: { display: false } }
    }
  }
});

// 10. Regional Nights Booked Growth
new Chart(document.getElementById('regionalChart'), {
  type: 'bar',
  data: {
    labels: REGIONAL.regions.map(r => r.name),
    datasets: [{
      label: 'Nights Booked Y/Y Growth (%)',
      data: REGIONAL.regions.map(r => r.nightsGrowthApprox),
      backgroundColor: [
        'rgba(255, 90, 95, 0.7)',
        'rgba(0, 102, 255, 0.7)',
        'rgba(0, 138, 5, 0.7)',
        'rgba(108, 99, 255, 0.7)'
      ],
      borderRadius: 8,
      borderSkipped: false,
      barPercentage: 0.6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Growth: ~${REGIONAL.regions[ctx.dataIndex].nightsGrowth}`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 30,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `${v}%` }
      },
      y: { grid: { display: false } }
    }
  }
});

// 11. Regional ADR Change
new Chart(document.getElementById('adrRegionalChart'), {
  type: 'bar',
  data: {
    labels: REGIONAL.regions.map(r => r.name),
    datasets: [{
      label: 'ADR Y/Y Change (%)',
      data: REGIONAL.regions.map(r => r.adrChange),
      backgroundColor: [
        'rgba(255, 90, 95, 0.7)',
        'rgba(0, 102, 255, 0.7)',
        'rgba(0, 138, 5, 0.7)',
        'rgba(108, 99, 255, 0.7)'
      ],
      borderRadius: 8,
      borderSkipped: false,
      barPercentage: 0.6,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      tooltip: {
        callbacks: { label: ctx => `ADR Change: +${ctx.raw}%` }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 15,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { callback: v => `${v}%` }
      },
      y: { grid: { display: false } }
    }
  }
});
