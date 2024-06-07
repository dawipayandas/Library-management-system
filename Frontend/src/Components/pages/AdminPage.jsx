// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import BookService from '../../services/BookService';

function AdminPage() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', description: '', copies: 0 });

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        BookService.getAllBooks().then((response) => {
            setBooks(response.data);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const addBook = () => {
        BookService.addBook(newBook).then(() => {
            loadBooks();
            setNewBook({ title: '', author: '', description: '', copies: 0 });
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

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Add New Book</h2>
                <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" />
                <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" />
                <textarea name="description" value={newBook.description} onChange={handleInputChange} placeholder="Description"></textarea>
                <input type="number" name="copies" value={newBook.copiesAvailable} onChange={handleInputChange} placeholder="Copies Available" />
                <button onClick={addBook}>Add Book</button>
            </div>
            <div>
                <h2>Book List</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author}
                            <button onClick={() => deleteBook(book.id)}>Delete</button>
                            <button onClick={() => updateBook(book.id, { ...book, copiesAvailable: book.copiesAvailable + 1 })}>Increase Copies</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminPage;
