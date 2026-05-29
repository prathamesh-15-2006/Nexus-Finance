import axios from 'axios';

// Initialize the centralized Axios instance
const api = axios.create({
  // Fallback to localhost if the environment variable is missing
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: A reasonable timeout (e.g., 15 seconds)
  timeout: 15000, 
});

// Add a request interceptor (Useful for attaching auth tokens later)
api.interceptors.request.use(
  (config) => {
    // Example: const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor (Useful for global error handling, like 401s)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access globally (e.g., redirect to login)
      console.warn('Unauthorized access - perhaps the token expired?');
    }
    return Promise.reject(error);
  }
);

export default api;