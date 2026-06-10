import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherDashboard from '../components/WeatherDashboard';
import AIChat from '../components/AIChat';
import VoiceAssistant from '../components/VoiceAssistant';
import CropRecommendation from '../components/CropRecommendation';
import TaskTracker from '../components/TaskTracker';
import CommunityFeed from '../components/CommunityFeed';
import MarketPrices from '../components/MarketPrices';
import FarmAnalytics from '../components/FarmAnalytics';
import CropDisease from '../components/CropDisease';

const NAV_ITEMS = [
  { id: 'weather', icon: '🌦️', label: 'Weather' },
  { id: 'ai-chat', icon: '🤖', label: 'AI Assistant' },
  { id: 'voice', icon: '🎙️', label: 'Voice AI' },
  { id: 'crop-disease', icon: '🔬', label: 'Disease Detect' },
  { id: 'crop-recommend', icon: '🌱', label: 'Crop Advice' },
  { id: 'market', icon: '📈', label: 'Market Prices' },
  { id: 'tasks', icon: '✅', label: 'Task Tracker' },
  { id: 'community', icon: '👥', label: 'Community' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('weather');
  const [farmer, setFarmer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

useEffect(() => {

  try {

    const stored = localStorage.getItem('sf_farmer');

    if (stored && stored !== "undefined") {

      const parsedFarmer = JSON.parse(stored);

      setFarmer(parsedFarmer);
    }

  } catch (error) {

    console.error("Invalid farmer JSON:", error);

    localStorage.removeItem('sf_farmer');
  }

}, []);

  const logout = () => {
    localStorage.removeItem('sf_token');
    localStorage.removeItem('sf_farmer');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'weather': return <WeatherDashboard farmer={farmer} />;
      case 'ai-chat': return <AIChat />;
      case 'voice': return <VoiceAssistant />;
      case 'crop-disease': return <CropDisease />;
      case 'crop-recommend': return <CropRecommendation />;
      case 'market': return <MarketPrices />;
      case 'tasks': return <TaskTracker />;
      case 'community': return <CommunityFeed farmer={farmer} />;
      case 'analytics': return <FarmAnalytics farmer={farmer} />;
      default: return <WeatherDashboard farmer={farmer} />;
    }
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? 230 : 70 }}>
        {/* Brand */}
        <div style={styles.brand} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span style={{ fontSize: 28 }}>🌾</span>
          {sidebarOpen && (
            <div>
              <div style={styles.brandTitle}>Smart Farmer</div>
              <div style={styles.brandSub}>AI System</div>
            </div>
          )}
        </div>

        {/* Farmer Info */}
        {farmer && sidebarOpen && (
          <div style={styles.farmerInfo}>
            <div style={styles.avatar}>{farmer.fullName?.[0]?.toUpperCase() || '👨'}</div>
            <div>
              <div style={styles.farmerName}>{farmer.fullName}</div>
              <div style={styles.farmerCity}>{farmer.city || farmer.village || 'Farmer'}</div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav style={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              style={{
                ...styles.navBtn,
                ...(activeTab === item.id ? styles.navBtnActive : {}),
              }}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span style={styles.navLabel}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button onClick={logout} style={styles.logoutBtn} title="Logout">
          <span>🚪</span>
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.pageTitle}>
            <span style={{ fontSize: 22 }}>
              {NAV_ITEMS.find((n) => n.id === activeTab)?.icon}
            </span>
            <span style={styles.pageTitleText}>
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
            </span>
          </div>
          {farmer && (
            <div style={styles.greeting}>
              Namaste, <strong>{farmer.fullName?.split(' ')[0]}</strong> 🙏
            </div>
          )}
        </div>

        {/* Content */}
        <div style={styles.content}>{renderContent()}</div>
      </main>
    </div>
  );
}

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#F1F8E9' },
  sidebar: {
    background: '#1B5E20',
    display: 'flex', flexDirection: 'column',
    transition: 'width 0.3s ease',
    flexShrink: 0,
    overflow: 'hidden',
  },
  brand: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '20px 16px', cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  brandTitle: { fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: 'white', fontSize: '1rem', whiteSpace: 'nowrap' },
  brandSub: { color: '#A5D6A7', fontSize: '0.72rem', whiteSpace: 'nowrap' },
  farmerInfo: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 16px', margin: '8px 10px',
    background: 'rgba(255,255,255,0.08)', borderRadius: 10,
  },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: '#4CAF50', color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: '1.1rem', flexShrink: 0,
  },
  farmerName: { color: 'white', fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' },
  farmerCity: { color: '#A5D6A7', fontSize: '0.75rem', whiteSpace: 'nowrap' },
  nav: { flex: 1, padding: '8px 0', overflowY: 'auto' },
  navBtn: {
    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 16px', background: 'transparent', border: 'none',
    cursor: 'pointer', color: '#C8E6C9', transition: 'all 0.2s',
    borderLeft: '3px solid transparent', textAlign: 'left',
  },
  navBtnActive: {
    background: 'rgba(255,255,255,0.12)',
    color: 'white',
    borderLeft: '3px solid #F9A825',
  },
  navIcon: { fontSize: 20, flexShrink: 0 },
  navLabel: { fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap' },
  logoutBtn: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 16px', background: 'transparent', border: 'none',
    cursor: 'pointer', color: '#EF9A9A', width: '100%',
    borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.88rem', fontWeight: 600,
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topBar: {
    background: 'white', padding: '14px 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    borderBottom: '1px solid #C8E6C9',
  },
  pageTitle: { display: 'flex', alignItems: 'center', gap: 10 },
  pageTitleText: { fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#1B2B1A' },
  greeting: { color: '#5D7A5C', fontSize: '0.9rem' },
  content: { flex: 1, overflowY: 'auto', padding: 24 },
};
