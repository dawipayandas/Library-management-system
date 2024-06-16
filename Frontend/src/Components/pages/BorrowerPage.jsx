// src/components/BorrowerPage.js
import React, { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import { Link, useNavigate } from 'react-router-dom';
import './BorrowerPage.css'

function BorrowerPage() {
    const [books, setBooks] = useState([]);
    const [isbn, setIsbn]=useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadBooks();
    }, []);
    

    const loadBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    };
    const isbnsearch= async(e)=>{
        e.preventDefault();
        try{
            BookService.getBookbyIsbn(isbn).then((response)=>{
                navigate(`/book/${response.data.id}`);
                 setIsbn('');
            })
        }catch(error){
            console.log("CAn't fetch:", error);
        }
        
    }
    return (
        <div>
            <div className='isbn-search'>
                <form onSubmit={isbnsearch}>
                <input type="text" value={isbn} placeholder='ISBN-13' onChange={(e)=>{setIsbn(e.target.value)}}/>
                <button type='submit' className='isbn-search-btn'>Search</button>
                </form>
            </div>
            <h1>Borrower Page</h1>
            <div>
                <h2>Available Books</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <Link to={`/book/${book.id}`}><img src={book.imageUrl} alt="UPLOAD" className='book-icon-small'/></Link>
                            <Link to={`/book/${book.id}`}>{book.title} by {book.author}</Link>
                            <p>Copies Available: {book.copies}</p>
                        </li>
                    ))}
                    
                </ul>
            </div>
        </div>
    );
}

export default BorrowerPage;