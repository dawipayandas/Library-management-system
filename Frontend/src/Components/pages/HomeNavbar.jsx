"use client"
import { Link, NavLink } from "react-router-dom"
import "./HomeNavbar.css"
import { useContext } from "react"
import { counterContext } from "../../Context/context"
import Cookies from "universal-cookie"
import logo from "../Assets/logo.png"

const HomeNavbar = () => {
  const value = useContext(counterContext)
  const cookie = new Cookies()

  const logout = () => {
    value.setisAuthenticated(false)
    cookie.remove("token")
  }

  return (
    <nav className="home-navbar">
      <div className="navbar-container">
        <Link to="/home" className="logo-link">
          <img src={logo || "/placeholder.svg"} alt="LIBRARY" className="home-logo" />
          <span className="logo-text">LibraryMS</span>
        </Link>

        <ul className="nav-ul">
          <li className="nav-item">
            <NavLink to="/home" className="nav-navlink">
              <span className="nav-icon">🏠</span>
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/about" className="nav-navlink">
              <span className="nav-icon">ℹ️</span>
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-navlink">
              <span className="nav-icon">📞</span>
              Contact
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/profile" className="nav-navlink">
              <span className="nav-icon">👤</span>
              Profile
            </NavLink>
          </li>

          <li className="nav-item">
            <button onClick={logout} className="logout-btn">
              <span className="nav-icon">🚪</span>
              Logout
            </button>
          </li>
        </ul>

        
        <div className="mobile-menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
