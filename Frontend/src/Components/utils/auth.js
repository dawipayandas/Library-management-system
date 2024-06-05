import Cookies from 'universal-cookie';
export const getToken = () => {
    const cookie=new Cookies();
    return cookie.get('token');
    // return localStorage.getItem('token');
};

export const withAuthHeader = (headers = {}) => {
    const token = getToken();
    if (token) {
        // console.log(`Bearer ${token}`);
        return { ...headers, Authorization: `Bearer ${token}` };
    }
    return headers;
};
