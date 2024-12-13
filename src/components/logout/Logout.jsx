import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../functions/logout";

const URL = import.meta.env.VITE_BACKENDURL;

const Logout = () => {
    const navigate = useNavigate();

    return(
        <>
        <button onClick={() => logout(navigate, URL)}>Logout</button>
        </>
    )
}

export default Logout;