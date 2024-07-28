import React from 'react'
import './AdminNavbar.css'
import { Link, NavLink } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav className='home-navbar'>
      <Link to="/home" className='nav-text'><h1>Admin Panel</h1></Link>
      <ul className='nav-ul'>
          <NavLink to="/admin/updatebooks" className="nav-navlink">Update Books</NavLink>
          <NavLink to="/admin/addbook" className="nav-navlink">Add Book</NavLink>
          {/* <NavLink to="/admin/users" className="nav-navlink">User Details</NavLink> */}
          <NavLink to="/admin/profile" className="nav-navlink">Admin Profile</NavLink>
          {/* <button onClick={logout}>Logout </button> */}
        
      </ul>
    </nav>
  )
}

export default AdminNavbar
