import React, { useState, useEffect, useRef } from 'react';
import './FarmAnalytics.css';

// ─── Data ─────────────────────────────────────────────────────────────────────
const WEEKLY_QUERIES = [
  { day: 'Mon', value: 28, today: false },
  { day: 'Tue', value: 42, today: false },
  { day: 'Wed', value: 35, today: false },
  { day: 'Thu', value: 55, today: false },
  { day: 'Fri', value: 48, today: false },
  { day: 'Sat', value: 38, today: false },
  { day: 'Sun', value: 47, today: true },
];

const MONTHLY_QUERIES = [
  { day: 'W1', value: 180, today: false },
  { day: 'W2', value: 220, today: false },
  { day: 'W3', value: 195, today: false },
  { day: 'W4', value: 260, today: true },
];

const TOPICS = [
  { name: 'Fertilizers', pct: 70, color: '#4caf75' },
  { name: 'Pests & Disease', pct: 55, color: '#f5a623' },
  { name: 'Soil Health', pct: 40, color: '#4a9eff' },
  { name: 'Weather Impact', pct: 35, color: '#c8a838' },
  { name: 'Market Prices', pct: 28, color: '#a3c748' },
];

const ACTIVITIES = [
  { icon: '🌾', bg: 'rgba(163,199,72,0.12)',  title: 'Cotton price alert triggered — Warangal Mandi up 5.1%', time: '2 min ago' },
  { icon: '🤖', bg: 'rgba(74,158,255,0.12)',  title: 'AI Assistant answered 3 queries on fertilizer dosage', time: '14 min ago' },
  { icon: '🦠', bg: 'rgba(224,82,82,0.12)',   title: 'Disease detected in uploaded crop image (Tomato blight)', time: '1 hr ago' },
  { icon: '📋', bg: 'rgba(245,166,35,0.12)',  title: 'Task "Irrigation — Block C" marked as completed', time: '2 hr ago' },
  { icon: '🌦️', bg: 'rgba(163,199,72,0.08)', title: 'Weather advisory issued for Hyderabad region', time: '3 hr ago' },
  { icon: '💬', bg: 'rgba(200,168,56,0.12)',  title: 'New community post: "Best time to sow Maize in Telangana?"', time: '5 hr ago' },
];

const CROP_HEALTH = [
  { name: 'Cotton',     status: 'good',   health: 94, lastCheck: 'Today',      market: 'Warangal' },
  { name: 'Rice',       status: 'good',   health: 88, lastCheck: 'Today',      market: 'Hyderabad' },
  { name: 'Tomato',     status: 'warn',   health: 62, lastCheck: 'Yesterday',  market: 'Kurnool' },
  { name: 'Maize',      status: 'good',   health: 80, lastCheck: 'Today',      market: 'Nizamabad' },
  { name: 'Groundnut',  status: 'warn',   health: 71, lastCheck: '2 days ago', market: 'Nandyal' },
];

const TASK_BREAKDOWN = [
  { label: 'Completed', pct: 60, color: '#4caf75' },
  { label: 'In Progress', pct: 20, color: '#4a9eff' },
  { label: 'Pending',   pct: 20, color: '#f5a623' },
];

