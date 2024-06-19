import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { withAuthHeader } from '../utils/auth';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import IssuePageCss from './Issue.module.css'


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

    const handelCancel=()=>{
      navigate(`/book/${bookId}`);
    }
    
    
    
  return (
    <div className={IssuePageCss.issueParent}>
    <div className={IssuePageCss.issueContainer}>
      <h2>Issue Confirmation Page</h2>
      
      <div>
          <h3>User Deatils:</h3>
          <div className={IssuePageCss.details}>
        <h4>Username:</h4> {user.username}<br/>
        <h4>Email:</h4> {user.email}<br/><br/>
        </div>
      </div>

      <div>
        <h3>Book Details:</h3>
        <div className={IssuePageCss.details}>
          <img src={book.imageUrl} alt="Upload" className={IssuePageCss.bookIconLarge} /><br/>
          <h4>Title: </h4>{book.title}<br/>
          <h4>Author: </h4>{book.author}<br/>
          <h4>Date of Issue: </h4>{date.day} {date.month} {date.year}<br/><br/>
        </div>
      </div>
        
      <div className={IssuePageCss.issueButtons}>
        <button onClick={handleIssue} id={IssuePageCss.confirm}>Confirm</button>
        <button onClick={handelCancel}  id={IssuePageCss.cancel}>Cancel</button>
      </div>

    </div>
    </div>
  )
}

export default Issue
