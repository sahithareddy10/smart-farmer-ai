import React, { useState, useRef, useEffect } from 'react';
import { aiAPI } from '../api';

const LANGUAGES = ['English', 'Telugu', 'Hindi'];

const QUICK_QUESTIONS = [
  'How to grow rice organically?',
  'Best fertilizer for cotton crop?',
  'How to control tomato blight?',
  'Soil testing tips for wheat?',
  'What crops suit black soil?',
  'How to prevent waterlogging?',
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: '🌾 Namaste! I am your Smart Farmer AI Assistant.\n\nAsk me anything about:\n• Crop cultivation & fertilizers\n• Pest & disease management\n• Soil health & weather impact\n• Farming best practices\n\nHow can I help you today?',
      time: new Date().toLocaleTimeString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text = input) => {
    if (!text.trim() || loading) return;
    const question = text.trim();
    setInput('');

    const userMsg = { role: 'user', text: question, time: new Date().toLocaleTimeString() };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    try {
      const res = await aiAPI.chat(question, language);
      const aiMsg = {
        role: 'ai',
        text: res.data.reply,
        source: res.data.source,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((p) => [...p, aiMsg]);
    } catch (err) {
      setMessages((p) => [...p, {
        role: 'ai',
        text: '⚠️ Unable to connect to AI service. Please check your internet connection.',
        time: new Date().toLocaleTimeString(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.aiAvatar}>🤖</div>
          <div>
            <div style={styles.aiName}>Smart Farmer AI</div>
            <div style={styles.aiStatus}>🟢 Online</div>
          </div>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={styles.langSelect}
        >
          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
            {msg.role === 'ai' && <div style={styles.aiBubbleIcon}>🌾</div>}
            <div style={msg.role === 'user' ? styles.userBubble : styles.aiBubble}>
              <div style={styles.msgText}>{msg.text}</div>
              {msg.source && <div style={styles.source}>— {msg.source}</div>}
              <div style={styles.msgTime}>{msg.time}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={styles.aiBubbleIcon}>🌾</div>
            <div style={{ ...styles.aiBubble, padding: '12px 16px' }}>
              <div style={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div style={styles.quickSection}>
        <div style={styles.quickLabel}>💡 Quick Questions:</div>
        <div style={styles.quickButtons}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} style={styles.quickBtn} onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask your farming question..."
        />
        <button className="btn btn-primary" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          Send ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'white', borderRadius: 16, overflow: 'hidden',
    border: '1px solid #C8E6C9', display: 'flex', flexDirection: 'column',
    height: 'calc(100vh - 140px)', boxShadow: '0 2px 12px rgba(46,125,50,0.08)',
  },
  header: {
    background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
    padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  aiAvatar: { fontSize: 28, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  aiName: { color: 'white', fontWeight: 700, fontSize: '0.95rem' },
  aiStatus: { color: '#A5D6A7', fontSize: '0.78rem' },
  langSelect: { padding: '6px 12px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', fontSize: '0.85rem' },
  messages: { flex: 1, overflowY: 'auto', padding: '16px 20px', background: '#FAFFF9' },
  aiBubbleIcon: { fontSize: 20, marginRight: 8, marginTop: 4, flexShrink: 0 },
  aiBubble: {
    background: '#E8F5E9', borderRadius: '0 12px 12px 12px',
    padding: '12px 16px', maxWidth: '75%',
  },
  userBubble: {
    background: '#2E7D32', color: 'white', borderRadius: '12px 0 12px 12px',
    padding: '12px 16px', maxWidth: '75%',
  },
  msgText: { fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' },
  source: { fontSize: '0.72rem', opacity: 0.6, marginTop: 4 },
  msgTime: { fontSize: '0.7rem', opacity: 0.5, marginTop: 4, textAlign: 'right' },
  typing: {
    display: 'flex', gap: 6, alignItems: 'center',
    '& span': { width: 8, height: 8, borderRadius: '50%', background: '#4CAF50', animation: 'bounce 1.2s infinite' },
  },
  quickSection: { padding: '8px 16px', borderTop: '1px solid #E8F5E9' },
  quickLabel: { fontSize: '0.78rem', color: '#5D7A5C', fontWeight: 700, marginBottom: 6 },
  quickButtons: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  quickBtn: {
    padding: '4px 12px', background: '#F1F8E9', border: '1px solid #C8E6C9',
    borderRadius: 20, fontSize: '0.78rem', cursor: 'pointer', color: '#2E7D32',
    fontFamily: "'Poppins', sans-serif", fontWeight: 500,
  },
  inputRow: {
    display: 'flex', gap: 10, padding: '12px 16px',
    borderTop: '1px solid #C8E6C9', background: 'white',
  },
  input: {
    flex: 1, padding: '10px 14px', borderRadius: 8,
    border: '2px solid #C8E6C9', fontFamily: "'Poppins', sans-serif",
    fontSize: '0.92rem', outline: 'none',
  },
};
