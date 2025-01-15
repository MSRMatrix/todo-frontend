import { useNavigate } from "react-router-dom";
import "./startpage.css";
import { useContext, useEffect } from "react";
import { Field, List, Task, User } from "../context/ContextData";

function Startpage() {
  const navigate = useNavigate();
  const { field, setField } = useContext(Field);

  useEffect(() => {
    setField({
      username: { value: "", message: "" },
      email: { value: "", message: "" },
      password: { value: "", message: "" },
      code: { value: "", message: "" },
    });
  }, []);

  return (
    <div className="startpage">
      <ul>
        <li onClick={() => navigate("/login")}>Login</li>
        <li onClick={() => navigate("/verify")}>Verify your Profile</li>
        <li onClick={() => navigate("/registration")}>Registration</li>
        <li onClick={() => navigate("/guest")}>Guest</li>
      </ul>
    </div>
  );
}

export default Startpage;
