"use client"
import { Link, useLocation } from "react-router-dom"
import "./HomeNavbar.css"
import { useState, useContext, useEffect } from "react"
import { counterContext } from "../../Context/context"
import Cookies from "universal-cookie"

const HomeNavbar = () => {
  const value = useContext(counterContext)
  const cookie = new Cookies()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logout = () => {
    value.setisAuthenticated(false)
    cookie.remove("token")
    console.log("Logout clicked")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/home" className="brand-link" onClick={closeMobileMenu}>
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                <path d="M8 7h8"/>
                <path d="M8 11h8"/>
                <path d="M8 15h5"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">LibraryMS</span>
              <span className="brand-subtitle">Management System</span>
            </div>
          </Link>
        </div>

        <nav className="navbar-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link 
                to="/home" 
                className={`nav-link ${isActive("/home") ? "nav-link-active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${isActive("/contact") ? "nav-link-active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Contact</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/profile" 
                className={`nav-link ${isActive("/profile") ? "nav-link-active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <button onClick={logout} className="logout-button">
            <svg className="logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Logout</span>
          </button>

          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'mobile-toggle-active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </button>
        </div>
      </div>

      <div className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-active' : ''}`}>
        <nav className="mobile-nav">
          <div className="mobile-nav-header">
            <div className="mobile-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  <path d="M8 7h8"/>
                  <path d="M8 11h8"/>
                  <path d="M8 15h5"/>
                </svg>
              </div>
              <span>LibraryMS</span>
            </div>
          </div>
          
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <Link 
                to="/home" 
                className={`mobile-nav-link ${isActive("/home") ? "mobile-nav-link-active" : ""}`}
                onClick={closeMobileMenu}
              >
                <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/about" 
                className={`mobile-nav-link ${isActive("/about") ? "mobile-nav-link-active" : ""}`}
                onClick={closeMobileMenu}
              >
                <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span>About</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/contact" 
                className={`mobile-nav-link ${isActive("/contact") ? "mobile-nav-link-active" : ""}`}
                onClick={closeMobileMenu}
              >
                <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Contact</span>
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link 
                to="/profile" 
                className={`mobile-nav-link ${isActive("/profile") ? "mobile-nav-link-active" : ""}`}
                onClick={closeMobileMenu}
              >
                <svg className="mobile-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>Profile</span>
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <button onClick={() => { logout(); closeMobileMenu(); }} className="mobile-logout-button">
              <svg className="mobile-logout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
      )}
    </header>
  )
}

export default HomeNavbar
