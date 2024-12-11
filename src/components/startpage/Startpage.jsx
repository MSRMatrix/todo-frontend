import { useNavigate } from "react-router-dom";
import "./startpage.css"

function Startpage(){

    const navigate = useNavigate()
    return(
        <div className="startpage">
        <ul>
            <li onClick={() => navigate("/login")}>Login</li>
            <li onClick={() => navigate("/registration")}>Registration</li>
            <li onClick={() => navigate("/guest")}>Guest</li>
        </ul>
        
        </div>
    )
}

export default Startpage;