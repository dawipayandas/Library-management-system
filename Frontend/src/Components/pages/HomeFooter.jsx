import React from 'react'
// import './Homefooter.css'
import './HomeFooter.css'
import { Link } from 'react-router-dom'
const HomeFooter = () => {
  return (
    <div>
      <footer>
    <div className="footer-container">
    <div className="footer-section contact-info">
      <h4>Contact Us</h4>
      <p>Library Address: NIT DURGAPUR</p>
      <p>Phone: 0000000000</p>
      <p>Email: dawipayandas@gmail.com</p>
    </div>
    <div className="footer-section quick-links">
      <h4>Quick Links</h4>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/account">User Account</Link></li>
        <li><Link to="/issued-books">Issued Books</Link></li>
        <li><Link to="/help">Help/FAQ</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </div>
    <div className="footer-section legal-info">
      <h4>Legal</h4>
      <ul>
        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        <li><Link to="/terms-of-service">Terms of Service</Link></li>
      </ul>
    </div>
    <div className="footer-section library-hours">
      <h4>Library Hours</h4>
      <ul>
        <li>Monday - Friday: 9 AM - 7 PM</li>
        <li>Saturday: 10 AM - 6 PM</li>
        <li>Sunday: Closed</li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2024 Library Management System. All rights reserved.</p>
  </div>
</footer>
</div>
  )
}

export default HomeFooter
