import axios from 'axios';

// Automatically selects URL based on environment
// In local dev (npm start), NODE_ENV is 'development'
const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://bike-rental-system-api.vercel.app/api' // Production URL
        : 'http://localhost:5000/api'; // Local URL

const api = axios.create({
    baseURL: API_URL,
});

export default api;
