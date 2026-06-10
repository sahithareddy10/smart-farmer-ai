import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

// ─── Weather helpers ──────────────────────────────────────────────────────────
const API_KEY = 'fe013f1010e756ab0247c777333e9728'; // your key from WeatherDashboard

function weatherIcon(id) {
  if (!id) return '🌤️';
  if (id >= 200 && id < 300) return '⛈️';
  if (id >= 300 && id < 600) return '🌧️';
  if (id >= 600 && id < 700) return '❄️';
  if (id >= 700 && id < 800) return '🌫️';
  if (id === 800)             return '☀️';
  if (id === 801)             return '🌤️';
  if (id >= 802)              return '☁️';
  return '🌡️';
}

function shortDay(ts) {
  return new Date(ts * 1000).toLocaleDateString('en-IN', { weekday: 'short' });
}

// ─── Features data ────────────────────────────────────────────────────────────
const FEATURES = [
  {
    color: 'fc-lime',
    icon: '🌦️',
    name: 'Smart Weather',
    desc: 'Hyperlocal forecasts, rain alerts and irrigation advisories tailored for your district.',
  },
  {
    color: 'fc-red',
    icon: '🦠',
    name: 'Disease Detection',
    desc: 'Upload a crop photo — our AI identifies pests and diseases instantly with treatment tips.',
  },
  {
    color: 'fc-gold',
    icon: '📊',
    name: 'Market Prices',
    desc: 'Live APMC mandi rates for 50+ crops across Telangana and Andhra Pradesh.',
  },
  {
    color: 'fc-blue',
    icon: '🤖',
    name: 'AI Crop Advisor',
    desc: 'Ask anything about your farm — fertilisers, sowing dates, soil health — in Telugu or English.',
  },
  {
    color: 'fc-orange',
    icon: '✅',
    name: 'Task Tracker',
    desc: 'Plan and track irrigation, fertilising and harvesting schedules across all your fields.',
  },
  {
    color: 'fc-teal',
    icon: '👨‍🌾',
    name: 'Farmer Community',
    desc: 'Connect with thousands of farmers. Share experiences, tips and success stories.',
  },
];

const STEPS = [
  { num: '1', title: 'Register Free',    desc: 'Create your farmer account with mobile number in 30 seconds.' },
  { num: '2', title: 'Set Your Farm',    desc: 'Add your location, crop type and land size.' },
  { num: '3', title: 'Get AI Insights',  desc: 'Receive personalised weather, price and crop advice daily.' },
  { num: '4', title: 'Grow Better',      desc: 'Make smarter decisions and increase your farm income.' },
];

