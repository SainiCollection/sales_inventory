import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:4000/api',
  timeout: 10000,
});

// Add basic interceptors (auth token placeholder)
apiClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
