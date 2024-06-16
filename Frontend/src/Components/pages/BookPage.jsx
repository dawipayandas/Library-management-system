// src/components/BookPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookService from '../../services/BookService';
import HomeNavbar from './HomeNavbar';
import HomeFooter from './HomeFooter';
import './BookPage.css'
import ReviewBook from './ReviewBook';
import UpvoteButton from './UpvoteButton';
import SimilarBooks from './SimilarBooks';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);


    useEffect(() => {
        BookService.getBookById(id).then((response) => {
            setBook(response.data);
            console.log(response.data);
        });
    }, [id]);


    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <HomeNavbar/>
            <div className='book-page-parent'>
            <img src={book.imageUrl} alt="UPLOAD" className='book-icon-large'/>
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
            <h4>Genre: {book.genre}</h4>
            <h4>ISBN: {book.isbn}</h4>
            <p><b>Description:</b>{book.description}</p>
            <h3>Copies Available: {book.copies}</h3>
            </div>
            <UpvoteButton bookId={id}/>
            <ReviewBook bookId={id}/>
            <SimilarBooks bookId={id}/>
            <HomeFooter/>
        </div>
    );
}

export default BookPage;
