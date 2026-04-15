// Centralized API configuration
// During development, it uses http://localhost:5000
// In production (Vercel), it will use the Render URL from environment variables

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default API_BASE_URL;
