import { useNavigate } from "react-router-dom";
import { logout } from "../functions/logout";
import { resetData } from "../functions/resetData";
import { useContext } from "react";
import { List, Task, User } from "../context/ContextData";
import "./options.css"

const Options = () => {
    const URL = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();

    const { user, setUser } = useContext(User);
    const { list, setList } = useContext(List);
    const { task, setTask } = useContext(Task);
    
  return (
    <div className="nav-link">
    <li onClick={() => navigate("/profile")}>Profile options</li>
    <li onClick={() => resetData(setUser, setList, setTask)}>Reset your List</li>
    <li onClick={() => logout(navigate, URL)}>Logout</li>
    <li style={{color: "gray"}}>Chat with others</li>
    </div>
  );
}

export default Options;