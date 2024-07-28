import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withAuthHeader } from '../utils/auth';
import AdminNavbar from './AdminNavbar';
import BookService from '../../services/BookService';
import './CopyRegister.css';

const CopyRegister = () => {
  const { bookId } = useParams();
  const [copies, setCopies] = useState([]);
  const [book, setBook] = useState(null);
  var issuedcopies=0;

  useEffect(() => {
    const loadCopies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8086/issue/book/copies/${bookId}`,
          { headers: withAuthHeader() }
        );
        setCopies(response.data);
      } catch (error) {
        console.log("Error getting copies:", error);
      }
    };

    loadCopies();
  }, [bookId]);

  useEffect(() => {
    BookService.getBookById(bookId).then((response) => {
      setBook(response.data);
    });
  }, [bookId]);

  const countOccurrencesByUsername = (copies) => {
    const userCountMap = {};
    copies.forEach((copy) => {
        issuedcopies+=1;
      if (userCountMap[copy.username]) {
        userCountMap[copy.username] += 1;
      } else {
        userCountMap[copy.username] = 1;
      }
    });
    return userCountMap;
  };

  const userCountMap = countOccurrencesByUsername(copies);

  return (
    <>
      <AdminNavbar />
    <div className="copyregister-container">
      <div className="copyregister-header">
        <h1>Copies Issued for Book</h1>
      </div>
      {book && (
        <div className="book-details">
          <img src={book.imageUrl} alt="UPLOAD" className="bookicon" />
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong>  {book.genre}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Copies Available:</strong> {book.copies}</p>
          <p><strong>Copies Issued:</strong> {issuedcopies}</p>
        </div>
      )}
      <h1>Issued By:</h1>
      <ul className="user-list">
        {Object.entries(userCountMap).map(([username, count]) => (
          <li key={username}>
            <strong>User:</strong> {username}, <strong>Copies Issued:</strong> {count}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default CopyRegister;
