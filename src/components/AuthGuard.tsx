import { Navigate, Outlet } from 'react-router-dom';

/**
 * AuthGuard - login qilmagan foydalanuvchini login sahifasiga redirect qiladi
 */
export const AuthGuard = () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
