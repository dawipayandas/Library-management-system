import React, {useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar'
import HomeFooter from './HomeFooter'
import { ThreeDots } from 'react-loader-spinner';
import AboutCSS from './About.module.css'

const About = () => {
  const[loading, setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[])

  return (
    <div>
      {loading?<div className={AboutCSS.loader}><ThreeDots
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
        <div className={AboutCSS.parent}><h1>About Our Library Management System</h1>

<p>Welcome to our Library Management System, your one-stop solution for efficiently managing library resources and enhancing user engagement. Our platform is designed to streamline the process of borrowing, returning, and managing books, while also fostering a vibrant community of readers through interactive features.
</p><h2>Key Features</h2><p> <ul>

    <li><b>Efficient Book Management</b>: Easily catalog, search, and manage books within your library. Our intuitive interface ensures that both librarians and users can quickly find the resources they need.
    </li>
    <li>
    <b>User Reviews and Ratings</b>: Users can share their thoughts on books by writing reviews and rating their reads. This feature helps other users discover popular and highly recommended books.
    </li>
    <li>
    <b>Upvote Issues</b>: We believe in the power of community feedback. Users can report issues with books (such as damaged copies or missing pages) and upvote existing reports to highlight the most critical problems. This ensures that our library staff can prioritize and address the most pressing issues swiftly.
    </li>
    <li>
    <b>Personalized Recommendations</b>: Based on your reading history and preferences, our system offers personalized book recommendations, helping you discover new favorites.
    </li>
    <li>
    <b>Community Engagement</b>: Connect with other book lovers, join discussions, and participate in library events. Our platform aims to create a thriving community where users can share their passion for reading.
    </li>
    <li>
    <b>Real-time Notifications</b>: Stay updated with notifications for due dates, new arrivals, and other important library announcements.
    </li>
    </ul>

<h2>Our Mission</h2>

Our mission is to create a seamless and engaging library experience for both librarians and users. We strive to leverage technology to promote reading, support community involvement, and ensure that library resources are utilized effectively.</p><p>

Thank you for choosing our Library Management System. We look forward to serving your literary needs and fostering a love for reading within our community.</p>
</div>
      <HomeFooter/>
    </div>
}
</div>
  )
}

export default About
