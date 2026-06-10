import React, { useState, useMemo } from 'react';
import './MarketPrices.css';

// ─── Static crop data ────────────────────────────────────────────────────────
const CROPS_DATA = [
  {
    id: 1,
    name: 'Rice',
    market: 'Hyderabad APMC',
    price: 2450,
    prevPrice: 2310,
    unit: '₹ / Quintal',
    trend: 'up',
    change: '+5.8%',
    changeAmt: '+140',
    featured: false,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    sparkline: [55, 60, 52, 68, 72, 65, 78, 85, 80, 90],
    season: 'Kharif',
    quality: 'Grade A',
  },
  {
    id: 2,
    name: 'Cotton',
    market: 'Warangal Mandi',
    price: 7200,
    prevPrice: 6850,
    unit: '₹ / Quintal',
    trend: 'up',
    change: '+5.1%',
    changeAmt: '+350',
    featured: true,
    image: 'data:image/jpeg;base64,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',
    sparkline: [50, 55, 62, 70, 66, 74, 80, 76, 88, 92],
    season: 'Kharif',
    quality: 'Long Staple',
  },
  {
    id: 3,
    name: 'Tomato',
    market: 'Kurnool APMC',
    price: 1120,
    prevPrice: 1350,
    unit: '₹ / Quintal',
    trend: 'down',
    change: '-17%',
    changeAmt: '-230',
    featured: false,
    image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80',
    sparkline: [95, 88, 92, 85, 78, 70, 65, 60, 55, 48],
    season: 'Rabi',
    quality: 'Fresh',
  },
  {
    id: 4,
    name: 'Maize',
    market: 'Nizamabad Mandi',
    price: 1875,
    prevPrice: 1820,
    unit: '₹ / Quintal',
    trend: 'up',
    change: '+3.0%',
    changeAmt: '+55',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
    sparkline: [60, 62, 58, 64, 66, 70, 68, 72, 74, 76],
    season: 'Kharif',
    quality: 'Grade B',
  },
  {
    id: 5,
    name: 'Groundnut',
    market: 'Nandyal APMC',
    price: 5640,
    prevPrice: 5520,
    unit: '₹ / Quintal',
    trend: 'up',
    change: '+2.2%',
    changeAmt: '+120',
    featured: false,
    image: 'https://images.unsplash.com/photo-1567892737950-30c4db37cd89?w=600&q=80',
    sparkline: [50, 54, 58, 56, 62, 65, 67, 70, 72, 74],
    season: 'Kharif',
    quality: 'Bold',
  },
  {
    id: 6,
    name: 'Onion',
    market: 'Mehboob Nagar',
    price: 980,
    prevPrice: 980,
    unit: '₹ / Quintal',
    trend: 'stable',
    change: '0%',
    changeAmt: '0',
    featured: false,
    image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&q=80',
    sparkline: [68, 65, 70, 68, 72, 69, 71, 70, 68, 70],
    season: 'Rabi',
    quality: 'Medium',
  },
];

