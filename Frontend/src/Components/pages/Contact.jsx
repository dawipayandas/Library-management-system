import React,{useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar'
import HomeFooter from './HomeFooter'
import './Contact.css'
import { ThreeDots } from 'react-loader-spinner';

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

       Contact
      </div>
      <HomeFooter/>
    </div>
}
</div>
  )
}

export default Contact
