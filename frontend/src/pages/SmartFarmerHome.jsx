import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: "🌦️",
    label: "Weather",
    desc: "Hyper-local 5-day forecasts with rain probability and agronomic alerts.",
    color: "#2d6a4f",
    path: "/dashboard",
  },
  {
    icon: "🤖",
    label: "AI Assistant",
    desc: "Ask anything about your crops — get instant expert-level guidance.",
    color: "#1b4332",
    path: "/dashboard",
  },
  {
    icon: "🎙️",
    label: "Voice AI",
    desc: "Hands-free farming intelligence. Speak, listen, act.",
    color: "#40916c",
    path: "/dashboard",
  },
  {
    icon: "🔬",
    label: "Disease Detect",
    desc: "Upload a leaf photo. Get disease diagnosis and treatment in seconds.",
    color: "#52b788",
    path: "/dashboard",
  },
  {
    icon: "🌱",
    label: "Crop Advice",
    desc: "Season-aware planting recommendations tailored to your soil and climate.",
    color: "#74c69d",
    path: "/dashboard",
  },
  {
    icon: "📈",
    label: "Market Prices",
    desc: "Live mandi rates. Know when to sell, when to wait.",
    color: "#2d6a4f",
    path: "/dashboard",
  },
  {
    icon: "✅",
    label: "Task Tracker",
    desc: "Plan and track every farm activity. Never miss a spray or harvest window.",
    color: "#1b4332",
    path: "/dashboard",
  },
  {
    icon: "📊",
    label: "Analytics",
    desc: "Yield trends, cost breakdowns, and season-over-season comparisons.",
    color: "#40916c",
    path: "/dashboard",
  },
];

const stats = [
  { value: "50K+", label: "Farmers Using" },
  { value: "12",   label: "AI Features" },
  { value: "98%",  label: "Forecast Accuracy" },
  { value: "₹2.4L",label: "Avg. Savings/Year" },
];

