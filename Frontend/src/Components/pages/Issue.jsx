import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { withAuthHeader } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import './Issue.css'


const Issue = () => {
    const {id}=useParams();
    const cookies=new Cookies();
    const navigate = useNavigate();
    const username = jwtDecode(cookies.get('token')).sub;
    const bookId = id;
    const [user, setUser]=useState([]);
    const [date, setDate]=useState({day: 0, month: '', year: 0});

    const [book, setBook]=useState({ title: '', author: '', description: '', isbn: '', genre: '', copies: 0, imageUrl: '' });
    
    

    useEffect(() => {
        const loadUser = async ()=>{
            try{
                const cookies=new Cookies();
                const username = jwtDecode(cookies.get('token')).sub;
                const response= await axios.get(
                    `http://localhost:8086/user/${username}`, 
                    { headers: withAuthHeader() }
                );
                setUser(response.data);
            }
            catch(error){
                console.log("Error getting user:", error);
            }
        }
        const loadDate = () => {
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            let dt = new Date();
            setDate({
              day: dt.getDate(),
              month: months[dt.getMonth()],
              year: dt.getFullYear()
            });
          };

          const loadBook=async ()=>{
            try{
            const response= await axios.get(
                `http://localhost:8086/books/${id}`, 
                { headers: withAuthHeader() }
            );
            setBook(response.data);
            }catch(error){
                console.log("Error getting book detail:", error);
            }

          }

        loadDate();
        loadUser();
        loadBook();
    }, [id]);

    

    const handleIssue = async () => {
        try {
            
            console.log(jwtDecode(cookies.get('token')));
            await axios.post(
                `http://localhost:8086/issue/book/${bookId}/${username}`, 
                {},
                { headers: withAuthHeader() }
            );
            alert("BOOK ISSUED");
            navigate('/home');
        } catch (error) {
            console.log("Error issuing book:", error);
        }
    }

    
    
    
  return (
    <div>
      <h2>Issue Confirmation Page</h2>
        <h3>User Deatils:</h3>
      <h4>Username: {user.username}</h4>
      <h4>Email: {user.email}</h4><br/><br/>
      <h3>Book Details:</h3>
        <img src={book.imageUrl} alt="Upload" className='book-icon-large' />
        <h4>Title: {book.title}</h4>
        <h4>Author: {book.author}</h4>
        

      <h4>Date of Issue: {date.day} {date.month} {date.year}</h4>
        <button onClick={handleIssue}>Confirm</button>
    </div>
  )
}

export default Issue