// ─── Sparkline SVG ────────────────────────────────────────────────────────────
function Sparkline({ data, trend }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100, h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const color = trend === 'up' ? '#4caf75' : trend === 'down' ? '#e05252' : '#c8a838';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100" height={h} style={{ display: 'block', marginBottom: 12 }}>
      <defs>
        <linearGradient id={`grad-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#grad-${trend})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last dot */}
      {(() => {
        const last = data[data.length - 1];
        const lx = w;
        const ly = h - ((last - min) / range) * (h - 4) - 2;
        return <circle cx={lx} cy={ly} r="2.5" fill={color} />;
      })()}
    </svg>
  );
}

// ─── Crop Card ────────────────────────────────────────────────────────────────
function CropCard({ crop }) {
  const trendLabel = crop.trend === 'up' ? `↑ Rising` : crop.trend === 'down' ? `↓ Falling` : `→ Stable`;
  const trendClass = `crop-trend-badge trend-${crop.trend === 'stable' ? 'stable' : crop.trend === 'up' ? 'up' : 'down'}`;
  const changeClass = `crop-change ${crop.trend === 'up' ? 'up' : 'down'}`;

  return (
    <div className={`crop-card${crop.featured ? ' featured' : ''}`}>
      <div className="crop-image-wrap">
        <img src={crop.image} alt={crop.name} loading="lazy" />
        <div className="crop-image-overlay" />
        <span className={trendClass}>{trendLabel}</span>
      </div>

      <div className="crop-info">
        <div className="crop-name-row">
          <span className="crop-name">{crop.name}</span>
          <span className="crop-market">{crop.market}</span>
        </div>

        <div className="crop-price-row">
          <span className="crop-price">₹{crop.price.toLocaleString('en-IN')}</span>
          <span className="crop-unit">{crop.unit.replace('₹ / ', '/ ')}</span>
          {crop.trend !== 'stable' && (
            <span className={changeClass}>{crop.change}</span>
          )}
        </div>

        <Sparkline data={crop.sparkline} trend={crop.trend} />

        <div className="crop-footer">
          <span className="crop-meta-tag">
            🌾 {crop.season} · {crop.quality}
          </span>
          <button className="view-detail-btn">View Details →</button>
        </div>
      </div>
    </div>
  );
}

// ─── Market Table Row ─────────────────────────────────────────────────────────
function TableRow({ crop }) {
  const up = crop.trend === 'up';
  const down = crop.trend === 'down';
  return (
    <tr>
      <td>
        <div className="td-crop">
          <span
            className="td-crop-dot"
            style={{ background: up ? '#4caf75' : down ? '#e05252' : '#c8a838' }}
          />
          {crop.name}
        </div>
      </td>
      <td className="td-price">₹{crop.price.toLocaleString('en-IN')}</td>
      <td className={up ? 'td-change-up' : down ? 'td-change-down' : ''}>
        {crop.change}
      </td>
      <td>{crop.changeAmt !== '0' ? `₹${crop.changeAmt}` : '—'}</td>
      <td><span className="td-market">{crop.market}</span></td>
      <td>{crop.season}</td>
      <td>{crop.quality}</td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MarketPrices() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Rising', 'Falling', 'Stable'];

  const filteredCrops = useMemo(() => {
    return CROPS_DATA.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.market.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Rising'  && c.trend === 'up') ||
        (activeFilter === 'Falling' && c.trend === 'down') ||
        (activeFilter === 'Stable'  && c.trend === 'stable');
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  const risingCount  = CROPS_DATA.filter(c => c.trend === 'up').length;
  const fallingCount = CROPS_DATA.filter(c => c.trend === 'down').length;
  const topCrop      = [...CROPS_DATA].sort((a, b) => b.price - a.price)[0];

  // Date
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="market-dashboard">
      {/* ── Header ── */}
      <header className="market-header">
        <div className="header-top">
          <div className="brand">
            <div className="brand-icon">📊</div>
            <div className="brand-text">
              <h1>Smart Farmer Market</h1>
              <p>Live Mandi Prices · Telangana &amp; AP</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="live-badge">
              <span className="live-dot" />
              LIVE
            </span>
            <span className="last-updated">Updated: {dateStr}</span>
          </div>
        </div>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search crop or market…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* ── Body ── */}
      <div className="market-body">

        {/* ── Stats ── */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">🌾 Total Crops</div>
            <div className="stat-value">{CROPS_DATA.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">📈 Rising</div>
            <div className="stat-value green">{risingCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">📉 Falling</div>
            <div className="stat-value red">{fallingCount}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">🏆 Top Price</div>
            <div className="stat-value gold">{topCrop.name}</div>
          </div>
        </div>

        {/* ── Crop Cards ── */}
        <div className="section-header">
          <h2 className="section-title">Crop Prices</h2>
          <div className="filter-tabs">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-tab${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredCrops.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '24px 0', fontSize: 14 }}>
            No crops match your search.
          </p>
        ) : (
          <div className="crops-grid">
            {filteredCrops.map(crop => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        )}

        {/* ── Market Table ── */}
        <div className="market-table-section">
          <div className="table-header">
            <div>
              <div className="table-title">All Market Prices</div>
              <div className="table-subtitle">Aggregated from APMC &amp; Mandi portals</div>
            </div>
          </div>
          <table className="market-table">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Price</th>
                <th>Change %</th>
                <th>Change ₹</th>
                <th>Market</th>
                <th>Season</th>
                <th>Quality</th>
              </tr>
            </thead>
            <tbody>
              {CROPS_DATA.map(crop => (
                <TableRow key={crop.id} crop={crop} />
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}