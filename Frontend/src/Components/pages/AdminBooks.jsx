import React, { useState, useEffect} from 'react';
import BookService from '../../services/BookService';
import AdminCSS from './Admin.module.css'
import { ThreeDots } from 'react-loader-spinner';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading]=useState(false);
    const [username, setUsername]=useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },1000)
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    };


    const deleteBook = (id) => {
        BookService.deleteBook(id).then(() => {
            loadBooks();
        });
    };

    const updateBook = (id, updatedBook) => {
        BookService.updateBook(id, updatedBook).then(() => {
            loadBooks();
        });
    };

    const usernameSearch =(e)=>{
        e.preventDefault();
        navigate('/admin/userprofile', { state: { username } });
    }


    return (
        <>
            {loading?<div className={AdminCSS.adminParent}><ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div>
            :
            <>
            <AdminNavbar/>
            <div className={AdminCSS.adminParent}>
                <div className={AdminCSS.username}>
                    <form onSubmit={usernameSearch}>
                        <input 
                            type="text" 
                            value={username} 
                            placeholder='Search Username...' 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <button type='submit' className={AdminCSS.searchButton}>Search</button>
                    </form>
                </div>
            <div className={AdminCSS.adminContainer}>
                <h1>Available Books</h1>
                <div>
                    <div className={AdminCSS.showBook}>
                        <h2>Book List</h2>
                        <ul>
                            {books.map((book) => (
                                <li key={book.id}>
                                    <p>{book.title} by <i>{book.author}</i></p>
                                    <p id={AdminCSS.copies}>COPIES: {book.copies}</p>
                                    <div className={AdminCSS.twobuttons}>
                                    <button onClick={() => deleteBook(book.id)} id={AdminCSS.deletebutton}>Delete</button>
                                    <button onClick={() => updateBook(book.id, { ...book, copies: book.copies + 1 })} id={AdminCSS.increasebutton}>Increase Copies</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
            }
    </>
    );
}

export default AdminPage;
