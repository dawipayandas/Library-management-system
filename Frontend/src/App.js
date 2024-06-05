
import './App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
import Home from './Components/pages/Home.jsx';

function App() {
  const [isAuthenticated, setisAuthenticated]= useState(false);
  const cookie=new Cookies();
  useEffect(() => {
    axios.get('http://localhost:8086/api/auth/check')
        .then(response => {
          console.log("Authenticated got response")
            login();

        })
        .catch(error => {
            console.error('Error signin:', error);
            logout();
        });
}, []);


  const login =()=>setisAuthenticated(true);
  const logout =()=>{setisAuthenticated(false);
    cookie.remove('token');}

  return (
    <Router>
            <Routes>
                <Route path="/" element={{...isAuthenticated? <Navigate to="/home"/>: <LoginSignup login={login} logout={logout}/>}} />
                <Route path="/home"  element={<Home logout={logout}/>}/>
            </Routes>
    </Router>
  );
}

export default App;





//   useEffect(() => {
//     const checkAuthentication = async () => {
//         try {
//             const response = await axios.get('http://localhost:8086/api/check');
//             if (response.data.authenticated) {
//                 login();
//             } else {
//                 logout();
//             }
//         } catch (error) {
//             logout();
//         }
//     };

//     checkAuthentication();
// }, []);
//element={{...isAuthenticated?<Home logout={logout}/>:<Navigate to="/"/>}}
//, useEffect