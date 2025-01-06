import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

import "./dashboard.css";
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
