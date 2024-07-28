import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { withAuthHeader } from '../utils/auth'
import ProfileCSS from './Profile.module.css'
import { ThreeDots } from 'react-loader-spinner';
import AdminNavbar from './AdminNavbar';

const UserProfile = () => {
    const [user, setUser]=useState([]);
    const[books, setBooks]=useState([]);
    const[readBooks, setReadBooks]=useState([]);
    const[loading, setLoading]=useState(false);
    const navigate=useNavigate();

    const location = useLocation();
    const { username } = location.state || {};
    
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },1000)
    },[])
    
    useEffect(() => {
        const loadUser = async ()=>{
            try{
                const response= await axios.get(
                `http://localhost:8086/user/${username}`, 
                { headers: withAuthHeader() }
            );
            if (response.data) {
                setUser(response.data);
            } else {
                alert('Username not found');
                navigate("/admin/updatebooks");
            }
        }
        catch(error){
            console.log("Error getting user:", error);
            // alert('Username not found');
            navigate("/admin/updatebooks");
        }
    }
    const loadBook=async ()=>{
      try{
      const response= await axios.get(
          `http://localhost:8086/issue/book/${username}`, 
          { headers: withAuthHeader() }
      );
      // console.log(response.data);
      setBooks(response.data);
      }catch(error){
          console.log("Error getting issued book detail:", error);
      }

    }
    const loadReadBook=async()=>{
      try{
      const response= await axios.get(
          `http://localhost:8086/readbook/${username}`, 
          { headers: withAuthHeader() }
      );
      // console.log(response.data);
      setBooks(response.data);
      }catch(error){
          console.log("Error getting Read book detail:", error);
      }
    }
    loadReadBook();
    loadBook();
        loadUser();
    }, []);

  return (
    <div>
      {loading?<div className={ProfileCSS.loader}><ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div>:
    <div>
        <AdminNavbar/>
          <div className={ProfileCSS.profileParent}>
            <div className={ProfileCSS.profileContainer}>
                <div className={ProfileCSS.userdetails}>

                    <h3>User Details:</h3>
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
                    <h3>Books Read:</h3>
                    <ul className={ProfileCSS.books}>
                        {readBooks.map((book) => (
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
    </div>
      }
    </div>
  )
}

export default UserProfile
