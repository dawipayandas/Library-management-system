
import './App.css';
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup.jsx'
import Home from './Components/pages/Home.jsx';
import AdminPage from './Components/pages/AdminPage.jsx'
import BorrowerPage from './Components/pages/BorrowerPage.jsx'
import BookPage from './Components/pages/BookPage.jsx'
import { withAuthHeader } from './Components/utils/auth.js';
import About from './Components/pages/About.jsx';
import Contact from './Components/pages/Contact.jsx';
import Profile from './Components/pages/Profile.jsx';
import Issue from './Components/pages/Issue.jsx';
import { counterContext } from './Context/context.jsx';

function App() {
  const [isAuthenticated, setisAuthenticated]= useState(false);
  useEffect(() => {
    axios.get('http://localhost:8086/check', {
      headers: withAuthHeader()
      })
        .then(response => {
          console.log("Authenticated got response");
          setisAuthenticated(true);
        })
        .catch(error => {
            console.error('Error signin:', error);
            setisAuthenticated(false);
        });
}, []);



  return (
    <counterContext.Provider value={{isAuthenticated, setisAuthenticated}}>
      <Router>
              <Routes>
                  <Route path="/" element={{...isAuthenticated? <Navigate to="/home"/>: <LoginSignup/>}} />
                  <Route path="/home"  element={{...isAuthenticated?<Home/>:<Navigate to="/"/>}}/>
                  <Route path="/admin" element={{...isAuthenticated?<AdminPage/>:<Navigate to="/"/>}}/>
                  <Route path="/book/:id" element={{...isAuthenticated?<BookPage/>:<Navigate to="/"/>}}/>
                  <Route path="/borrow" element={{...isAuthenticated?<BorrowerPage/>:<Navigate to="/"/>}}/>
                  <Route path="/about" element={{...isAuthenticated?<About/>:<Navigate to="/"/>}}/>
                  <Route path="/contact" element={{...isAuthenticated?<Contact/>:<Navigate to="/"/>}}/>
                  <Route path="/profile" element={{...isAuthenticated?<Profile/>:<Navigate to="/"/>}}/>
                  <Route path="/issue/:id" element={{...isAuthenticated?<Issue/>:<Navigate to="/"/>}}/>
              </Routes>
      </Router>
    </counterContext.Provider>
  );
}

export default App;




