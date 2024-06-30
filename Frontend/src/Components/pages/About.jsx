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
        <div className={AboutCSS.parent}>About </div>
      <HomeFooter/>
    </div>
}
</div>
  )
}

export default About
