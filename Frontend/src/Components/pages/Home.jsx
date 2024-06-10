import React from 'react';
import './Home.css';
import HomeNavbar from './HomeNavbar.jsx';
import BorrowerPage from './BorrowerPage.jsx';
import HomeFooter from './HomeFooter.jsx';
// import AdminPage from './AdminPage.jsx';

const Home = ({ logout }) => {
  return (
    <div className="home-body">
      <HomeNavbar logout={logout}/>
      <BorrowerPage/>
      {/* <AdminPage/> */}
      <HomeFooter/>
    </div>
  );
};

export default Home;













// const logouthandle= async(e)=>{
//   logout();
//   navigate("/");

// }
// const AdminPageNavigate= (e)=>
//   {
//     navigate("/admin");
//   }
// const nit=async(e)=>{
//   try{
//   const response = await axios.get('http://localhost:8086/check', {
//             headers: withAuthHeader()
//         });

//         console.log(response.data);
//       }
//       catch(error){
//         console.log("error fetching response :", error);
//         // throw(error);
//       }
      
// }


// <div className="home-container">Hello i am home</div>
//       <button className="home-logout" onClick={logouthandle}>LOGOUT</button>
//       <button onClick={nit}>true</button>
      
      // <div onClick={AdminPageNavigate}>Admin</div>


