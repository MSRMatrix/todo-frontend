import { useNavigate } from "react-router-dom";
import { logout } from "../functions/logout";
import { resetData } from "../functions/resetData";
import { useContext } from "react";
import { List, Message, Task, User } from "../context/ContextData";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);

  return (
    <div className="nav-link">
    <ul>
      <li onClick={() => navigate("/profile")}>Profile</li>
      <li onClick={() => resetData(setUser, setList, setTask, setMessage)}>
        Reset your List
      </li>
      <li onClick={() => logout(navigate, setMessage)}>Logout</li>
      <li style={{ color: "gray" }}>Chat with others</li>
    </ul>
    </div>
  );
};

export default Navbar;
