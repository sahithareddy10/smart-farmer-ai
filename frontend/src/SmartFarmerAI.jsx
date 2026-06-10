import { useState, useRef, useEffect } from "react";

const PAGES = [
  { id: "weather", icon: "🌦️", label: "Weather" },
  { id: "ai", icon: "🤖", label: "AI Assistant" },
  { id: "voice", icon: "🎙️", label: "Voice AI" },
  { id: "disease", icon: "🔬", label: "Disease Detect" },
  { id: "crops", icon: "🌱", label: "Crop Advice" },
  { id: "market", icon: "📈", label: "Market Prices" },
  { id: "tasks", icon: "✅", label: "Task Tracker" },
  { id: "community", icon: "👥", label: "Community" },
  { id: "analytics", icon: "📊", label: "Analytics" },
];

const AI_RESPONSES = {
  rice: "🌾 Rice/Paddy Advisory:\n\n• Best season: Kharif (June–Nov)\n• Water need: 1200–2000mm\n• Fertilizer: NPK 120:60:60 kg/ha\n• Pest watch: Brown planthopper, Stem borer\n• Tip: Maintain 5cm standing water during tillering\n\nSpray Chlorpyrifos 2.5ml/L for stem borer control. 🌱",
  cotton: "🌿 Cotton Fertilizer Guide:\n\n• Basal: DAP 150 kg/ha + MOP 50 kg/ha\n• Top dress: Urea 60 kg/ha at squaring\n• Zinc sulphate 25 kg/ha for micronutrients\n\n⚠️ Avoid excess nitrogen — it promotes leaf growth over boll formation.",
  tomato: "🍅 Tomato Blight Control:\n\n• Early blight: Mancozeb 2.5g/L every 7 days\n• Late blight: Metalaxyl + Mancozeb 2g/L\n• Remove infected leaves immediately\n• Avoid overhead irrigation\n\nPrevention tip: Choose blight-resistant varieties like Arka Rakshak. 🌱",
  wheat: "🌾 Wheat Cultivation Guide:\n\n• Season: Rabi (Oct–Mar)\n• Sowing depth: 5–6cm\n• Fertilizer: Urea 120kg/ha + 60kg at CRI stage\n• Irrigations: 5–6 needed throughout season\n\nPest watch: Yellow rust, Aphids. Spray Propiconazole 0.1% for rust control.",
  fertilizer: "🌿 Fertilizer Selection Guide:\n\n• Urea (46% N): Leaf/stem growth — 120 kg/ha\n• DAP (18-46-0): Root development\n• MOP (0-0-60): Fruiting & flowering crops\n• Vermicompost 5t/ha: Improves soil health\n\n💡 Always do a soil test before fertilizer application!",
  pest: "🐛 Pest & Disease Management:\n\n• Neem oil spray (5ml/L): Effective organic pesticide\n• Yellow sticky traps: For whiteflies & aphids\n• Bordeaux mixture: For fungal diseases\n• IPM approach: Combine biological + chemical\n\n🌿 Crop rotation every season reduces pest pressure by 40%!",
  soil: "🌱 Soil Health Advisory:\n\n• Ideal pH: 6.0–7.5 for most crops\n• Add lime if pH < 6.0 (too acidic)\n• Add gypsum if pH > 7.5 (too alkaline)\n• Target 3–5% organic matter\n\nConduct free soil testing at your local Krishi Vigyan Kendra (KVK)!",
};

function getAIReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes("rice") || m.includes("paddy")) return AI_RESPONSES.rice;
  if (m.includes("cotton")) return AI_RESPONSES.cotton;
  if (m.includes("tomato") || m.includes("blight")) return AI_RESPONSES.tomato;
  if (m.includes("wheat")) return AI_RESPONSES.wheat;
  if (m.includes("fertilizer") || m.includes("urea")) return AI_RESPONSES.fertilizer;
  if (m.includes("pest") || m.includes("disease") || m.includes("insect")) return AI_RESPONSES.pest;
  if (m.includes("soil")) return AI_RESPONSES.soil;
  return `🌾 Smart Farmer AI:\n\nThank you for your question about "${msg}".\n\n• Regular soil testing improves yield by 20–30%\n• Use certified seeds from approved sources\n• Crop rotation prevents soil depletion\n• Contact local KVK for expert advice\n\nMention a specific crop name for detailed guidance. 🌱`;
}

// ─── AUTH SCREENS ────────────────────────────────────────────────────────────

