import axios from 'axios';
import { withAuthHeader } from '../utils/auth';


const fetchProtectedData = async () => {
    try {
        const response = await axios.get('http://localhost:8086/api/protected', {
            headers: withAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching protected data', error);
        throw error;
    }
};
