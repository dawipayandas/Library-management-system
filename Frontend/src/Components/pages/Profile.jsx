import React, { useEffect, useState } from 'react'
import HomeNavbar from './HomeNavbar'
import HomeFooter from './HomeFooter'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { withAuthHeader } from '../utils/auth'
import ProfileCSS from './Profile.module.css'

const Profile = () => {
 const [user, setUser]=useState([]);
 const[books, setBooks]=useState([]);
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
    const loadBook=async ()=>{
      try{
        const cookies=new Cookies();
            const username = jwtDecode(cookies.get('token')).sub;
      const response= await axios.get(
          `http://localhost:8086/issue/book/${username}`, 
          { headers: withAuthHeader() }
      );
      console.log(response.data);
      setBooks(response.data);
      }catch(error){
          console.log("Error getting book detail:", error);
      }

    }
    loadBook();
        loadUser();
    }, []);

  return (
    <div>
        <HomeNavbar/>
          <div className={ProfileCSS.profileParent}>
            <div className={ProfileCSS.profileContainer}>
                <div className={ProfileCSS.userdetails}>

                    <h3>User Deatils:</h3>
                    <h4>Username:</h4> {user.username}<br/>
                    <h4>Email:</h4> {user.email}<br/><br/>
                </div>
      
                <div className={ProfileCSS.bookDetails}>
                    <h3>Books Issued:</h3>
                    <ul className={ProfileCSS.books}>
                        {books.map((book) => (
                                <li key={book.id}>
                                    <Link to={`/book/${book.id}`}><img src={book.imageUrl} alt="UPLOAD" className={ProfileCSS.bookicon}/></Link><br/>
                                    <div className={ProfileCSS.bookname}>
                                    <Link to={`/book/${book.id}`}>{book.title} by {book.author}</Link>
                                    </div>
                                </li>
                                    ))}
                    </ul> 
                </div>
            </div>
        </div>
      <HomeFooter/>
    </div>
  )
}

export default Profile
