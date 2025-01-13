import "./dashboard.css";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PopUp from "../popUp/PopUp";
import { useContext } from "react";
import { Message } from "../context/ContextData";

const Dashboard = () => {
  const { message, setMessage } = useContext(Message);

  if (message.show) {
      setTimeout(() => {
        setMessage({ topic: "", show: false });
      }, 5000);
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {message.show ? <PopUp /> : <></>}
    </>
  );
};

export default Dashboard;


// import "./dashboard.css";
// import { Outlet } from "react-router-dom";
// import Footer from "../footer/Footer";
// import Header from "../header/Header";
// import PopUp from "../popUp/PopUp";
// import { useContext, useEffect, useState } from "react";
// import { Message } from "../context/ContextData";
// import CookieBanner from "../cookieBanner/CookieBanner";

// const Dashboard = () => {
//   const { message, setMessage } = useContext(Message);
//   const [banner, setBanner] = useState(true);
//   const [cookieAllowed, setCookieAllowed] = useState(false);

//   if (message.show) {
//     if (localStorage.getItem("Cookie-Allowed") === "true") {
//       setTimeout(() => {
//         setMessage({ topic: "", show: false });
//       }, 5000);
//     }
//   }

//   useEffect(() => {
//     if (localStorage.getItem("banner")) {
//       setBanner(false);
//     }
//     if (localStorage.getItem("Cookie-Allowed") === "false") {
//       setBanner(false);
//       setCookieAllowed(false);
//     }
//   }, []);

//   return (
//     <>
//       <Header />
//       <Outlet />
//       {localStorage.getItem("Cookie-Allowed") === "false" && !banner ? (
//         <button
//           style={{ position: "fixed", bottom: "0" }}
//           onClick={() => setBanner(true)}
//         >
//           Cookie Banner
//         </button>
//       ) : (
//         <></>
//       )}
//       <Footer />
//       {message.show ? <PopUp /> : <></>}
//       {banner ? <CookieBanner setBanner={setBanner} /> : <></>}
//       {localStorage.getItem("Cookie-Allowed") === "false" && !banner ? (
//         <PopUp />
//       ) : (
//         <></>
//       )}
//     </>
//   );
// };

// export default Dashboard;
