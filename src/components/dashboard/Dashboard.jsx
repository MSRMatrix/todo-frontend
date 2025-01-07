import "./dashboard.css";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PopUp from "../popUp/PopUp";
import { useContext, useEffect, useState } from "react";
import { Message } from "../context/ContextData";
import CookieBanner from "../cookieBanner/CookieBanner";

const Dashboard = () => {
  const { message, setMessage } = useContext(Message);
  const [banner, setBanner] = useState(true);

  if (message.show) {
    setTimeout(() => {
      setMessage({ topic: "", show: false });
    }, 5000);
  }

  useEffect(() => {
    if (localStorage.getItem("banner")) {
      setBanner(false);
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {message.show ? <PopUp /> : <></>}
      {banner ? <CookieBanner setBanner={setBanner} /> : <></>}
    </>
  );
};

export default Dashboard;
