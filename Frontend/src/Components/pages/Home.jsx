import React from 'react';
import HomeCSS from './Home.module.css';
import HomeNavbar from './HomeNavbar.jsx';
import BorrowerPage from './BorrowerPage.jsx';
import HomeFooter from './HomeFooter.jsx';

const Home = () => {
  return (
    <div className={HomeCSS}>
      <HomeNavbar/>
      <BorrowerPage/>
      <HomeFooter/>
    </div>
  );
};

export default Home;












