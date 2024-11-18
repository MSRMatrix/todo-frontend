import CheckedList from "../checkedList/CheckedList";
import Create from "../create/Create";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import UnCheckedList from "../uncheckedList/UncheckedList";

import "./dashboard.css"

const Dashboard = () => {
  return (
    <>
      <Header />
      <Create />
      <div className="list-container">
        <CheckedList />
        <UnCheckedList />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
