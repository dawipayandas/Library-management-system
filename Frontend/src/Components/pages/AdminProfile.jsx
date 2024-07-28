import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { withAuthHeader } from '../utils/auth'
import ProfileCSS from './Profile.module.css'
import { ThreeDots } from 'react-loader-spinner';
import AdminNavbar from './AdminNavbar';

const AdminProfile = () => {
 const [user, setUser]=useState([]);
 const[loading, setLoading]=useState(false);

 useEffect(()=>{
   setLoading(true);
   setTimeout(()=>{
     setLoading(false);
   },1000)
 },[])

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

                    <h3>Role:ADMIN</h3>
                    <h3>Admin Details:</h3>
                    <h4>Username:</h4> {user.username}<br/>
                    <h4>Email:</h4> {user.email}<br/><br/>
                </div>
            </div>
        </div>
    </div>
      }
    </div>
  )
}

export default AdminProfile
