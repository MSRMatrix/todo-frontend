import "./dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PopUp from "../popUp/PopUp";
import { useContext, useEffect } from "react";
import { Field, List, Message, Task, User } from "../context/ContextData";

const Dashboard = () => {
  const { message, setMessage } = useContext(Message);
const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { field, setField } = useContext(Field);
  const navigate = useNavigate()

  if (message.show) {
      setTimeout(() => {
        setMessage({ topic: "", show: false });
      }, 5000);
  }

  const getData = async (setUser, setList, setTask, navigate) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      
      if (!response.ok) {
        console.log(`No cookie available!`);

         navigate("/")
      } else {
        setUser(data.user);
        setList(data.list);
        setTask(data.task);
        return navigate("/workspace")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(setUser, setList, setTask, navigate);
    setField({
      username: { value: "", message: "" },
      email: { value: "", message: "" },
      password: { value: "", message: "" },
      code: { value: "", message: "" },
    });
  }, []);

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
