
import { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import { Link, useNavigate } from 'react-router-dom';
import './BorrowerPage.css'

function BorrowerPage() {
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);
    
    const loadBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    };

    const isbnsearch = async (e) => {
        e.preventDefault();
        try {
            BookService.getBookbyIsbn(isbn).then((response) => {
                navigate(`/book/${response.data.id}`);
                setIsbn('');
            });
        } catch (error) {
            console.log("Can't fetch:", error);
        }
    };

    return (
        <div className='borrower-parent'>
            <div className='page-header'>
                <h1 className='page-title'>Library Collection</h1>
                <p className='page-subtitle'>Discover, search, and borrow from our extensive collection of books</p>
            </div>
            
            <div className='isbn-search'>
                <div className='search-container'>
                    <h3 className='search-title'>Quick ISBN Search</h3>
                    <p className='search-description'>Enter an ISBN-13 to find a specific book instantly</p>
                    <form onSubmit={isbnsearch}>
                        <input 
                            type="text" 
                            value={isbn} 
                            placeholder='Enter ISBN-13 (e.g., 978-3-16-148410-0)' 
                            onChange={(e) => setIsbn(e.target.value)} 
                        />
                        <button type='submit' className='isbn-search-btn'>Search</button>
                    </form>
                </div>
            </div>
            
            <div className='borrower-books'>
                <h2>Available Books</h2>
                <p className='books-subtitle'>Browse through our curated collection of books available for borrowing</p>
                <ul className="books-container">
                    {books.map((book) => (
                        <li key={book.id} className="book-item">
                            <Link to={`/book/${book.id}`}>
                                <img 
                                    src={book.imageUrl} 
                                    alt={book.title} 
                                    className='book-icon-small' 
                                />
                            </Link>
                            <Link to={`/book/${book.id}`}>
                                <div className='shortline'>
                                    <div className='book-title'>{book.title}</div>
                                    <div className='book-author'>by {book.author}</div>
                                </div>
                            </Link>
                            <div className='book-copies'>Copies Available: {book.copies}</div>
                        </li>
                    ))}
                </ul>   
            </div>
        </div>
    );
}

export default BorrowerPage;