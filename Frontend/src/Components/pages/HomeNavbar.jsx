import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './HomeNavbar.css'

const HomeNavbar = () => {
  return (
        
      <nav className='home-navbar'>
      <Link to="/home" className="home-logo">LIBRARY</Link>
      <ul className='nav-ul'>
        
        
          <NavLink to="/home" className="nav-navlink">Home</NavLink>
        
        
          <NavLink to="/about" className="nav-navlink">About</NavLink>
        
        
          <NavLink to="/contact" className="nav-navlink">Contact</NavLink>
        
        
          <NavLink to="/profile" className="nav-navlink">Profile</NavLink>
        
      </ul>
    </nav>
  )
}

export default HomeNavbar
