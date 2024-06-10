import Cookies from 'universal-cookie';
export const getToken = () => {
    const cookie=new Cookies();
    return cookie.get('token');
};

export const withAuthHeader = (headers = {}) => {
    const token = getToken();
    if (token) {
        return { ...headers, Authorization: `Bearer ${token}` };
    }
    return headers;
};
