import { useNavigate } from "react-router-dom";
import { logout } from "../functions/logout";

const Options = () => {
    const URL = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    
  return (
    <div className="Navlink-div">
    <li onClick={() => navigate("/profile")}>Profile options</li>
    <li onClick={() => navigate("/reset")}>Reset your List</li>
    <li onClick={() => logout(navigate, URL)}>Logout</li>
    <li style={{color: "gray"}}>Chat with others</li>
    </div>
  );
}

export default Options;