function LoginScreen({ onLogin, onGoRegister }) {
  const [form, setForm] = useState({ id: "", pw: "" });
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!form.id || !form.pw) { setErr("Please enter mobile/email and password."); return; }
    onLogin({ fullName: "Ravi Kumar", city: "Karimnagar", state: "Telangana", cropType: "Rice", mobileNumber: form.id });
  };
  return (
    <div style={css.authPage}>
      <div style={css.authCard}>
        <div style={css.authLogo}>
          <span style={{ fontSize: 44 }}>🌾</span>
          <div style={css.authBrand}>Smart Farmer AI</div>
          <div style={css.authBrandSub}>Farmer Portal</div>
        </div>
        <h2 style={css.authHeading}>Farmer Login</h2>
        <p style={css.authSub}>Only registered farmers can access this system</p>
        {err && <div style={css.errBox}>{err}</div>}
        <form onSubmit={submit}>
          <Label>Mobile Number or Email</Label>
          <Input placeholder="Enter mobile or email" value={form.id} onChange={v => setForm(p => ({ ...p, id: v }))} />
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" value={form.pw} onChange={v => setForm(p => ({ ...p, pw: v }))} />
          <button style={css.authBtn} type="submit">🌾 Login to Dashboard</button>
        </form>
        <div style={css.authFooter}>
          New farmer?{" "}
          <span style={css.authLink} onClick={onGoRegister}>Register here</span>
        </div>
        <div style={css.infoBox}>
          💡 <strong>Demo:</strong> Enter any mobile/email + password to login.
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ onRegister, onGoLogin }) {
  const [form, setForm] = useState({ fullName: "", mobile: "", email: "", pw: "", cpw: "", village: "", city: "", state: "", crop: "", land: "" });
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!form.fullName) { setErr("Full name is required."); return; }
    if (!form.mobile || form.mobile.length < 10) { setErr("Valid 10-digit mobile required."); return; }
    if (!form.pw || form.pw.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (form.pw !== form.cpw) { setErr("Passwords do not match."); return; }
    onRegister({ fullName: form.fullName, city: form.city || form.village, state: form.state, cropType: form.crop, mobileNumber: form.mobile });
  };
  const STATES = ["Telangana", "Andhra Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Madhya Pradesh", "Uttar Pradesh", "Punjab", "Gujarat"];
  const CROPS = ["Rice / Paddy", "Wheat", "Cotton", "Maize", "Soybean", "Tomato", "Onion", "Sugarcane", "Groundnut", "Other"];
  return (
    <div style={css.authPage}>
      <div style={{ ...css.authCard, maxWidth: 560, padding: "32px 28px" }}>
        <div style={css.authLogo}>
          <span style={{ fontSize: 36 }}>🌾</span>
          <div style={css.authBrand}>Smart Farmer AI</div>
          <div style={css.authBrandSub}>Farmer Registration</div>
        </div>
        <h2 style={css.authHeading}>Create Farmer Account</h2>
        <p style={css.authSub}>Fill in your details to get AI-powered farming assistance</p>
        {err && <div style={css.errBox}>{err}</div>}
        <form onSubmit={submit}>
          <div style={css.row}>
            <div style={{ flex: 1 }}><Label>Full Name *</Label><Input placeholder="Your full name" value={form.fullName} onChange={v => setForm(p => ({ ...p, fullName: v }))} /></div>
            <div style={{ flex: 1 }}><Label>Mobile Number *</Label><Input placeholder="10-digit mobile" value={form.mobile} onChange={v => setForm(p => ({ ...p, mobile: v }))} /></div>
          </div>
          <Label>Email (optional)</Label>
          <Input type="email" placeholder="email@example.com" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} />
          <div style={css.row}>
            <div style={{ flex: 1 }}><Label>Password *</Label><Input type="password" placeholder="Min 6 chars" value={form.pw} onChange={v => setForm(p => ({ ...p, pw: v }))} /></div>
            <div style={{ flex: 1 }}><Label>Confirm Password *</Label><Input type="password" placeholder="Re-enter" value={form.cpw} onChange={v => setForm(p => ({ ...p, cpw: v }))} /></div>
          </div>
          <div style={{ ...css.sectionLabel, marginTop: 8 }}>📍 Location</div>
          <div style={css.row}>
            <div style={{ flex: 1 }}><Label>Village / Town</Label><Input placeholder="Your village" value={form.village} onChange={v => setForm(p => ({ ...p, village: v }))} /></div>
            <div style={{ flex: 1 }}><Label>City / Mandal</Label><Input placeholder="Nearest city" value={form.city} onChange={v => setForm(p => ({ ...p, city: v }))} /></div>
          </div>
          <Label>State *</Label>
          <Select value={form.state} onChange={v => setForm(p => ({ ...p, state: v }))} options={["-- Select State --", ...STATES]} />
          <div style={{ ...css.sectionLabel, marginTop: 8 }}>🌱 Farm Info</div>
          <div style={css.row}>
            <div style={{ flex: 1 }}><Label>Primary Crop</Label><Select value={form.crop} onChange={v => setForm(p => ({ ...p, crop: v }))} options={["-- Select Crop --", ...CROPS]} /></div>
            <div style={{ flex: 1 }}><Label>Land Size (acres)</Label><Input placeholder="e.g. 5 acres" value={form.land} onChange={v => setForm(p => ({ ...p, land: v }))} /></div>
          </div>
          <button style={{ ...css.authBtn, marginTop: 4 }} type="submit">🌾 Register as Farmer</button>
        </form>
        <div style={css.authFooter}>Already registered? <span style={css.authLink} onClick={onGoLogin}>Login here</span></div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function Dashboard({ farmer, onLogout }) {
  const [active, setActive] = useState("weather");
  const renderContent = () => {
    switch (active) {
      case "weather": return <WeatherPage farmer={farmer} />;
      case "ai": return <AIChatPage />;
      case "voice": return <VoicePage />;
      case "disease": return <DiseasePage />;
      case "crops": return <CropsPage />;
      case "market": return <MarketPage />;
      case "tasks": return <TasksPage />;
      case "community": return <CommunityPage farmer={farmer} />;
      case "analytics": return <AnalyticsPage />;
      default: return null;
    }
  };
  const cur = PAGES.find(p => p.id === active);
  const initials = farmer.fullName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={css.dashLayout}>
      <aside style={css.sidebar}>
        <div style={css.brand}>
          <span style={{ fontSize: 26 }}>🌾</span>
          <div>
            <div style={css.brandName}>Smart Farmer AI</div>
            <div style={css.brandSub}>Farmer Portal</div>
          </div>
        </div>
        <div style={css.farmerBadge}>
          <div style={css.avatar}>{initials}</div>
          <div>
            <div style={css.farmerName}>{farmer.fullName}</div>
            <div style={css.farmerCity}>{farmer.city || farmer.state || "Farmer"}</div>
          </div>
        </div>
        <nav style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {PAGES.map(p => (
            <button key={p.id} onClick={() => setActive(p.id)}
              style={{ ...css.navBtn, ...(active === p.id ? css.navBtnActive : {}) }}>
              <span style={{ fontSize: 18 }}>{p.icon}</span>
              <span style={css.navLabel}>{p.label}</span>
            </button>
          ))}
        </nav>
        <button style={css.logoutBtn} onClick={onLogout}>🚪 Logout</button>
      </aside>
      <div style={css.mainArea}>
        <div style={css.topBar}>
          <div style={css.topBarTitle}><span style={{ fontSize: 20 }}>{cur?.icon}</span> {cur?.label}</div>
          <div style={css.topBarGreet}>Namaste, <strong>{farmer.fullName.split(" ")[0]}</strong> 🙏</div>
        </div>
        <div style={css.pageContent}>{renderContent()}</div>
      </div>
    </div>
  );
}

