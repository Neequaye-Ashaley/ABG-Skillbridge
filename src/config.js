// Centralized API configuration
// In local development: defaults to 'http://localhost:5000'
// In production on Vercel: reads process.env.REACT_APP_API_URL (which points to Render)
const rawApiUrl = process.env.REACT_APP_API_URL;

export const API_URL = rawApiUrl
  ? rawApiUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '')
  : (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000');

export default API_URL;

