import api from './api';

/**
 * Dashboard ma'lumotlarini olish
 */
export const getDashboard = async () => {
    const response = await api.get('/api/v1/reports/dashboard/');
    return response.data;
};

/**
 * Foydalanuvchilar ro'yxatini olish
 */
export const getUsers = async () => {
    const response = await api.get('/api/v1/reports/users/');
    return response.data;
};

/**
 * Statements (Ma'lumotnomalar) ro'yxatini olish
 * @param params - lang, page, per_page, search
 */
export const getStatements = async (params: {
    lang?: string;
    page?: number;
    per_page?: number;
    search?: string;
}) => {
    const response = await api.get('/api/v1/reports/statements/', { params });
    return response.data;
};