const STATS = [
  { num: '12,000+', lbl: 'Registered Farmers' },
  { num: '8 States', lbl: 'Across India' },
  { num: '50+ Crops', lbl: 'Market Prices' },
  { num: '98%',      lbl: 'Disease Accuracy' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate  = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [weather,  setWeather]    = useState(null);
  const [forecast, setForecast]   = useState([]);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('sf_token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  // Scroll listener for nav shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch live weather for Hyderabad
  useEffect(() => {
    const fetch = async () => {
      try {
        const [cur, fore] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=${API_KEY}&units=metric`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Hyderabad&appid=${API_KEY}&units=metric`),
        ]);
        setWeather(cur.data);

        // One per day
        const seen = {}, days = [];
        for (const item of fore.data.list) {
          const d = new Date(item.dt * 1000).toDateString();
          if (!seen[d]) { seen[d] = true; days.push(item); }
          if (days.length >= 4) break;
        }
        setForecast(days);
      } catch (_) {}
    };
    fetch();
  }, []);

  const temp     = weather ? Math.round(weather.main.temp)       : '--';
  const feelsLike= weather ? Math.round(weather.main.feels_like) : '--';
  const humidity = weather?.main?.humidity ?? '--';
  const wind     = weather  ? (weather.wind.speed * 3.6).toFixed(1) : '--';
  const desc     = weather?.weather[0]?.description ?? 'Loading…';
  const wid      = weather?.weather[0]?.id;
  const rain     = weather?.weather[0]?.main ?? '';

  return (
    <div className="landing">

      {/* ── NAV ── */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="nav-brand">
          <div className="nav-brand-icon">🌾</div>
          <span className="nav-brand-name">
            Smart<span>Farmer</span>
            <span className="nav-brand-ai">AI</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#features"  className="nav-link">Features</a>
          <a href="#how"       className="nav-link">How It Works</a>
          <a href="#analytics" className="nav-link">Analytics</a>
        </div>

        <div className="nav-actions">
          {/* ── LOGIN BUTTON ── navigates to /login */}
          <Link to="/login" className="btn-outline">Log In</Link>

          {/* ── REGISTER BUTTON ── navigates to /register */}
          <Link to="/register" className="btn-primary-nav">Register Free</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero" id="hero">
        <div className="hero-grid">

          {/* Left */}
          <div className="hero-left">
            <div className="hero-live-pill">
              <span className="hero-live-dot" />
              Live · Hyderabad {temp}°C · {rain || 'Weather live'}
            </div>

            <h1 className="hero-headline">
              Your farm,<br />
              <span className="accent">intelligently</span><br />
              managed.
            </h1>

            <p className="hero-sub">
              AI-powered weather, disease detection, market prices &amp; crop
              advice — all in one place. Built for Indian farmers.
            </p>

            <div className="hero-cta-row">
              {/* ── OPEN DASHBOARD ── goes to /login if not logged in */}
              <Link to="/login" className="btn-hero-primary">
                Open Dashboard →
              </Link>

              {/* ── WATCH DEMO ── scrolls to features */}
              <a href="#features" className="btn-hero-secondary">
                ▶ Explore Features
              </a>
            </div>

            <div className="hero-trust">
              <span className="trust-item">✅ Free to use</span>
              <span className="trust-dot" />
              <span className="trust-item">🇮🇳 Made for Indian farmers</span>
              <span className="trust-dot" />
              <span className="trust-item">📱 Works on mobile</span>
            </div>
          </div>

          {/* Right — live weather card */}
          <div className="hero-weather-card">
            <div className="hwc-top">
              <div className="hwc-city">
                <span>📍</span> Hyderabad
              </div>
              <span className="hwc-live">LIVE</span>
            </div>

            <div className="hwc-temp-row">
              <span className="hwc-temp">{temp}°</span>
              <span className="hwc-icon">{weatherIcon(wid)}</span>
            </div>

            <div className="hwc-desc">
              {desc.charAt(0).toUpperCase() + desc.slice(1)} · Feels like {feelsLike}°C
            </div>

            <div className="hwc-metrics">
              <div className="hwc-metric">
                <div className="hwc-metric-icon">💧</div>
                <div className="hwc-metric-val">{humidity}%</div>
                <div className="hwc-metric-lbl">Humidity</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-icon">💨</div>
                <div className="hwc-metric-val">{wind}</div>
                <div className="hwc-metric-lbl">km/h</div>
              </div>
              <div className="hwc-metric">
                <div className="hwc-metric-icon">{weatherIcon(wid)}</div>
                <div className="hwc-metric-val">{rain || '—'}</div>
                <div className="hwc-metric-lbl">Condition</div>
              </div>
            </div>

            {forecast.length > 0 && (
              <div className="hwc-forecast">
                {forecast.map((f, i) => (
                  <div className="hwc-fc-day" key={i}>
                    <div className="hwc-fc-label">{shortDay(f.dt)}</div>
                    <div className="hwc-fc-icon">{weatherIcon(f.weather[0]?.id)}</div>
                    <div className="hwc-fc-temp">{Math.round(f.main.temp)}°</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lp-features" id="features">
        <div className="section-eyebrow">Platform Features</div>
        <h2 className="section-title">Everything your farm needs</h2>
        <p className="section-sub">
          From live weather to AI crop disease detection — one platform to manage your entire farm operation.
        </p>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className={`feature-card ${f.color}`}>
              <div className="feat-icon-wrap">{f.icon}</div>
              <div className="feat-name">{f.name}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="lp-how" id="how">
        <div className="lp-how-inner">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title" style={{ marginBottom: 8 }}>Start in 4 simple steps</h2>
          <p className="section-sub">Get your farm intelligence dashboard running in under 2 minutes.</p>

          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lp-stats" id="analytics">
        <div className="stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="stat-block">
              <div className="stat-num">{s.num}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta">
        <div className="lp-cta-inner">
          <h2 className="lp-cta-title">Ready to farm smarter?</h2>
          <p className="lp-cta-sub">
            Join thousands of Indian farmers already using Smart Farmer AI to boost their yields and income.
          </p>
          <div className="lp-cta-btns">
            {/* ── REGISTER CTA ── */}
            <Link to="/register" className="btn-hero-primary">
              🌾 Register Free — It's Free
            </Link>
            {/* ── LOGIN CTA ── */}
            <Link to="/login" className="btn-hero-secondary">
              Already a member? Log In
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="footer-brand">
          <span>🌾</span> SmartFarmer <span style={{ color: 'var(--lime)' }}>AI</span>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} Smart Farmer AI · Built for Indian farmers · Telangana &amp; AP
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/login"    style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Login</Link>
          <Link to="/register" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Register</Link>
        </div>
      </footer>

    </div>
  );
}