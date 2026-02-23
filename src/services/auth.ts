import api from './api';

/**
 * Login funksiyasi
 * @param email - foydalanuvchi emaili
 * @param password - foydalanuvchi paroli
 */
export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/api/v1/authentications/login/', {
            email,
            password,
        });

        // Swagger'ga ko'ra response ichida token bo'lishi kerak
        // API'dan keladigan tokenni access_token sifatida saqlaymiz
        const token = response.data.access || response.data.token || response.data.access_token;

        if (token) {
            localStorage.setItem('access_token', token);
        }

        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Logout funksiyasi
 * Tokenni o'chiradi va login sahifasiga yuboradi
 */
export const logout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
};
