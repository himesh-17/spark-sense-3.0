import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Network Error';
        return Promise.reject(new Error(message));
    }
);

export default api;
