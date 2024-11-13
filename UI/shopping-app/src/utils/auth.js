import { jwtDecode } from 'jwt-decode'; // Update this line


export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const isAdmin = () => {
    const token = getToken();
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin';
};
