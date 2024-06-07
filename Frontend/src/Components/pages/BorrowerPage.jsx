// src/components/BorrowerPage.js
import React, { useState, useEffect } from 'react';
import BookService from '../../services/BookService';
import { Link } from 'react-router-dom';

function BorrowerPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    };

    return (
        <div>
            <h1>Borrower Page</h1>
            <div>
                <h2>Available Books</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
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
