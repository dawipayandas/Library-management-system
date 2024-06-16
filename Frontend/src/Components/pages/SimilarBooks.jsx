import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withAuthHeader } from '../utils/auth';
import { Link } from 'react-router-dom';
import './SimilarBooks.css'

const SimilarBooks = ({ bookId }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8086/books/genre/${bookId}`,
                    { headers: withAuthHeader() }
                );
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error getting similar books:", error);
            }
        };

        loadBooks();
    }, [bookId]);

    return (
        <div>
            <h2>Similar Books:</h2>
            {books.length > 0 ? (
               <ul>
               {books
                 .filter(book => {
                   return (String(book.id) !== String(bookId));
                 })
                 .map(book => (
                   <li key={book.id}>
                     <Link to={`/book/${book.id}`}>
                       <img src={book.imageUrl} alt="UPLOAD" className='book-icon-small' />
                     </Link>
                     <Link to={`/book/${book.id}`}>{book.title} by {book.author}</Link>
                   </li>
                 ))
               }
             </ul>
             
             
             
            ) : (
                <p>No similar books found.</p>
            )}
        </div>
    );
};

export default SimilarBooks;