// ─── Donut Chart ──────────────────────────────────────────────────────────────
function DonutChart({ segments, size = 180, stroke = 28 }) {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = segments.map(seg => {
    const len = (seg.pct / 100) * circumference;
    const gap = 3;
    const slice = { ...seg, dasharray: `${len - gap} ${circumference - len + gap}`, offset };
    offset += len;
    return slice;
  });

  const mainPct = segments[0]?.pct ?? 0;

  return (
    <div className="donut-wrap">
      <div className="donut-chart-container" style={{ width: size, height: size }}>
        <svg
          className="donut-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {slices.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={s.dasharray}
              strokeDashoffset={-s.offset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          ))}
        </svg>
        <div className="donut-center">
          <span className="donut-pct">{mainPct}%</span>
          <span className="donut-pct-label">Done</span>
        </div>
      </div>

      <div className="donut-legend">
        {segments.map((s, i) => (
          <div className="legend-row" key={i}>
            <div className="legend-left">
              <span className="legend-dot" style={{ background: s.color }} />
              {s.label}
            </div>
            <span className="legend-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div className="bar-chart-wrap">
        {data.map((d, i) => (
          <div className="bar-col" key={i}>
            <div
              className={`bar-fill${d.today ? ' today' : ''}`}
              style={{
                height: `${(d.value / max) * 88}%`,
                animationDelay: `${i * 0.07}s`,
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <span
              style={{
                fontSize: 10,
                color: d.today ? 'var(--gold-light)' : 'var(--text-muted)',
                fontWeight: d.today ? 700 : 500,
              }}
            >
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────
function LineChart({ data, color = '#a3c748', height = 90 }) {
  const w = 500;
  const h = height;
  const pad = { top: 8, bottom: 4, left: 6, right: 6 };
  const max = Math.max(...data.map(d => d.value)) * 1.1;
  const min = Math.min(...data.map(d => d.value)) * 0.9;

  const pts = data.map((d, i) => {
    const x = pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right);
    const y = pad.top + (1 - (d.value - min) / (max - min)) * (h - pad.top - pad.bottom);
    return [x, y];
  });

  const pathD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
  const areaD = `${pathD} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={data[i].today ? 4 : 2.5}
          fill={data[i].today ? '#e4c25a' : color}
          stroke={data[i].today ? '#0d1f0f' : 'none'}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({ value, label, icon, colorClass, delta, deltaDir }) {
  return (
    <div className={`kpi-card ${colorClass}`}>
      <div className="kpi-top">
        <div className="kpi-icon">{icon}</div>
        {delta && (
          <span className={`kpi-delta ${deltaDir}`}>{delta}</span>
        )}
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FarmAnalytics() {
  const [period, setPeriod] = useState('Week');
  const barData = period === 'Week' ? WEEKLY_QUERIES : MONTHLY_QUERIES;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="analytics-dashboard">
      {/* ── Header ── */}
      <header className="analytics-header">
        <div className="analytics-header-inner">
          <div className="analytics-brand">
            <div className="analytics-brand-icon">📊</div>
            <div className="analytics-brand-text">
              <h1>Farm Analytics</h1>
              <p>Smart Farmer · Activity Overview</p>
            </div>
          </div>
          <div className="analytics-header-meta">
            <span className="live-badge">
              <span className="live-dot" />
              LIVE
            </span>
            <span className="date-label">{dateStr}</span>
            <div className="period-tabs">
              {['Week', 'Month', 'Year'].map(p => (
                <button
                  key={p}
                  className={`period-tab${period === p ? ' active' : ''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="analytics-body">

        {/* ── KPIs ── */}
        <div className="kpi-grid">
          <KpiCard value={10}  label="Total Tasks"  icon="✅" colorClass="kpi-tasks"   delta="+2 today"  deltaDir="up" />
          <KpiCard value={47}  label="AI Queries"   icon="🤖" colorClass="kpi-queries" delta="+12 today" deltaDir="up" />
          <KpiCard value={8}   label="Community Posts" icon="💬" colorClass="kpi-posts" delta="+3 today" deltaDir="up" />
          <KpiCard value={3}   label="Active Crops" icon="🌾" colorClass="kpi-crops"   delta="Stable"    deltaDir="up" />
        </div>

        {/* ── Row 1: Task Completion + AI Queries Chart ── */}
        <div className="analytics-grid wide-left" style={{ marginBottom: 18 }}>

          {/* Task Completion */}
          <div className="a-card">
            <div className="a-card-header">
              <div>
                <div className="a-card-title">Task Completion</div>
                <div className="a-card-sub">10 tasks this period</div>
              </div>
              <span className="a-card-badge">60% Done</span>
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              <DonutChart segments={TASK_BREAKDOWN} size={170} stroke={26} />
              <div style={{ flex: 1 }}>
                <div className="progress-list">
                  {TASK_BREAKDOWN.map((t, i) => (
                    <div className="progress-item" key={i}>
                      <div className="progress-top">
                        <span className="progress-name">{t.label}</span>
                        <span className="progress-val">{t.pct}%</span>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${t.pct}%`,
                            background: t.color,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Task Categories
                  </div>
                  {[
                    { name: 'Irrigation', count: 4, color: '#4a9eff' },
                    { name: 'Fertilizing', count: 3, color: '#a3c748' },
                    { name: 'Harvesting', count: 2, color: '#c8a838' },
                    { name: 'Pest Control', count: 1, color: '#f5a623' },
                  ].map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--text-secondary)' }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color, display: 'inline-block' }} />
                        {c.name}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Queries This Week */}
          <div className="a-card">
            <div className="a-card-header">
              <div>
                <div className="a-card-title">AI Queries</div>
                <div className="a-card-sub">{period === 'Week' ? 'Past 7 days' : 'Past 4 weeks'}</div>
              </div>
            </div>
            <BarChart data={barData} />

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <div className="a-card-title" style={{ fontSize: 14, marginBottom: 14 }}>Top Topics</div>
              <div className="topics-list">
                {TOPICS.map((t, i) => (
                  <div className="topic-row" key={i}>
                    <div className="topic-top">
                      <div className="topic-name">
                        <span className="topic-rank">{i + 1}</span>
                        {t.name}
                      </div>
                      <span className="topic-pct">{t.pct}%</span>
                    </div>
                    <div className="topic-track">
                      <div
                        className="topic-fill"
                        style={{
                          width: `${t.pct}%`,
                          background: t.color,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: Crop Health + Activity Feed ── */}
        <div className="analytics-grid wide-left" style={{ marginBottom: 18 }}>

          {/* Crop Health */}
          <div className="a-card">
            <div className="a-card-header">
              <div>
                <div className="a-card-title">Crop Health Monitor</div>
                <div className="a-card-sub">Last disease scan results</div>
              </div>
            </div>
            <table className="crop-health-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Health Score</th>
                  <th>Status</th>
                  <th>Last Check</th>
                  <th>Market</th>
                </tr>
              </thead>
              <tbody>
                {CROP_HEALTH.map((c, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 13 }}>
                      <span className={`health-dot health-${c.status}`} />
                      {c.name}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          flex: 1, height: 5, background: 'rgba(255,255,255,0.06)',
                          borderRadius: 3, overflow: 'hidden', minWidth: 60,
                        }}>
                          <div style={{
                            height: '100%', borderRadius: 3,
                            background: c.status === 'good' ? '#4caf75' : c.status === 'warn' ? '#f5a623' : '#e05252',
                            width: `${c.health}%`,
                          }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', minWidth: 28 }}>
                          {c.health}%
                        </span>
                      </div>
                    </td>
                    <td><span className={`health-pill ${c.status}`}>{c.status === 'good' ? 'Healthy' : c.status === 'warn' ? 'Monitor' : 'At Risk'}</span></td>
                    <td style={{ fontSize: 11 }}>{c.lastCheck}</td>
                    <td style={{ fontSize: 11 }}>{c.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity Feed */}
          <div className="a-card">
            <div className="a-card-header">
              <div>
                <div className="a-card-title">Recent Activity</div>
                <div className="a-card-sub">Today's farm events</div>
              </div>
            </div>
            <div className="activity-list">
              {ACTIVITIES.map((a, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-icon" style={{ background: a.bg }}>{a.icon}</div>
                  <div className="activity-text">
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Usage trend line chart ── */}
        <div className="a-card" style={{ marginBottom: 0 }}>
          <div className="a-card-header">
            <div>
              <div className="a-card-title">Platform Usage — 7 Day Trend</div>
              <div className="a-card-sub">Daily active queries across all modules</div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {[
                { label: 'AI Queries', color: '#a3c748' },
                { label: 'Disease Scans', color: '#f5a623' },
                { label: 'Market Views', color: '#4a9eff' },
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 20, height: 3, borderRadius: 2, background: l.color, display: 'inline-block' }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <LineChart
              data={[
                { day: 'Mon', value: 28, today: false },
                { day: 'Tue', value: 42, today: false },
                { day: 'Wed', value: 35, today: false },
                { day: 'Thu', value: 55, today: false },
                { day: 'Fri', value: 48, today: false },
                { day: 'Sat', value: 38, today: false },
                { day: 'Sun', value: 47, today: true },
              ]}
              color="#a3c748"
              height={80}
            />
            <LineChart
              data={[
                { day: 'Mon', value: 5, today: false },
                { day: 'Tue', value: 8, today: false },
                { day: 'Wed', value: 12, today: false },
                { day: 'Thu', value: 7, today: false },
                { day: 'Fri', value: 14, today: false },
                { day: 'Sat', value: 9, today: false },
                { day: 'Sun', value: 11, today: true },
              ]}
              color="#f5a623"
              height={60}
            />
            <LineChart
              data={[
                { day: 'Mon', value: 40, today: false },
                { day: 'Tue', value: 55, today: false },
                { day: 'Wed', value: 48, today: false },
                { day: 'Thu', value: 62, today: false },
                { day: 'Fri', value: 58, today: false },
                { day: 'Sat', value: 50, today: false },
                { day: 'Sun', value: 65, today: true },
              ]}
              color="#4a9eff"
              height={60}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4, borderTop: '1px solid var(--border)' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                <span key={i} style={{ fontSize: 10, color: i === 6 ? 'var(--gold-light)' : 'var(--text-muted)', fontWeight: i === 6 ? 700 : 500, flex: 1, textAlign: 'center' }}>{d}</span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}