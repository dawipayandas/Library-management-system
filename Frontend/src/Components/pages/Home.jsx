import React , {useEffect, useState} from 'react';
import HomeCSS from './Home.module.css';
import HomeNavbar from './HomeNavbar.jsx';
import BorrowerPage from './BorrowerPage.jsx';
import HomeFooter from './HomeFooter.jsx';
import { ThreeDots } from 'react-loader-spinner';

const Home = () => {

  const[loading, setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },1000)
  },[])

  return (
    <div>
      {loading?<div className={HomeCSS.loader}><ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        /></div>:
      <div className={HomeCSS}>
        <HomeNavbar/>
        <BorrowerPage/>
        <HomeFooter/>
      </div>
      }
    </div>
  );
};

export default Home;












