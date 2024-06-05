import React from 'react'
import './Home.css'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { withAuthHeader } from '../utils/auth';

const Home = ({logout}) => {
const logouthandle= async(e)=>{
  logout();
  navigate("/");

}

const nit=async(e)=>{
  try{
  const response = await axios.get('http://localhost:8086/check', {
            headers: withAuthHeader()
        });

        console.log(response.data);
      }
      catch(error){
        console.log("error fetching response :", error);
        // throw(error);
      }
      
}
 
 const navigate = new useNavigate({logout});
  return (
    <div className='body'>
      <div className="container">Hello i am home</div>
      <button className="logout" onClick={logouthandle}>LOGOUT</button>
      <button onClick={nit}>true</button>
      {/* <div>{response}</div> */}
    </div>
  )
}


export default Home
