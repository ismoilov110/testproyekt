import axios from 'axios';

/**
 * Axios instance yaratish
 * Base URL: https://forest.yutori.uz
 */
const api = axios.create({
    baseURL: 'https://forest.yutori.uz',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request interceptor
 * localStorage'dan tokenni olib Authorization header'ga qo'shish
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * 401 bo'lsa tokenni o'chirib /login ga yuborish
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
