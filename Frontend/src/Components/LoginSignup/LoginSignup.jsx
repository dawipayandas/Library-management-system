import React, { useState } from 'react';

import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

import './LoginSignup.css';


import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = ({login},{logout}) => {
    
    const [action, setaction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setrole] = useState(['']);
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    const cookie= new Cookies();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (action === "Sign Up") {
            try {
                await axios.post('http://localhost:8086/api/auth/signup', { username, email, password, role }, { withCredentials: true });
                setMessage('Signup successful! Please login.');
                setaction('Login');
            } catch (error) {
                setMessage('Signup failed. Please try again.');
            }
        } else {
            try {
                const response = await axios.post('http://localhost:8086/api/auth/signin', { username, password }, { withCredentials: true });
                console.log(response.data); // Log the response data
                // localStorage.setItem('token', response.data.token);
                const decoded= jwtDecode(response.data.token);
                console.log(decoded);
                cookie.set('token', response.data.token, {expires: new Date(decoded.exp * 1000)} );
                setMessage('Login successful!');
                login();
                // role == ["user"] ? navigate('/home'): navigate('/admin');
                // const temp = response.data.roles;
                const temp= ["ROLE_USER"];
                if(JSON.stringify(temp)=== JSON.stringify(response.data.roles))
                navigate('/home');
                else
                navigate('/admin');
            } catch (error) {
                
                setMessage('Login failed. Please try again.');
            }
        }
    };




     const userExists = (username)=>{
        const exists = axios.post('http://localhost:8086/api/auth/exists', { username}, { withCredentials: true });

        return (exists.data);
     };


      const registerUser= async(username, email, password)=>{

        try {
            await axios.post('http://localhost:8086/api/auth/signup', { username, email, password }, { withCredentials: true });
            setMessage('Signup successful! Please login.');
        } catch (error) {
            setMessage('Signup failed. Please try again.');
        }

    };
      const loginUser=async(username, password)=>{
        try {
            const response = await axios.post('http://localhost:8086/api/auth/signin', { username, password }, { withCredentials: true });
            console.log(response.data); // Log the response data
            
            const decoded= jwtDecode(response.data.token);
            console.log(decoded);
            cookie.set('token', response.data.token, {expires: new Date(decoded.exp * 1000)} );
            setMessage('Login successful!');
            login();
            navigate('/home');
        } catch (error) {
            
            setMessage('Login failed. Please try again.');
        }

      }



    return (
        <GoogleOAuthProvider clientId="189301073909-6ulqhvhdbq747ch62vebuejs2no2nk19.apps.googleusercontent.com">
        
           <div className="auth-body">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="auth-text">{action}</div>
                    <div className="auth-underline"></div>
                </div>
                {message ? console.log(message):<div></div>}
                <form className="auth-inputs" onSubmit={handleSubmit}> 
                    <div className="auth-input">
                        <img src={user_icon} alt="User Icon" />
                        <input 
                            type="text"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    {action === "Sign Up" ?
                        <div className="auth-input">
                            <img src={email_icon} alt="Email Icon" />
                            <input
                                type="email"
                                placeholder='Email Id'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>:<div></div>
                    }
                    <div className="auth-input">
                        <img src={password_icon} alt="Password Icon" />
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {action==="Sign Up"?<div className="auth-role">
                    <div>
                        <input
                            type="radio"
                            name="role"
                            id="user"
                            value="user"
                            defaultChecked
                            onClick={() => setrole(["user"])}
                        />
                        <label htmlFor="user" className="auth-role-radio">USER</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="role"
                            id="admin"
                            value="admin"
                            onClick={() => setrole(["admin"])}
                        />
                        <label htmlFor="admin">ADMIN</label>
                    </div>

                        
                    </div>:<div></div>}
                    <div className="auth-submit-container">
                        <button className={action==="Login"?"auth-submit grey":"auth-submit"} onClick={()=>{setaction("Sign Up")}} type="submit">Sign Up</button>
                        <button className={action==="Sign Up"?"auth-submit grey":"auth-submit"} onClick={()=>{setaction("Login")}} type="submit">Login</button>
                    </div>
                </form>
                <div className="auth-google-logo">
                        <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log("google response:",credentialResponse);
                            const googleUser = jwtDecode(credentialResponse.credential);
                            console.log(googleUser);
                            const username = googleUser.email;
                            const email = googleUser.email;
                            const password = " ";
                            console.log("decoded google response username:", username);
                            console.log("decoded google response pass:", password);
                            
                            if(!userExists(username))
                            registerUser(username, email, password);
                            console.log("Back to function");
                            loginUser(username, password);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        />
                </div>
            </div>
            
         </div>
        
        </GoogleOAuthProvider>
    );
};

export default LoginSignup;

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXdhIiwiaWF0IjoxNzE3NDYyNDg4LCJleHAiOjE3MTc1NDg4ODh9.Z2r3zIKn5aP2l7WfITfVCiIgqf6A8Vc7AGpEwQ0v1bc