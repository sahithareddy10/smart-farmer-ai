import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

const CROP_TYPES = [
  'Rice / Paddy', 'Wheat', 'Cotton', 'Maize', 'Soybean',
  'Tomato', 'Onion', 'Sugarcane', 'Groundnut', 'Turmeric', 'Other'
];

const STATES = [
  'Telangana', 'Andhra Pradesh', 'Maharashtra', 'Karnataka',
  'Tamil Nadu', 'Madhya Pradesh', 'Uttar Pradesh', 'Punjab',
  'Haryana', 'Gujarat', 'Rajasthan', 'Other'
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', mobileNumber: '', email: '', password: '', confirmPassword: '',
    village: '', city: '', state: '', cropType: '', landSize: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required';
    if (!form.mobileNumber || form.mobileNumber.length < 10) return 'Valid mobile number required';
    if (!form.password || form.password.length < 6) return 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) return 'Passwords do not match';
    if (!form.state) return 'Please select your state';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError(''); setLoading(true);
    try {
      const payload = { ...form };
      delete payload.confirmPassword;
      const res = await authAPI.register(payload);
      const { token, farmer } = res.data;
      localStorage.setItem('sf_token', token);
      localStorage.setItem('sf_farmer', JSON.stringify(farmer));
      setSuccess('Registration successful! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={{ fontSize: 36 }}>🌾</span>
          <div>
            <div style={styles.logoTitle}>Smart Farmer AI</div>
            <div style={styles.logoSub}>Farmer Registration</div>
          </div>
        </div>

        <h2 style={styles.heading}>Create Farmer Account</h2>
        <p style={styles.subtext}>Fill in your details to get started with AI-powered farming</p>

        {error && <div className="alert alert-error">❌ {error}</div>}
        {success && <div className="alert alert-success">✅ {success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div style={styles.sectionLabel}>👨‍🌾 Personal Information</div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Full Name *</label>
              <input name="fullName" placeholder="Your full name"
                value={form.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Mobile Number *</label>
              <input name="mobileNumber" type="tel" placeholder="10-digit mobile"
                value={form.mobileNumber} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>Email (optional)</label>
            <input name="email" type="email" placeholder="email@example.com"
              value={form.email} onChange={handleChange} />
          </div>

          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Password *</label>
              <input name="password" type="password" placeholder="Min 6 characters"
                value={form.password} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Confirm Password *</label>
              <input name="confirmPassword" type="password" placeholder="Re-enter password"
                value={form.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          {/* Location */}
          <div style={styles.sectionLabel}>📍 Location Details</div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Village / Town</label>
              <input name="village" placeholder="Your village"
                value={form.village} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>City / Mandal</label>
              <input name="city" placeholder="Nearest city"
                value={form.city} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>State *</label>
            <select name="state" value={form.state} onChange={handleChange} required>
              <option value="">-- Select State --</option>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Farm Info */}
          <div style={styles.sectionLabel}>🌱 Farm Information</div>
          <div style={styles.row}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Primary Crop</label>
              <select name="cropType" value={form.cropType} onChange={handleChange}>
                <option value="">-- Select Crop --</option>
                {CROP_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Land Size (acres)</label>
              <input name="landSize" placeholder="e.g. 5 acres"
                value={form.landSize} onChange={handleChange} />
            </div>
          </div>

          <button className="btn btn-primary" type="submit"
            disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
            {loading ? <><span className="spinner" style={{width:18,height:18}} /> Registering...</> : '🌾 Register as Farmer'}
          </button>
        </form>

        <div style={styles.footer}>
          Already registered?{' '}
          <Link to="/login" style={styles.link}>Login here</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
    padding: '20px 16px',
  },
  card: {
    background: 'white', borderRadius: 20, padding: '36px 32px',
    width: '100%', maxWidth: 620,
    boxShadow: '0 8px 40px rgba(46,125,50,0.15)',
  },
  logo: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, justifyContent: 'center' },
  logoTitle: { fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#2E7D32' },
  logoSub: { fontSize: '0.78rem', color: '#5D7A5C', fontWeight: 600 },
  heading: { fontFamily: "'Nunito', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#1B2B1A', textAlign: 'center', marginBottom: 6 },
  subtext: { textAlign: 'center', color: '#5D7A5C', fontSize: '0.85rem', marginBottom: 24 },
  sectionLabel: { fontSize: '0.8rem', fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10, marginTop: 4 },
  row: { display: 'flex', gap: 12 },
  footer: { textAlign: 'center', marginTop: 20, color: '#5D7A5C', fontSize: '0.9rem' },
  link: { color: '#2E7D32', fontWeight: 700, textDecoration: 'none' },
};
