import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login(form.identifier, form.password);
      const { token, farmer } = res.data;
      localStorage.setItem('sf_token', token);
      localStorage.setItem('sf_farmer', JSON.stringify(farmer));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🌾</span>
          <div>
            <div style={styles.logoTitle}>Smart Farmer AI</div>
            <div style={styles.logoSub}>Farmer Portal</div>
          </div>
        </div>

        <h2 style={styles.heading}>Farmer Login</h2>
        <p style={styles.subtext}>Only registered farmers can access this system</p>

        {error && <div className="alert alert-error">❌ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Mobile Number or Email</label>
            <input
              name="identifier"
              type="text"
              placeholder="Enter mobile or email"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit"
            disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? <><span className="spinner" style={{width:18,height:18}} /> Logging in...</> : '🌾 Login to Dashboard'}
          </button>
        </form>

        <div style={styles.footer}>
          New farmer?{' '}
          <Link to="/register" style={styles.link}>Register here</Link>
        </div>

        {/* Demo hint */}
        <div className="alert alert-info" style={{ marginTop: 16, fontSize: '0.82rem' }}>
          💡 <strong>Demo:</strong> Register first, then login with your mobile/email & password.
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
    padding: 20,
  },
  card: {
    background: 'white',
    borderRadius: 20,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 8px 40px rgba(46,125,50,0.15)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  },
  logoIcon: { fontSize: 40 },
  logoTitle: {
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: '1.3rem',
    color: '#2E7D32',
  },
  logoSub: { fontSize: '0.8rem', color: '#5D7A5C', fontWeight: 600 },
  heading: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '1.6rem',
    fontWeight: 800,
    color: '#1B2B1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtext: {
    textAlign: 'center',
    color: '#5D7A5C',
    fontSize: '0.88rem',
    marginBottom: 24,
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: '#5D7A5C',
    fontSize: '0.9rem',
  },
  link: { color: '#2E7D32', fontWeight: 700, textDecoration: 'none' },
};
