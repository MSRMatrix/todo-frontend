import "./dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import PopUp from "../popUp/PopUp";
import { useContext, useEffect, useState } from "react";
import { Field, List, Message, Task, User } from "../context/ContextData";

const Dashboard = () => {
  const { message, setMessage } = useContext(Message);
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { field, setField } = useContext(Field);
  const navigate = useNavigate();
  const [server, setServer] = useState({
    name: "Server offline!🔴",
    loading: true,
    className: "show-loading",
  });

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
      setServer({
        name: "Server online!🟢",
        loading: false,
      });
      if (!response.ok) {
        console.log(`No cookie available!`);
        navigate("/");
      } else {
        setUser(data.user);
        setList(data.list);
        setTask(data.task);
        return navigate("/workspace");
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

  if (!server.loading && server.className === "show-loading") {
    setServer({
      className: "hide-loading",
    });
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer server={server} />
      {message.show ? <PopUp /> : <></>}
    </>
  );
};

export default Dashboard;
