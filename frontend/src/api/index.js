import axios from 'axios';

// Base URL - uses proxy in dev (set in package.json)
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Auto-attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - auto logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('sf_token');
      localStorage.removeItem('sf_farmer');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ===================== AUTH =====================
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (identifier, password) => api.post('/api/auth/login', { identifier, password }),
};

// ===================== AI CHAT =====================
export const aiAPI = {
  chat: (message, language = 'English') =>
    api.post('/api/ai/chat', { message, language }),
};

// ===================== CROPS =====================
export const cropAPI = {
  recommend: (params) => api.get('/api/crop/recommend', { params }),
  list: () => api.get('/api/crop/list'),
  diseases: (crop) => api.get('/api/crop/diseases', { params: { crop } }),
};

// ===================== MARKET =====================
export const marketAPI = {
  prices: (params) => api.get('/api/market/prices', { params }),
  msp: () => api.get('/api/market/msp'),
};

// ===================== TASKS =====================
export const taskAPI = {
  getAll: (status) => api.get('/api/tasks', { params: status ? { status } : {} }),
  create: (data) => api.post('/api/tasks', data),
  updateStatus: (id, status) => api.put(`/api/tasks/${id}/status`, { status }),
  delete: (id) => api.delete(`/api/tasks/${id}`),
};

// ===================== COMMUNITY =====================
export const communityAPI = {
  getAll: (crop) => api.get('/api/community', { params: crop ? { crop } : {} }),
  create: (data) => api.post('/api/community', data),
  like: (id) => api.post(`/api/community/${id}/like`),
  delete: (id) => api.delete(`/api/community/${id}`),
};

export default api;