// ─── WEATHER PAGE ─────────────────────────────────────────────────────────────

function WeatherPage({ farmer }) {
  const [city, setCity] = useState(farmer?.city || "Hyderabad");
  const [searchCity, setSearchCity] = useState(farmer?.city || "Hyderabad");
  const forecast = [
    { d: "Today", ico: "⛅", h: 32, l: 24, r: "20%" },
    { d: "Tue", ico: "🌧️", h: 28, l: 22, r: "75%" },
    { d: "Wed", ico: "🌦️", h: 29, l: 23, r: "60%" },
    { d: "Thu", ico: "☀️", h: 33, l: 25, r: "5%" },
    { d: "Fri", ico: "☀️", h: 35, l: 26, r: "0%" },
  ];
  const tips = [
    "🌧️ Rain expected tomorrow — delay fertilizer application by 2 days",
    "💧 High humidity: Watch for fungal diseases on rice crops",
    "🌬️ Moderate winds today: Ideal for pesticide spraying",
    "☀️ Clear skies Thu–Fri: Perfect window for harvesting",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <input value={searchCity} onChange={e => setSearchCity(e.target.value)}
            onKeyDown={e => e.key === "Enter" && setCity(searchCity)}
            style={css.searchInput} placeholder="Enter city name..." />
          <button style={css.greenBtn} onClick={() => setCity(searchCity)}>🔍 Search</button>
        </div>
        <div style={css.weatherHero}>
          <div>
            <div style={{ color: "#a8c9aa", fontSize: 12, marginBottom: 6 }}>📍 {city}</div>
            <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1, color: "#fff" }}>32°C</div>
            <div style={{ color: "#a8c9aa", marginTop: 6, fontSize: 14 }}>⛅ Partly Cloudy</div>
            <div style={{ color: "#6da870", fontSize: 11, marginTop: 4 }}>Feels like 36°C</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["💧 Humidity", "68%"], ["💨 Wind", "12 km/h"]].map(([l, v]) => (
              <div key={l} style={css.weatherMetaBox}>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#fff" }}>{v}</div>
                <div style={{ fontSize: 10, color: "#a8c9aa", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <SectionTitle>📅 5-Day Forecast</SectionTitle>
        <div style={{ display: "flex", gap: 8 }}>
          {forecast.map((f, i) => (
            <div key={i} style={{ ...css.forecastCard, background: i === 0 ? "#e8f5e9" : "var(--bg-sec, #f5f5f5)", border: i === 0 ? "2px solid #4caf50" : "1px solid #e0e0e0" }}>
              <div style={css.forecastDay}>{f.d}</div>
              <div style={{ fontSize: 26, margin: "6px 0" }}>{f.ico}</div>
              <div style={css.forecastTemp}>{f.h}°/{f.l}°</div>
              <div style={css.forecastRain}>🌧 {f.r}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionTitle>🌾 Farming Tips Based on Weather</SectionTitle>
        {tips.map((t, i) => <div key={i} style={css.infoBox}>{t}</div>)}
      </Card>
    </div>
  );
}

// ─── AI CHAT PAGE ─────────────────────────────────────────────────────────────

function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "🌾 Namaste! I am your Smart Farmer AI Assistant.\n\nAsk me anything about:\n• Crop cultivation & fertilizers\n• Pest & disease management\n• Soil health & weather impact\n• Farming best practices\n\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState("");
  const [lang, setLang] = useState("English");
  const bottomRef = useRef(null);
  const quickQs = ["How to grow rice organically?", "Best fertilizer for cotton?", "How to control tomato blight?", "Soil testing for wheat?"];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = (text = input) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    setMessages(p => [...p, { role: "user", text: q }]);
    setLoading("Thinking...");
    setTimeout(() => {
      setLoading("");
      setMessages(p => [...p, { role: "ai", text: getAIReply(q) }]);
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)", background: "#fff", borderRadius: 14, border: "1px solid #c8e6c9", overflow: "hidden" }}>
      <div style={css.chatHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={css.chatAvatar}>🌾</div>
          <div><div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Smart Farmer AI</div><div style={{ color: "#6da870", fontSize: 10 }}>🟢 Online</div></div>
        </div>
        <select value={lang} onChange={e => setLang(e.target.value)} style={css.langSel}>
          {["English", "Telugu", "Hindi"].map(l => <option key={l}>{l}</option>)}
        </select>
      </div>
      <div style={css.chatMsgs}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            {m.role === "ai" && <div style={{ fontSize: 18, marginRight: 8, marginTop: 2, flexShrink: 0 }}>🌾</div>}
            <div style={m.role === "user" ? css.userBubble : css.aiBubble}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", color: "#9e9e9e", fontSize: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 18 }}>🌾</div>
            <div style={{ background: "#e8f5e9", padding: "8px 14px", borderRadius: "0 10px 10px 10px", color: "#5d7a5c" }}>⏳ {loading}</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: "8px 14px", borderTop: "1px solid #e8f5e9", display: "flex", flexWrap: "wrap", gap: 6, background: "#fafff9" }}>
        <span style={{ fontSize: 10, color: "#9e9e9e", alignSelf: "center" }}>Quick:</span>
        {quickQs.map(q => <button key={q} onClick={() => send(q)} style={css.quickBtn}>{q}</button>)}
      </div>
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", borderTop: "1px solid #c8e6c9", background: "#fff" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          style={css.chatInput} placeholder="Ask your farming question..." />
        <button onClick={() => send()} style={css.greenBtn}>Send ➤</button>
      </div>
    </div>
  );
}

// ─── VOICE PAGE ───────────────────────────────────────────────────────────────

function VoicePage() {
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-IN");
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const recRef = useRef(null);
  const LANG_LABELS = { "en-IN": "English", "te-IN": "Telugu", "hi-IN": "Hindi" };

  const toggleMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Speech recognition requires Chrome browser."); return; }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const rec = new SR();
    rec.lang = lang; rec.interimResults = false;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.onresult = e => {
      const t = e.results[0][0].transcript;
      setTranscript(t);
      const reply = getAIReply(t);
      setResponse(reply);
      const utt = new SpeechSynthesisUtterance(reply.replace(/[🌾🌿🍅🐛🌱•]/g, ""));
      utt.lang = lang; utt.rate = 0.9;
      window.speechSynthesis.speak(utt);
    };
    recRef.current = rec;
    rec.start();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Voice AI Assistant</div>
          <div style={{ fontSize: 12, color: "#666" }}>Speak in your language — get instant farming advice</div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {Object.entries(LANG_LABELS).map(([code, name]) => (
            <button key={code} onClick={() => setLang(code)}
              style={{ ...css.tagBtn, ...(lang === code ? { background: "#2e7d32", color: "#fff", borderColor: "#2e7d32" } : {}) }}>{name}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <button onClick={toggleMic} style={{
            width: 80, height: 80, borderRadius: "50%", fontSize: 32,
            background: listening ? "#c62828" : "#2e7d32", border: "none", cursor: "pointer",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: listening ? "0 0 0 8px rgba(198,40,40,0.2)" : "0 4px 16px rgba(46,125,50,0.3)",
            transition: "all 0.2s",
          }}>{listening ? "⏹️" : "🎙️"}</button>
          <div style={{ fontSize: 13, color: "#666", fontWeight: 500 }}>
            {listening ? "🔴 Listening… speak now!" : "🎙️ Tap to speak your question"}
          </div>
        </div>
        {transcript && (
          <div style={{ marginBottom: 12 }}>
            <Label>🗣️ You said:</Label>
            <div style={{ background: "#fff8e1", padding: "10px 14px", borderRadius: 8, fontStyle: "italic", fontSize: 13, color: "#5d4037", border: "1px solid #ffe082" }}>"{transcript}"</div>
          </div>
        )}
        {response && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <Label>🤖 AI Response:</Label>
              <button onClick={() => { const u = new SpeechSynthesisUtterance(response.replace(/[🌾🌿🍅•]/g, "")); u.lang = lang; window.speechSynthesis.speak(u); }}
                style={css.tagBtn}>🔊 Play again</button>
            </div>
            <div style={{ background: "#e8f5e9", padding: "12px 14px", borderRadius: 8, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line", color: "#1b2b1a", border: "1px solid #a5d6a7" }}>{response}</div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── DISEASE PAGE ─────────────────────────────────────────────────────────────

function DiseasePage() {
  const [img, setImg] = useState(null);
  const [crop, setCrop] = useState("");
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!crop) { alert("Please enter crop name"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        diagnosis: getAIReply(`${crop} pest disease ${symptom}`),
        confidence: `${Math.floor(Math.random() * 20 + 75)}%`,
        severity: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
      });
    }, 1200);
  };

  const SEV_COLORS = { Low: "#2e7d32", Medium: "#f57c00", High: "#c62828", undefined: "#9e9e9e" };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" }}>
      <Card>
        <SectionTitle>📷 Upload Crop Image</SectionTitle>
        <label style={css.dropZone}>
          {img ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 12 }}>
              <img src={img} alt="crop" style={{ maxHeight: 160, maxWidth: "100%", borderRadius: 8, objectFit: "cover" }} />
              <span style={{ fontSize: 11, color: "#4caf50" }}>✅ Image ready for analysis</span>
            </div>
          ) : (
            <div style={{ padding: "28px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 13, color: "#5d7a5c", fontWeight: 500 }}>Click to upload crop photo</div>
              <div style={{ fontSize: 11, color: "#9e9e9e", marginTop: 4 }}>JPG, PNG supported</div>
            </div>
          )}
          <input type="file" accept="image/*" style={{ display: "none" }}
            onChange={e => { const f = e.target.files[0]; if (f) setImg(URL.createObjectURL(f)); }} />
        </label>
        <Label>Crop Name *</Label>
        <Input value={crop} onChange={setCrop} placeholder="e.g. Rice, Tomato, Wheat" />
        <Label>Describe Symptoms</Label>
        <textarea value={symptom} onChange={e => setSymptom(e.target.value)} rows={3}
          placeholder="e.g. Yellow spots on leaves, wilting..."
          style={{ ...css.inputStyle, resize: "none", marginBottom: 12 }} />
        <button onClick={analyze} disabled={loading || !crop} style={{ ...css.greenBtn, width: "100%", justifyContent: "center", padding: 11, opacity: !crop ? 0.6 : 1 }}>
          {loading ? "⏳ Analyzing..." : "🔬 Analyze Crop Disease"}
        </button>
      </Card>
      <Card>
        <SectionTitle>📊 Analysis Result</SectionTitle>
        {!result && !loading && (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#9e9e9e" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>Upload a crop image and click Analyze</div>
            {["Take close-up photos of affected areas", "Include both healthy and diseased parts", "Use natural lighting", "Describe visible symptoms for accuracy"].map((t, i) => (
              <div key={i} style={{ fontSize: 12, color: "#4caf50", marginBottom: 6, textAlign: "left" }}>✓ {t}</div>
            ))}
          </div>
        )}
        {loading && <div style={{ textAlign: "center", padding: 40 }}><div style={css.spinnerStyle} />
          <div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>AI is analyzing your crop...</div></div>}
        {result && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              {[["Confidence", result.confidence, "#2e7d32"], ["Severity", result.severity, SEV_COLORS[result.severity]], ["Crop", crop, "#1565c0"]].map(([l, v, c]) => (
                <div key={l} style={{ flex: 1, background: "#f5f5f5", borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: c }}>{v}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#f9fbe7", borderRadius: 10, padding: "12px 14px", border: "1px solid #dce775", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line", color: "#1b2b1a" }}>
              <strong style={{ color: "#827717" }}>Diagnosis & Treatment:</strong>{"\n\n"}{result.diagnosis}
            </div>
            <div style={{ ...css.infoBox, marginTop: 10 }}>⚠️ AI-assisted diagnosis only. Consult local KVK for confirmed results.</div>
          </>
        )}
      </Card>
    </div>
  );
}

// ─── CROPS PAGE ───────────────────────────────────────────────────────────────

const CROP_DATA = [
  { name: "Rice / Paddy", icon: "🌾", yield: "3–5 t/ha", duration: "120–150 days", desc: "Staple food crop. Kharif season. Requires 1200–2000mm water.", color: "#2e7d32" },
  { name: "Cotton", icon: "🌿", yield: "2–3 bales/ha", duration: "150–180 days", desc: "Cash crop. Black soil preferred. Good for Telangana.", color: "#5d4037" },
  { name: "Maize / Corn", icon: "🌽", yield: "4–6 t/ha", duration: "80–95 days", desc: "Food & feed crop. Suitable for all soil types.", color: "#f57f17" },
  { name: "Tomato", icon: "🍅", yield: "20–30 t/ha", duration: "90–120 days", desc: "High-value vegetable. Kharif & Rabi both.", color: "#c62828" },
  { name: "Soybean", icon: "🫘", yield: "2–3 t/ha", duration: "90–100 days", desc: "Protein-rich. Good for loamy soil. Kharif season.", color: "#558b2f" },
  { name: "Wheat", icon: "🌾", yield: "3–4 t/ha", duration: "120–150 days", desc: "Rabi season. Needs cool climate. North India.", color: "#ef6c00" },
  { name: "Groundnut", icon: "🥜", yield: "1.5–2 t/ha", duration: "90–120 days", desc: "Oilseed crop. Red loamy soil preferred.", color: "#8d6e63" },
  { name: "Sugarcane", icon: "🌿", yield: "70–100 t/ha", duration: "10–12 months", desc: "Cash crop. High water requirement.", color: "#43a047" },
];

function CropsPage() {
  const [season, setSeason] = useState("");
  const [soil, setSoil] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <SectionTitle>🌱 Find Best Crops for Your Farm</SectionTitle>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Label>Season</Label>
            <Select value={season} onChange={setSeason} options={["All seasons", "Kharif", "Rabi", "Zaid"]} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Label>Soil Type</Label>
            <Select value={soil} onChange={setSoil} options={["All types", "Black", "Red loamy", "Sandy", "Alluvial"]} />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <Label>State</Label>
            <Select value="" onChange={() => {}} options={["All states", "Telangana", "Andhra Pradesh", "Maharashtra"]} />
          </div>
          <button style={{ ...css.greenBtn, alignSelf: "flex-end" }}>🔍 Get Recommendations</button>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
        {CROP_DATA.map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #e0e0e0" }}>
            <div style={{ padding: "14px 16px", background: c.color + "18", borderBottom: `3px solid ${c.color}`, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 28 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#666" }}>⏱ {c.duration}</div>
              </div>
              <div style={{ background: c.color, color: "#fff", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{c.yield}</div>
            </div>
            <div style={{ padding: "10px 14px", fontSize: 12, color: "#666", lineHeight: 1.5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MARKET PAGE ──────────────────────────────────────────────────────────────

const MARKET_DATA = [
  { crop: "Rice (Fine)", market: "Hyderabad", modal: "₹2,180", range: "2,100–2,250", change: "+1.5%", up: true },
  { crop: "Cotton", market: "Adilabad", modal: "₹6,380", range: "6,200–6,600", change: "+2.1%", up: true },
  { crop: "Soybean", market: "Nizamabad", modal: "₹3,950", range: "3,800–4,100", change: "+0.5%", up: true },
  { crop: "Maize", market: "Karimnagar", modal: "₹1,490", range: "1,450–1,550", change: "−0.7%", up: false },
  { crop: "Tomato", market: "Kurnool", modal: "₹1,050", range: "800–1,200", change: "+5.2%", up: true },
  { crop: "Onion", market: "Nashik", modal: "₹1,650", range: "1,500–1,800", change: "−1.2%", up: false },
  { crop: "Wheat", market: "Bhopal", modal: "₹2,200", range: "2,100–2,300", change: "+0.3%", up: true },
  { crop: "Turmeric", market: "Nizamabad", modal: "₹7,850", range: "7,500–8,200", change: "+3.5%", up: true },
];
const MSP_DATA = [
  ["Rice (Common)", "₹2,183"], ["Wheat", "₹2,275"], ["Cotton", "₹6,620"],
  ["Maize", "₹2,090"], ["Groundnut", "₹6,377"], ["Soybean", "₹4,600"],
];

function MarketPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <SectionTitle style={{ margin: 0 }}>📈 Live Market Prices</SectionTitle>
          <span style={{ fontSize: 11, color: "#9e9e9e" }}>Source: Agmarknet (Demo) • Today</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e8f5e9" }}>
                {["Crop", "Market", "Modal Price", "Range (₹/quintal)", "Change"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 10px", color: "#666", fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.3px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MARKET_DATA.map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "10px 10px" }}><span style={{ background: "#f5f5f5", padding: "3px 10px", borderRadius: 10, fontSize: 12 }}>{r.crop}</span></td>
                  <td style={{ padding: "10px 10px", color: "#666", fontSize: 12 }}>{r.market}</td>
                  <td style={{ padding: "10px 10px", fontWeight: 600 }}>{r.modal}</td>
                  <td style={{ padding: "10px 10px", color: "#9e9e9e", fontSize: 11 }}>{r.range}</td>
                  <td style={{ padding: "10px 10px", color: r.up ? "#2e7d32" : "#c62828", fontWeight: 600 }}>{r.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <SectionTitle>🏛️ MSP 2023–24 (Minimum Support Prices)</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {MSP_DATA.map(([c, p]) => (
            <div key={c} style={{ background: "#f9fbe7", borderRadius: 10, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #dce775" }}>
              <span style={{ fontSize: 12, color: "#555" }}>{c}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#2e7d32" }}>{p}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── TASKS PAGE ───────────────────────────────────────────────────────────────

const INITIAL_TASKS = [
  { id: 1, title: "Apply NPK fertilizer to paddy field", crop: "Rice", priority: "HIGH", status: "PENDING" },
  { id: 2, title: "Spray fungicide — blight detected on cotton", crop: "Cotton", priority: "HIGH", status: "IN_PROGRESS" },
  { id: 3, title: "Arrange drip irrigation for tomato section", crop: "Tomato", priority: "MEDIUM", status: "PENDING" },
  { id: 4, title: "Soil testing for Rabi season prep", crop: "All crops", priority: "MEDIUM", status: "IN_PROGRESS" },
  { id: 5, title: "Harvest wheat field — Block A", crop: "Wheat", priority: "HIGH", status: "COMPLETED" },
];
const STATUS_NEXT = { PENDING: "IN_PROGRESS", IN_PROGRESS: "COMPLETED", COMPLETED: "PENDING" };
const STATUS_BTN = { PENDING: "▶ Start", IN_PROGRESS: "✓ Complete", COMPLETED: "↺ Reset" };
const STATUS_COLOR = { PENDING: "#f57c00", IN_PROGRESS: "#1565c0", COMPLETED: "#2e7d32" };
const PRIORITY_COLOR = { HIGH: "#c62828", MEDIUM: "#e65100", LOW: "#6a1b9a" };

function TasksPage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", crop: "", priority: "MEDIUM" });
  const visible = filter ? tasks.filter(t => t.status === filter) : tasks;
  const counts = { PENDING: tasks.filter(t => t.status === "PENDING").length, IN_PROGRESS: tasks.filter(t => t.status === "IN_PROGRESS").length, COMPLETED: tasks.filter(t => t.status === "COMPLETED").length };

  const addTask = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setTasks(p => [...p, { id: Date.now(), ...form, status: "PENDING" }]);
    setForm({ title: "", crop: "", priority: "MEDIUM" });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
        {[["📋 Pending", counts.PENDING, "#f57c00"], ["⚙️ In Progress", counts.IN_PROGRESS, "#1565c0"], ["✅ Completed", counts.COMPLETED, "#2e7d32"]].map(([l, n, c]) => (
          <div key={l} style={{ background: "#fff", border: "1px solid #e0e0e0", borderTop: `4px solid ${c}`, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: c }}>{n}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["", "All"], ["PENDING", "Pending"], ["IN_PROGRESS", "In Progress"], ["COMPLETED", "Completed"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              style={{ ...css.tagBtn, ...(filter === v ? { background: "#2e7d32", color: "#fff", borderColor: "#2e7d32" } : {}) }}>{l}</button>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} style={css.greenBtn}>
          {showForm ? "✕ Cancel" : "+ Add Task"}
        </button>
      </div>
      {showForm && (
        <div style={{ background: "#fff", border: "1px solid #c8e6c9", borderRadius: 12, padding: 18, marginBottom: 14 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, color: "#1b5e20" }}>📝 New Farm Task</div>
          <form onSubmit={addTask}>
            <div style={css.row}>
              <div style={{ flex: 2 }}><Label>Task Title *</Label><Input value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} placeholder="e.g. Apply fertilizer to paddy" /></div>
              <div style={{ flex: 1 }}><Label>Crop Name</Label><Input value={form.crop} onChange={v => setForm(p => ({ ...p, crop: v }))} placeholder="Rice, Cotton..." /></div>
              <div style={{ flex: 1 }}><Label>Priority</Label>
                <Select value={form.priority} onChange={v => setForm(p => ({ ...p, priority: v }))} options={["HIGH", "MEDIUM", "LOW"]} />
              </div>
            </div>
            <button style={css.greenBtn} type="submit">✅ Add Task</button>
          </form>
        </div>
      )}
      {visible.map(t => (
        <div key={t.id} style={{ background: "#fff", border: "1px solid #e0e0e0", borderLeft: `4px solid ${STATUS_COLOR[t.status]}`, borderRadius: 10, padding: "13px 16px", marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <span style={{ background: PRIORITY_COLOR[t.priority] + "18", color: PRIORITY_COLOR[t.priority], padding: "2px 9px", borderRadius: 10, fontSize: 10, fontWeight: 600 }}>{t.priority}</span>
              <span style={{ background: STATUS_COLOR[t.status] + "18", color: STATUS_COLOR[t.status], padding: "2px 9px", borderRadius: 10, fontSize: 10, fontWeight: 600 }}>{t.status.replace("_", " ")}</span>
            </div>
          </div>
          {t.crop && <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>🌱 {t.crop}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setTasks(p => p.map(x => x.id === t.id ? { ...x, status: STATUS_NEXT[x.status] } : x))}
              style={css.tagBtn}>{STATUS_BTN[t.status]}</button>
            <button onClick={() => setTasks(p => p.filter(x => x.id !== t.id))}
              style={{ ...css.tagBtn, color: "#c62828", borderColor: "#f8bbd0" }}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── COMMUNITY PAGE ───────────────────────────────────────────────────────────

const INITIAL_POSTS = [
  { id: 1, name: "Venkat Rao", loc: "Warangal, TG", crop: "Rice", content: "Applied neem oil spray on my paddy last week — pest problem reduced by 60%! Organic approach is working well this season. Highly recommend to fellow farmers.", likes: 24, time: "2h ago" },
  { id: 2, name: "Lakshmi Devi", loc: "Nalgonda, TG", crop: "Cotton", content: "Cotton prices at Adilabad touched ₹6,600/quintal today! Best price this season. Farmers holding stock should consider selling before prices drop.", likes: 41, time: "5h ago" },
  { id: 3, name: "Suresh Reddy", loc: "Karimnagar, TG", crop: "Tomato", content: "Early blight spreading in my tomato field. Applied Mancozeb 2.5g/L as the AI assistant suggested — seeing major improvement after 3 days. Thank you Smart Farmer AI!", likes: 18, time: "1d ago" },
];

function CommunityPage({ farmer }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [content, setContent] = useState("");
  const [crop, setCrop] = useState("");

  const share = () => {
    if (!content.trim()) return;
    const name = farmer?.fullName || "You";
    setPosts(p => [{ id: Date.now(), name, loc: farmer?.city || "Your location", crop: crop || "General", content, likes: 0, time: "Just now" }, ...p]);
    setContent(""); setCrop("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Card>
        <SectionTitle>✍️ Share your experience</SectionTitle>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={3}
          placeholder="Share a farming tip, experience, or question..."
          style={{ ...css.inputStyle, width: "100%", resize: "none", marginBottom: 10 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Select value={crop} onChange={setCrop} options={["Select crop...", "Rice", "Cotton", "Tomato", "Wheat", "General"]} style={{ width: 180 }} />
          <button style={css.greenBtn} onClick={share}>Post to community</button>
        </div>
      </Card>
      {posts.map(p => (
        <div key={p.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e0e0e0", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#3a7d3e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, flexShrink: 0 }}>
              {p.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: "#9e9e9e" }}>📍 {p.loc}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.6, marginBottom: 10 }}>{p.content}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setPosts(ps => ps.map(x => x.id === p.id ? { ...x, likes: x.likes + 1 } : x))}
              style={{ ...css.tagBtn, display: "flex", alignItems: "center", gap: 4 }}>❤️ {p.likes}</button>
            <span style={{ background: "#e8f5e9", color: "#2e7d32", padding: "2px 9px", borderRadius: 10, fontSize: 11 }}>🌱 {p.crop}</span>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "#bdbdbd" }}>{p.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ANALYTICS PAGE ───────────────────────────────────────────────────────────

function AnalyticsPage() {
  const barData = [["Mon", 6], ["Tue", 9], ["Wed", 4], ["Thu", 12], ["Fri", 8], ["Sat", 5], ["Sun", 3]];
  const topics = [["Fertilizers", 70, "#2e7d32"], ["Pests/Disease", 55, "#f57c00"], ["Soil Health", 40, "#1565c0"], ["Weather", 35, "#5d4037"]];
  const max = Math.max(...barData.map(b => b[1]));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[["Total Tasks", 10, "#2e7d32"], ["AI Queries", 47, "#1565c0"], ["Posts Shared", 8, "#5d4037"], ["Crops Tracked", 3, "#f57c00"]].map(([l, n, c]) => (
          <div key={l} style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: c }}>{n}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Card>
          <SectionTitle>Task Completion Rate</SectionTitle>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <svg viewBox="0 0 120 120" width={120} height={120}>
              <circle cx={60} cy={60} r={50} fill="none" stroke="#e8f5e9" strokeWidth={12} />
              <circle cx={60} cy={60} r={50} fill="none" stroke="#2e7d32" strokeWidth={12}
                strokeDasharray="188 126" strokeLinecap="round" strokeDashoffset={-31} transform="rotate(-90 60 60)" />
              <text x={60} y={66} textAnchor="middle" fontSize={20} fontWeight={600} fill="#1b2b1a">60%</text>
            </svg>
          </div>
          {[["Completed", 60, "#2e7d32"], ["In Progress", 20, "#1565c0"], ["Pending", 20, "#f57c00"]].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 56, fontSize: 11, color: "#666" }}>{l}</div>
              <div style={{ flex: 1, height: 7, background: "#f5f5f5", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${v}%`, background: c, borderRadius: 4 }} />
              </div>
              <div style={{ width: 32, fontSize: 11, color: "#666", textAlign: "right" }}>{v}%</div>
            </div>
          ))}
        </Card>
        <Card>
          <SectionTitle>AI Queries This Week</SectionTitle>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90, marginBottom: 10 }}>
            {barData.map(([d, v]) => (
              <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", height: `${Math.round(v / max * 100)}%`, background: "#2e7d32", borderRadius: "3px 3px 0 0", minHeight: 4 }} />
                </div>
                <div style={{ fontSize: 10, color: "#9e9e9e" }}>{d}</div>
              </div>
            ))}
          </div>
          <SectionTitle>Top Topics Asked</SectionTitle>
          {topics.map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 70, fontSize: 11, color: "#666" }}>{l}</div>
              <div style={{ flex: 1, height: 7, background: "#f5f5f5", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${v}%`, background: c, borderRadius: 4 }} />
              </div>
              <div style={{ width: 28, fontSize: 11, color: "#666", textAlign: "right" }}>{v}%</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function Card({ children, style }) {
  return <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid #e0e0e0", ...style }}>{children}</div>;
}
function SectionTitle({ children }) {
  return <div style={{ fontWeight: 600, fontSize: 14, color: "#1b5e20", marginBottom: 12 }}>{children}</div>;
}
function Label({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>{children}</div>;
}
function Input({ value, onChange, placeholder, type = "text" }) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...css.inputStyle, marginBottom: 12 }} />;
}
function Select({ value, onChange, options, style }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ ...css.inputStyle, marginBottom: 12, ...style }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const css = {
  authPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)", padding: 20 },
  authCard: { background: "#fff", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(46,125,50,0.15)" },
  authLogo: { textAlign: "center", marginBottom: 20 },
  authBrand: { fontWeight: 700, fontSize: "1.3rem", color: "#2e7d32", marginTop: 6 },
  authBrandSub: { fontSize: "0.8rem", color: "#666", marginTop: 2 },
  authHeading: { textAlign: "center", fontSize: "1.4rem", fontWeight: 700, color: "#1b2b1a", marginBottom: 6 },
  authSub: { textAlign: "center", color: "#666", fontSize: "0.85rem", marginBottom: 20 },
  authBtn: { width: "100%", padding: "11px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", marginBottom: 16 },
  authFooter: { textAlign: "center", color: "#666", fontSize: "0.88rem" },
  authLink: { color: "#2e7d32", fontWeight: 700, cursor: "pointer" },
  errBox: { background: "#ffebee", color: "#c62828", padding: "10px 14px", borderRadius: 8, fontSize: "0.88rem", marginBottom: 14, borderLeft: "3px solid #d32f2f" },
  infoBox: { background: "#e3f2fd", color: "#1565c0", padding: "10px 14px", borderRadius: 8, fontSize: "0.85rem", borderLeft: "3px solid #1976d2", marginBottom: 8 },
  row: { display: "flex", gap: 12 },
  sectionLabel: { fontSize: "0.78rem", fontWeight: 700, color: "#2e7d32", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 },
  dashLayout: { display: "flex", height: "100vh", overflow: "hidden", background: "#f1f8e9" },
  sidebar: { width: 210, background: "#1a3a1f", display: "flex", flexDirection: "column", flexShrink: 0 },
  brand: { display: "flex", alignItems: "center", gap: 10, padding: "18px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" },
  brandName: { color: "#fff", fontWeight: 700, fontSize: "0.95rem", lineHeight: 1.3 },
  brandSub: { color: "#6da870", fontSize: "0.72rem" },
  farmerBadge: { display: "flex", alignItems: "center", gap: 10, margin: "10px 10px 0", background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px" },
  avatar: { width: 34, height: 34, background: "#3a7d3e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 },
  farmerName: { color: "#fff", fontWeight: 600, fontSize: "0.85rem" },
  farmerCity: { color: "#6da870", fontSize: "0.72rem", marginTop: 2 },
  navBtn: { width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: "transparent", border: "none", borderLeft: "3px solid transparent", cursor: "pointer", color: "#a8c9aa", fontSize: "0.85rem", fontWeight: 500, textAlign: "left", transition: "all 0.15s" },
  navBtnActive: { background: "rgba(255,255,255,0.1)", color: "#fff", borderLeftColor: "#f9a825" },
  navLabel: { whiteSpace: "nowrap" },
  logoutBtn: { background: "none", border: "none", borderTop: "1px solid rgba(255,255,255,0.1)", color: "#ef9a9a", padding: "12px 14px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, textAlign: "left" },
  mainArea: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topBar: { background: "#fff", padding: "12px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #c8e6c9" },
  topBarTitle: { display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: "1rem", color: "#1b2b1a" },
  topBarGreet: { color: "#666", fontSize: "0.88rem" },
  pageContent: { flex: 1, overflowY: "auto", padding: "18px 22px" },
  weatherHero: { background: "linear-gradient(135deg, #1b5e20, #2e7d32)", borderRadius: 12, padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  weatherMetaBox: { background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", textAlign: "center" },
  forecastCard: { flex: 1, textAlign: "center", borderRadius: 10, padding: "12px 8px" },
  forecastDay: { fontSize: 11, color: "#666", marginBottom: 4 },
  forecastTemp: { fontSize: 12, fontWeight: 600, marginBottom: 2 },
  forecastRain: { fontSize: 11, color: "#1565c0" },
  chatHeader: { background: "linear-gradient(135deg, #1b5e20, #2e7d32)", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  chatAvatar: { width: 36, height: 36, background: "rgba(255,255,255,0.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  chatMsgs: { flex: 1, overflowY: "auto", padding: "14px 16px", background: "#fafff9" },
  aiBubble: { background: "#e8f5e9", borderRadius: "0 10px 10px 10px", padding: "10px 14px", maxWidth: "75%", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-line" },
  userBubble: { background: "#2e7d32", color: "#fff", borderRadius: "10px 0 10px 10px", padding: "10px 14px", maxWidth: "75%", fontSize: 13, lineHeight: 1.65 },
  quickBtn: { padding: "3px 10px", background: "#f1f8e9", border: "1px solid #c8e6c9", borderRadius: 12, fontSize: "0.75rem", cursor: "pointer", color: "#2e7d32", fontWeight: 500 },
  chatInput: { flex: 1, padding: "8px 12px", border: "2px solid #c8e6c9", borderRadius: 8, fontSize: 13, outline: "none", background: "#fafff9" },
  greenBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#2e7d32", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  tagBtn: { padding: "5px 12px", background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, cursor: "pointer", fontSize: 12, color: "#555", fontWeight: 500 },
  searchInput: { flex: 1, padding: "9px 13px", border: "2px solid #c8e6c9", borderRadius: 8, fontSize: 13, outline: "none" },
  inputStyle: { width: "100%", padding: "8px 12px", border: "1.5px solid #e0e0e0", borderRadius: 8, fontSize: 13, outline: "none", background: "#fafff9", fontFamily: "inherit" },
  dropZone: { display: "block", border: "2px dashed #a5d6a7", borderRadius: 10, background: "#fafff9", cursor: "pointer", marginBottom: 12, minHeight: 120, overflow: "hidden" },
  spinnerStyle: { width: 36, height: 36, border: "3px solid #e8f5e9", borderTopColor: "#2e7d32", borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto" },
};

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("login"); // login | register | dashboard
  const [farmer, setFarmer] = useState(null);

  if (screen === "login") return <LoginScreen onLogin={f => { setFarmer(f); setScreen("dashboard"); }} onGoRegister={() => setScreen("register")} />;
  if (screen === "register") return <RegisterScreen onRegister={f => { setFarmer(f); setScreen("dashboard"); }} onGoLogin={() => setScreen("login")} />;
  return <Dashboard farmer={farmer} onLogout={() => { setFarmer(null); setScreen("login"); }} />;
}
