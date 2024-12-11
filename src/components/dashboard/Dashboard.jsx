import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Startpage from "../startpage/Startpage";

import "./dashboard.css"

const Dashboard = () => {
  return (
    <>
    <Header />
      <Outlet />
      <Footer />
      
    </>
  );
};

export default Dashboard;