const testimonials = [
  {
    name: "Ravi Kumar",
    location: "Warangal, Telangana",
    text: "Disease Detect saved my entire cotton crop. Spotted fungal blight two weeks before it spread.",
    crop: "🌾 Cotton",
  },
  {
    name: "Lakshmi Devi",
    location: "Nalgonda, Telangana",
    text: "Market Prices told me to wait 10 days before selling tomatoes. Made ₹40,000 extra.",
    crop: "🍅 Tomatoes",
  },
  {
    name: "Srinivas Rao",
    location: "Karimnagar, Telangana",
    text: "Voice AI works in Telugu! I can ask questions while working in the field.",
    crop: "🌽 Maize",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SmartFarmerHome() {
  // ✅ FIX 1: useNavigate initialized correctly INSIDE the component
  const navigate = useNavigate();

  const [activeFeature, setActiveFeature] = useState(null);
  const [scrolled,      setScrolled]      = useState(false);
  const [visible,       setVisible]       = useState({});
  const heroRef = useRef(null);

  // Scroll listener for nav shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ✅ FIX 2: Watch Demo scrolls smoothly to #features
  const handleWatchDemo = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>

      {/* ── NAV ── */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>🌾</span>
            <span style={styles.logoText}>Smart<b>Farmer</b></span>
            <span style={styles.logoBadge}>AI</span>
          </div>

          <div style={styles.navLinks}>
            {["Features", "How It Works", "Stories", "Analytics"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                style={styles.navLink}
              >
                {l}
              </a>
            ))}
          </div>

          <div style={styles.navActions}>
            {/* ✅ FIX 3: Login navigates to /login */}
            <button style={styles.btnOutline} onClick={() => navigate("/login")}>
              Log In
            </button>
            {/* ✅ FIX 4: Register navigates to /register */}
            <button style={styles.btnPrimary} onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroGlow} />

        <div style={styles.heroContent}>
          <div style={styles.heroPill}>
            <span style={styles.heroPillDot} />
            Live · Hyderabad 29°C · Rain expected
          </div>

          <h1 style={styles.heroH1}>
            Your farm,<br />
            <span style={styles.heroAccent}>intelligently managed.</span>
          </h1>

          <p style={styles.heroSub}>
            AI-powered weather, disease detection, market prices &amp; crop advice —
            all in one place. Built for Indian farmers.
          </p>

          {/* ✅ FIX 5: Clean JSX buttons — no stray import/code inside JSX */}
          <div style={styles.heroButtons}>
            <button
              style={styles.btnHeroPrimary}
              onClick={() => navigate("/login")}
            >
              Open Dashboard →
            </button>
            <button
              style={styles.btnHeroSecondary}
              onClick={handleWatchDemo}
            >
              ▶ Watch Demo
            </button>
          </div>

          <div style={styles.heroTrust}>
            <span style={styles.trustItem}>✅ Free to use</span>
            <span style={styles.trustDot} />
            <span style={styles.trustItem}>🇮🇳 Made for Indian farmers</span>
            <span style={styles.trustDot} />
            <span style={styles.trustItem}>📱 Works on mobile</span>
          </div>
        </div>

        {/* Floating weather card */}
        <div style={styles.floatingCard}>
          <div style={styles.fcHeader}>
            <span>📍 Hyderabad</span>
            <span style={styles.fcLive}>LIVE</span>
          </div>
          <div style={styles.fcTemp}>29°C</div>
          <div style={styles.fcDesc}>Overcast · Feels like 32°C</div>
          <div style={styles.fcRow}>
            <div style={styles.fcStat}><span>💧</span> 63%</div>
            <div style={styles.fcStat}><span>💨</span> 4.8 km/h</div>
            <div style={styles.fcStat}><span>🌧️</span> Rain</div>
          </div>
          <div style={styles.fcForecastRow}>
            {[
              { d: "Wed", t: "32°" },
              { d: "Thu", t: "27°" },
              { d: "Fri", t: "28°" },
              { d: "Sat", t: "29°" },
            ].map((f) => (
              <div key={f.d} style={styles.fcDay}>
                <span style={styles.fcDayLabel}>{f.d}</span>
                <span>🌧️</span>
                <span style={styles.fcDayTemp}>{f.t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.scrollCue}>
          <span style={styles.scrollArrow}>↓</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={styles.statsBar}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>Everything you need</p>
          <h2 style={styles.sectionH2}>Eight tools. One dashboard.</h2>
          <p style={styles.sectionSub}>
            From the moment you wake up to the moment you sell — Smart Farmer has you covered.
          </p>

          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div
                key={f.label}
                id={`feat-${i}`}
                data-reveal
                style={{
                  ...styles.featureCard,
                  ...(activeFeature === i ? styles.featureCardActive : {}),
                  borderTopColor: f.color,
                  opacity:   visible[`feat-${i}`] ? 1 : 0,
                  transform: visible[`feat-${i}`] ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.5s ${i * 60}ms, transform 0.5s ${i * 60}ms, box-shadow 0.25s`,
                }}
                onMouseEnter={() => setActiveFeature(i)}
                onMouseLeave={() => setActiveFeature(null)}
                onClick={() => navigate("/login")}
              >
                <div style={{ ...styles.featureIconBg, background: f.color + "22" }}>
                  <span style={styles.featureIcon}>{f.icon}</span>
                </div>
                <h3 style={styles.featureTitle}>{f.label}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
                <span style={{ ...styles.featureLink, color: f.color }}>
                  Open {f.label} →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={styles.howSection}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrowLight}>Simple to start</p>
          <h2 style={{ ...styles.sectionH2, color: "#fff" }}>Farm smarter in three steps</h2>
          <div style={styles.stepsRow}>
            {[
              { step: "01", title: "Set your location",  body: "Enter your village or pin your field on the map. All recommendations become hyper-local instantly.", icon: "📍" },
              { step: "02", title: "Get real-time data", body: "Weather, disease risks, and market prices update automatically every hour.", icon: "📡" },
              { step: "03", title: "Act on AI advice",   body: "Follow crop-specific guidance, track tasks, and sell at the right time.", icon: "✅" },
            ].map((s, i) => (
              <div
                key={s.step}
                id={`step-${i}`}
                data-reveal
                style={{
                  ...styles.stepCard,
                  opacity:   visible[`step-${i}`] ? 1 : 0,
                  transform: visible[`step-${i}`] ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ${i * 120}ms, transform 0.6s ${i * 120}ms`,
                }}
              >
                <div style={styles.stepNum}>{s.step}</div>
                <div style={styles.stepIconWrap}>{s.icon}</div>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="stories" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.eyebrow}>Real farmer stories</p>
          <h2 style={styles.sectionH2}>Results from Telangana fields</h2>
          <div style={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                id={`test-${i}`}
                data-reveal
                style={{
                  ...styles.testimonialCard,
                  opacity:   visible[`test-${i}`] ? 1 : 0,
                  transform: visible[`test-${i}`] ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.5s ${i * 100}ms, transform 0.5s ${i * 100}ms`,
                }}
              >
                <div style={styles.tQuote}>"</div>
                <p style={styles.tText}>{t.text}</p>
                <div style={styles.tFooter}>
                  <div>
                    <div style={styles.tName}>{t.name}</div>
                    <div style={styles.tLocation}>{t.location}</div>
                  </div>
                  <div style={styles.tCrop}>{t.crop}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="analytics" style={styles.ctaSection}>
        <div style={styles.ctaGlow} />
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaH2}>Your crop season starts today.</h2>
          <p style={styles.ctaSub}>
            Join 50,000+ farmers across Telangana and Andhra Pradesh making data-driven decisions.
          </p>
          <div style={styles.ctaBtnRow}>
            {/* ✅ FIX 6: CTA navigates to /register */}
            <button
              style={styles.btnCtaBig}
              onClick={() => navigate("/register")}
            >
              🌾 Register Free — Get Started
            </button>
            <button
              style={styles.btnCtaOutline}
              onClick={() => navigate("/login")}
            >
              Already a member? Log In
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            <span>🌾</span>
            <span>SmartFarmer AI</span>
          </div>
          <div style={styles.footerLinks}>
            {["Weather", "AI Assistant", "Disease Detect", "Market Prices", "Community"].map((l) => (
              <a key={l} href="#" style={styles.footerLink}>{l}</a>
            ))}
          </div>
          <div style={styles.footerActions}>
            <button style={styles.footerBtn} onClick={() => navigate("/login")}>Log In</button>
            <button style={styles.footerBtnPrimary} onClick={() => navigate("/register")}>Register</button>
          </div>
          <div style={styles.footerCopy}>
            © {new Date().getFullYear()} SmartFarmer AI · Built for Indian Agriculture
          </div>
        </div>
      </footer>

    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#f0f7f2",
    color: "#1a2e1a",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    background: "rgba(240,247,242,0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid transparent",
    transition: "all 0.3s",
  },
  navScrolled: {
    background: "rgba(240,247,242,0.97)",
    borderBottomColor: "#c3e6cb",
    boxShadow: "0 2px 20px rgba(27,67,50,0.08)",
  },
  navInner: {
    maxWidth: 1200, margin: "0 auto", padding: "14px 24px",
    display: "flex", alignItems: "center", gap: 32,
  },
  logo: { display: "flex", alignItems: "center", gap: 8 },
  logoIcon: { fontSize: 26 },
  logoText: { fontSize: 20, fontWeight: 400, color: "#1b4332", letterSpacing: "-0.5px" },
  logoBadge: {
    background: "#2d6a4f", color: "#fff",
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    padding: "2px 6px", borderRadius: 4,
  },
  navLinks: { display: "flex", gap: 28, flex: 1 },
  navLink: {
    color: "#40916c", textDecoration: "none",
    fontSize: 14, fontWeight: 500, transition: "color 0.2s",
  },
  navActions: { display: "flex", gap: 10, marginLeft: "auto" },
  btnOutline: {
    padding: "8px 18px", borderRadius: 8,
    border: "1.5px solid #2d6a4f", background: "transparent",
    color: "#2d6a4f", fontWeight: 600, fontSize: 14,
    cursor: "pointer", transition: "all 0.2s",
    fontFamily: "'Inter', sans-serif",
  },
  btnPrimary: {
    padding: "8px 18px", borderRadius: 8,
    background: "#2d6a4f", color: "#fff",
    border: "none", fontWeight: 600, fontSize: 14,
    cursor: "pointer", boxShadow: "0 2px 12px rgba(45,106,79,0.3)",
    transition: "all 0.2s", fontFamily: "'Inter', sans-serif",
  },

  // HERO
  hero: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 45%, #40916c 100%)",
    position: "relative",
    display: "flex", alignItems: "center",
    padding: "120px 24px 80px",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute", inset: 0,
    backgroundImage: `radial-gradient(circle at 70% 50%, rgba(116,198,157,0.15) 0%, transparent 60%)`,
  },
  heroGlow: {
    position: "absolute", width: 600, height: 600, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(116,198,157,0.2) 0%, transparent 70%)",
    top: "50%", right: "5%", transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  heroContent: { maxWidth: 560, position: "relative", zIndex: 2 },
  heroPill: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 999, padding: "6px 14px",
    color: "#d8f3dc", fontSize: 13, fontWeight: 500,
    marginBottom: 28, backdropFilter: "blur(8px)",
  },
  heroPillDot: {
    width: 8, height: 8, borderRadius: "50%",
    background: "#74c69d",
    boxShadow: "0 0 0 3px rgba(116,198,157,0.3)",
  },
  heroH1: {
    fontSize: "clamp(36px, 6vw, 68px)",
    fontWeight: 800, color: "#fff",
    lineHeight: 1.05, margin: "0 0 20px",
    letterSpacing: "-2px",
  },
  heroAccent: {
    background: "linear-gradient(90deg, #74c69d, #b7e4c7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 17, color: "rgba(216,243,220,0.9)",
    lineHeight: 1.6, margin: "0 0 36px", maxWidth: 440,
  },
  heroButtons: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 },
  btnHeroPrimary: {
    padding: "14px 28px", borderRadius: 10,
    background: "#fff", color: "#1b4332",
    border: "none", fontWeight: 700, fontSize: 16,
    cursor: "pointer", boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontFamily: "'Inter', sans-serif",
  },
  btnHeroSecondary: {
    padding: "14px 28px", borderRadius: 10,
    background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.3)",
    color: "#fff", fontWeight: 600, fontSize: 16,
    cursor: "pointer", backdropFilter: "blur(8px)",
    transition: "background 0.2s", fontFamily: "'Inter', sans-serif",
  },
  heroTrust: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  trustItem: { fontSize: 12, color: "rgba(216,243,220,0.7)", fontWeight: 500 },
  trustDot:  { width: 3, height: 3, borderRadius: "50%", background: "rgba(216,243,220,0.3)" },

  // Floating weather card
  floatingCard: {
    position: "absolute", right: "max(40px, 5vw)", top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(20px)",
    borderRadius: 20, padding: "24px 28px",
    width: 260, zIndex: 2,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  fcHeader: {
    display: "flex", justifyContent: "space-between",
    color: "#d8f3dc", fontSize: 13, marginBottom: 12,
  },
  fcLive: {
    background: "#52b788", color: "#fff",
    fontSize: 10, fontWeight: 700, letterSpacing: 1,
    padding: "2px 6px", borderRadius: 4,
  },
  fcTemp: { fontSize: 56, fontWeight: 800, color: "#fff", lineHeight: 1 },
  fcDesc: { color: "rgba(216,243,220,0.8)", fontSize: 13, margin: "6px 0 16px" },
  fcRow:  { display: "flex", gap: 8, marginBottom: 16 },
  fcStat: {
    background: "rgba(255,255,255,0.1)", borderRadius: 8,
    padding: "6px 8px", color: "#d8f3dc", fontSize: 12,
    display: "flex", alignItems: "center", gap: 4, flex: 1,
    justifyContent: "center",
  },
  fcForecastRow: { display: "flex", justifyContent: "space-between" },
  fcDay: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  fcDayLabel: { color: "rgba(216,243,220,0.6)", fontSize: 11 },
  fcDayTemp:  { color: "#fff", fontSize: 13, fontWeight: 600 },

  scrollCue: {
    position: "absolute", bottom: 32, left: "50%",
    transform: "translateX(-50%)", zIndex: 2,
  },
  scrollArrow: { color: "rgba(216,243,220,0.5)", fontSize: 24 },

  // STATS
  statsBar: {
    background: "#1b4332",
    display: "flex", justifyContent: "center",
    gap: "clamp(24px, 6vw, 80px)", flexWrap: "wrap",
    padding: "28px 24px",
  },
  statItem:  { textAlign: "center" },
  statValue: { display: "block", fontSize: 32, fontWeight: 800, color: "#74c69d" },
  statLabel: { fontSize: 13, color: "rgba(216,243,220,0.7)", marginTop: 2, display: "block" },

  // SECTIONS
  section:      { padding: "90px 24px" },
  sectionInner: { maxWidth: 1160, margin: "0 auto" },
  eyebrow: {
    color: "#52b788", fontWeight: 600, fontSize: 12,
    letterSpacing: 2, textTransform: "uppercase", marginBottom: 12,
    display: "block",
  },
  eyebrowLight: {
    color: "#74c69d", fontWeight: 600, fontSize: 12,
    letterSpacing: 2, textTransform: "uppercase", marginBottom: 12,
    display: "block",
  },
  sectionH2: {
    fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800,
    color: "#1b4332", margin: "0 0 16px", letterSpacing: "-1px",
  },
  sectionSub: {
    color: "#40916c", fontSize: 17, maxWidth: 520,
    lineHeight: 1.6, marginBottom: 52, display: "block",
  },

  // FEATURES
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 20,
  },
  featureCard: {
    background: "#fff", borderRadius: 16, padding: "28px 24px",
    borderTop: "4px solid transparent",
    boxShadow: "0 2px 12px rgba(27,67,50,0.07)",
    cursor: "pointer",
  },
  featureCardActive: {
    boxShadow: "0 12px 40px rgba(27,67,50,0.15)",
    transform: "translateY(-4px)",
  },
  featureIconBg: {
    width: 52, height: 52, borderRadius: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: 16,
  },
  featureIcon:  { fontSize: 26 },
  featureTitle: { fontSize: 17, fontWeight: 700, color: "#1b4332", margin: "0 0 8px" },
  featureDesc:  { fontSize: 14, color: "#52b788", lineHeight: 1.55, margin: "0 0 16px" },
  featureLink:  { fontSize: 13, fontWeight: 600, textDecoration: "none", cursor: "pointer" },

  // HOW IT WORKS
  howSection: {
    background: "linear-gradient(135deg, #1b4332, #2d6a4f)",
    padding: "90px 24px",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 24, marginTop: 48,
  },
  stepCard: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 20, padding: "32px 28px",
    backdropFilter: "blur(10px)",
  },
  stepNum:      { fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#74c69d", marginBottom: 16, display: "block" },
  stepIconWrap: { fontSize: 36, marginBottom: 16 },
  stepTitle:    { fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 12px" },
  stepBody:     { fontSize: 15, color: "rgba(216,243,220,0.8)", lineHeight: 1.6 },

  // TESTIMONIALS
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24, marginTop: 48,
  },
  testimonialCard: {
    background: "#fff", borderRadius: 16, padding: "28px",
    boxShadow: "0 2px 16px rgba(27,67,50,0.08)",
    position: "relative",
  },
  tQuote: {
    position: "absolute", top: 16, right: 20,
    fontSize: 64, color: "#d8f3dc", lineHeight: 1,
    fontFamily: "Georgia, serif",
  },
  tText:     { fontSize: 15, color: "#2d4a2d", lineHeight: 1.65, margin: "0 0 20px" },
  tFooter:   { display: "flex", justifyContent: "space-between", alignItems: "flex-end" },
  tName:     { fontWeight: 700, color: "#1b4332", fontSize: 14 },
  tLocation: { color: "#74c69d", fontSize: 12, marginTop: 2 },
  tCrop:     { background: "#f0f7f2", borderRadius: 8, padding: "6px 10px", fontSize: 13, color: "#2d6a4f" },

  // CTA
  ctaSection: {
    background: "#1b4332", padding: "100px 24px",
    textAlign: "center", position: "relative", overflow: "hidden",
  },
  ctaGlow: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at center, rgba(116,198,157,0.2) 0%, transparent 70%)",
  },
  ctaContent:  { position: "relative", zIndex: 1 },
  ctaH2: {
    fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800,
    color: "#fff", margin: "0 0 16px", letterSpacing: "-1.5px",
  },
  ctaSub: { color: "rgba(216,243,220,0.8)", fontSize: 18, margin: "0 0 40px", display: "block" },
  ctaBtnRow: { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" },
  btnCtaBig: {
    padding: "16px 36px", borderRadius: 12,
    background: "#74c69d", color: "#1b4332",
    border: "none", fontWeight: 800, fontSize: 17,
    cursor: "pointer", boxShadow: "0 6px 28px rgba(116,198,157,0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
    fontFamily: "'Inter', sans-serif",
  },
  btnCtaOutline: {
    padding: "16px 32px", borderRadius: 12,
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(255,255,255,0.25)",
    color: "#fff", fontWeight: 600, fontSize: 16,
    cursor: "pointer", transition: "background 0.2s",
    fontFamily: "'Inter', sans-serif",
  },

  // FOOTER
  footer: { background: "#0d2b1e", padding: "40px 24px" },
  footerInner: {
    maxWidth: 1160, margin: "0 auto",
    display: "flex", flexWrap: "wrap",
    alignItems: "center", gap: 24, justifyContent: "space-between",
  },
  footerLogo:    { display: "flex", alignItems: "center", gap: 8, color: "#74c69d", fontWeight: 700, fontSize: 16 },
  footerLinks:   { display: "flex", gap: 20, flexWrap: "wrap" },
  footerLink:    { color: "rgba(148,213,178,0.6)", textDecoration: "none", fontSize: 13 },
  footerActions: { display: "flex", gap: 8 },
  footerBtn: {
    padding: "7px 16px", borderRadius: 7,
    border: "1px solid rgba(148,213,178,0.3)", background: "transparent",
    color: "rgba(148,213,178,0.8)", fontSize: 13, fontWeight: 600,
    cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  footerBtnPrimary: {
    padding: "7px 16px", borderRadius: 7,
    background: "#2d6a4f", border: "none",
    color: "#fff", fontSize: 13, fontWeight: 600,
    cursor: "pointer", fontFamily: "'Inter', sans-serif",
  },
  footerCopy: { color: "rgba(148,213,178,0.4)", fontSize: 12, width: "100%", textAlign: "center" },
};