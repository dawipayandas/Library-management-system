import axios from 'axios';
import {withAuthHeader} from '../Components/utils/auth'
const API_URL = 'http://localhost:8086/books';

class BookService {
    getAllBooks() {
        return axios.get(API_URL, {
            headers: withAuthHeader()
        });
    }

    getBookById(id) {
        return axios.get(`${API_URL}/${id}`, {
            headers: withAuthHeader()
        });
    }

    addBook(book) {
        return axios.post(API_URL, book, {
            headers: withAuthHeader()
        });
    }

    updateBook(id, book) {
        return axios.put(`${API_URL}/${id}`, book, {
            headers: withAuthHeader()
        });}

    deleteBook(id) {
        return axios.delete(`${API_URL}/${id}`, {
            headers: withAuthHeader()
        });
    }

    getBookbyIsbn(isbn){
        return axios.get(`${API_URL}/isbn/${isbn}`, {
            headers: withAuthHeader()
        });
    }
}

const bookServiceInstance = new BookService();
export default bookServiceInstance;