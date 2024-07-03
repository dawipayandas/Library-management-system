import React,{useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar'
import HomeFooter from './HomeFooter'
import './Contact.css'
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Contact = () => {
  const[loading, setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[])

  return (
    <div>
      {loading?<div className="contact-loader"><ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div>:
    <div>
      <HomeNavbar/>
      <div className='contact-parent'>
        <h2>Contact Us</h2>
        <p>We value your feedback and are here to assist you with any questions or concerns you may have. Please feel free to reach out to us through any of the following channels:</p>

        <h3>Customer Support</h3>
        <ul>
            <li><strong>Email</strong>: <Link to="gluglibrarymanagement@gmail.com">gluglibrarymanagement@gmail.com</Link></li>
            <li><strong>Phone</strong>: 0000000000</li>
            <li><strong>Live Chat</strong>: Available on our website from 9 AM to 5 PM (Monday to Friday)</li>
        </ul>

        <h3>Library Address</h3>
        <p>
            Visit us at:<br/>
            123 Library Avenue<br/>
            Booktown, BK 12345<br/>
            United States
        </p>

        <h3>Social Media</h3>
        <p>Stay connected with us on social media for the latest updates, news, and events:</p>
        <ul>
            <li><strong>Facebook</strong>: <Link to="https://www.facebook.com/gluglibrarymanagement" target="_blank">facebook.com/gluglibrary</Link></li>
            <li><strong>Twitter</strong>: <Link to="https://www.twitter.com/gluglibrarymanagement" target="_blank">twitter.com/gluglibrary</Link></li>
            <li><strong>Instagram</strong>: <Link to="https://www.instagram.com/gluglibrarymanagement" target="_blank">instagram.com/gluglibrary</Link></li>
        </ul>

        <h3>Feedback and Suggestions</h3>
        <p>We are always looking to improve our services and welcome your suggestions.</p>

        <p>Thank you for being a part of our library community. We look forward to hearing from you!</p>
      </div>
      <HomeFooter/>
    </div>
}
</div>
  )
}

export default Contact
