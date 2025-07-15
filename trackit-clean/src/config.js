// API configuration
const config = {
  API_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-url.railway.app'  // Production backend URL
    : 'http://localhost:5000'  // Development backend URL
};

export default config;