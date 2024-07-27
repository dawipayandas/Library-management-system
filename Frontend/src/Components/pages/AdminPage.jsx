
import React, { useState, useEffect, useRef } from 'react';
import BookService from '../../services/BookService';
import { CloudinaryContext } from 'cloudinary-react';
import axios from 'axios';
import AdminCSS from './Admin.module.css'
import { ThreeDots } from 'react-loader-spinner';
import AdminNavbar from './AdminNavbar';

function AdminPage() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', description: '', isbn: '', genre: '', copies: 0, imageUrl: '' });
    const fileInputRef = useRef(null);
    const [loading, setLoading]=useState(false);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const addBook = () => {
        if (!newBook.imageUrl) {
            alert('Please upload an image before adding the book.');
            return;
        }
        if (!newBook.title) {
            alert('Please title an image before adding the book.');
            return;
        }
        if (!newBook.genre) {
            alert('Please genre an image before adding the book.');
            return;
        }
        BookService.addBook(newBook).then(() => {
            loadBooks();
            setNewBook({ title: '', author: '', description: '', isbn: '', genre: '', copies: 0, imageUrl: '' });
            fileInputRef.current.value = '';
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

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'oefdtqoc');
        
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/duvofudxs/image/upload', formData);
            const uploadedImageUrl = response.data.secure_url;
            setNewBook({ ...newBook, imageUrl: uploadedImageUrl });
            console.log(uploadedImageUrl);
        } catch (error) {
            console.log('Error uploading the image:', error);
        }
    };

    return (
        <>
        <div><AdminNavbar/></div>
        <div className={AdminCSS.adminParent}>
            {loading?<div><ThreeDots
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
            <div className={AdminCSS.adminContainer}>
                <h1>Admin Page</h1>
                <div className={AdminCSS.addbook}>
                    <h2>Add New Book</h2>

                    <CloudinaryContext cloudName="duvofudxs">
                            <input type="file" onChange={handleUpload} ref={fileInputRef}/>
                    </CloudinaryContext>

                    <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" />
                    <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" />
                    <input type="text" name="isbn" value={newBook.isbn} onChange={handleInputChange} placeholder="ISBN" />
                    <input type="text" name="genre" value={newBook.genre} onChange={handleInputChange} placeholder="Genre" />
                    <textarea name="description" value={newBook.description} onChange={handleInputChange} placeholder="Description"></textarea>
                    <input type="number" name="copies" value={newBook.copies} onChange={handleInputChange} placeholder="Copies Available" />
                    <button onClick={addBook}>Add Book</button>
                </div>
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
            }
        </div>
        </>
    );
}

export default AdminPage;
