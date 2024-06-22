import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './HomeNavbar.css'
import { useContext } from 'react'
import { counterContext } from '../../Context/context'
import Cookies from 'universal-cookie'
import logo from '../Assets/logo.png'

const HomeNavbar = () => {
  const value=useContext(counterContext)
  const cookie= new Cookies();

  const logout=()=>{
    value.setisAuthenticated(false);
    cookie.remove('token');
  }
  return (
        
      <nav className='home-navbar'>
      <Link to="/home" ><img src={logo} alt="LIBRARY" className="home-logo"/></Link>
      <ul className='nav-ul'>
        
        
          <NavLink to="/home" className="nav-navlink">Home</NavLink>
        
        
          <NavLink to="/about" className="nav-navlink">About</NavLink>
        
        
          <NavLink to="/contact" className="nav-navlink">Contact</NavLink>
        
        
          <NavLink to="/profile" className="nav-navlink">Profile</NavLink>

          <button onClick={logout}>Logout </button>
        
      </ul>
    </nav>
  )
}

export default HomeNavbar
