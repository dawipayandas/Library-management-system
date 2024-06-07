// src/components/BookPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import HomeNavbar from './HomeNavbar';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        BookService.getBookById(id).then((response) => {
            setBook(response.data);
        });
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <HomeNavbar/>
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
            <p>{book.description}</p>
            <h3>Copies Available: {book.copies}</h3>
        </div>
    );
}

export default BookPage;
