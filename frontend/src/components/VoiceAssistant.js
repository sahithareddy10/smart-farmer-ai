import React, { useState, useRef } from 'react';
import { aiAPI } from '../api';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en-IN');
  const [history, setHistory] = useState([]);
  const recognitionRef = useRef(null);

  const LANG_MAP = {
    'en-IN': 'English',
    'te-IN': 'Telugu',
    'hi-IN': 'Hindi',
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      await getAIResponse(text);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const getAIResponse = async (text) => {
    setLoading(true);
    try {
      const res = await aiAPI.chat(text, LANG_MAP[language]);
      const reply = res.data.reply;
      setResponse(reply);

      // Add to history
      setHistory(prev => [{ question: text, answer: reply, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);

      // Text to Speech
      speak(reply);
    } catch (err) {
      setResponse('Unable to get AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*•]/g, ''));
    utterance.lang = language;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <div style={styles.header}>
          <div style={styles.title}>🎙️ Voice AI Assistant</div>
          <div style={styles.subtitle}>Speak in your language — Get instant farming advice</div>
        </div>

        {/* Language Select */}
        <div style={styles.langRow}>
          {Object.entries(LANG_MAP).map(([code, name]) => (
            <button
              key={code}
              style={{ ...styles.langBtn, ...(language === code ? styles.langBtnActive : {}) }}
              onClick={() => setLanguage(code)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Mic Button */}
        <div style={styles.micArea}>
          <button
            style={{
              ...styles.micBtn,
              ...(isListening ? styles.micBtnActive : {}),
              ...(loading ? styles.micBtnLoading : {}),
            }}
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
          >
            <span style={styles.micIcon}>{isListening ? '⏹️' : loading ? '⏳' : '🎙️'}</span>
          </button>
          <div style={styles.micLabel}>
            {isListening ? '🔴 Listening... Speak now!' : loading ? '⏳ Getting AI response...' : '🎙️ Tap to speak your question'}
          </div>
          {isListening && (
            <div style={styles.waves}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ ...styles.wave, animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          )}
        </div>

        {/* Transcript */}
        {transcript && (
          <div style={styles.transcriptBox}>
            <div style={styles.boxLabel}>🗣️ You said:</div>
            <div style={styles.transcriptText}>"{transcript}"</div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div style={styles.responseBox}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={styles.boxLabel}>🤖 AI Response:</div>
              <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.78rem' }} onClick={() => speak(response)}>
                🔊 Play
              </button>
            </div>
            <div style={styles.responseText}>{response}</div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={styles.history}>
          <div style={styles.historyTitle}>📜 Recent Voice Queries</div>
          {history.map((h, i) => (
            <div key={i} style={styles.historyItem}>
              <div style={styles.historyQ}>🗣️ {h.question}</div>
              <div style={styles.historyA}>{h.answer.substring(0, 120)}...</div>
              <div style={styles.historyTime}>{h.time}</div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes waveAnim {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46,125,50,0.4); }
          50% { box-shadow: 0 0 0 20px rgba(46,125,50,0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: 20 },
  mainCard: { background: 'white', borderRadius: 16, padding: 28, border: '1px solid #C8E6C9' },
  header: { textAlign: 'center', marginBottom: 24 },
  title: { fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: '#1B5E20' },
  subtitle: { color: '#5D7A5C', fontSize: '0.9rem', marginTop: 4 },
  langRow: { display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 },
  langBtn: { padding: '8px 20px', borderRadius: 20, border: '2px solid #C8E6C9', background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', fontFamily: "'Poppins', sans-serif" },
  langBtnActive: { background: '#2E7D32', color: 'white', borderColor: '#2E7D32' },
  micArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 24 },
  micBtn: {
    width: 100, height: 100, borderRadius: '50%',
    background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
    border: 'none', cursor: 'pointer', fontSize: '3rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(46,125,50,0.3)',
    transition: 'all 0.2s',
  },
  micBtnActive: {
    animation: 'pulse 1s infinite',
    background: 'linear-gradient(135deg, #C62828, #EF5350)',
  },
  micBtnLoading: { opacity: 0.7 },
  micIcon: { fontSize: '2.5rem' },
  micLabel: { color: '#5D7A5C', fontWeight: 600, fontSize: '0.92rem' },
  waves: { display: 'flex', gap: 4, alignItems: 'center', height: 30 },
  wave: { width: 4, height: 20, background: '#4CAF50', borderRadius: 2, animation: 'waveAnim 0.8s ease infinite' },
  transcriptBox: { background: '#FFF8E1', borderRadius: 10, padding: 16, marginBottom: 12, border: '1px solid #FFE082' },
  boxLabel: { fontSize: '0.8rem', fontWeight: 700, color: '#5D7A5C', marginBottom: 6 },
  transcriptText: { color: '#1B2B1A', fontStyle: 'italic', fontSize: '0.95rem' },
  responseBox: { background: '#E8F5E9', borderRadius: 10, padding: 16, border: '1px solid #A5D6A7' },
  responseText: { color: '#1B2B1A', fontSize: '0.9rem', lineHeight: 1.7, whiteSpace: 'pre-line' },
  history: { background: 'white', borderRadius: 16, padding: 24, border: '1px solid #C8E6C9' },
  historyTitle: { fontFamily: "'Nunito', sans-serif", fontWeight: 800, color: '#1B5E20', marginBottom: 14 },
  historyItem: { borderBottom: '1px solid #E8F5E9', paddingBottom: 12, marginBottom: 12 },
  historyQ: { fontWeight: 600, color: '#1B2B1A', fontSize: '0.88rem', marginBottom: 4 },
  historyA: { color: '#5D7A5C', fontSize: '0.82rem', lineHeight: 1.5 },
  historyTime: { color: '#9E9E9E', fontSize: '0.72rem', marginTop: 4 },
};
