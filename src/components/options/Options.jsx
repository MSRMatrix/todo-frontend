import { useContext, useState } from "react";
import { deleteUser } from "../functions/deleteUser";
import { toggleTwoFactorAuthentication } from "../functions/toogleTwoFactorAuthentication";
import { Field, List, Message, Task, User } from "../context/ContextData";
import { NavLink, useNavigate } from "react-router-dom";
import { inputFunction } from "../functions/inputFunction";
import { updateProfile } from "../functions/updateProfile";

const Options = () => {
  const { message, setMessage } = useContext(Message);
  const [authentication, setAuthentication] = useState(null);  
  const [update, setUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { field, setField } = useContext(Field);  
  const [see, setSee] = useState(false);
  const [typeChange, setTypeChange] = useState("password");
  const navigate = useNavigate();  
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  return (
    <>
    <div className="update-form">
              <form
                action=""
                onSubmit={(e) =>
                  updateProfile(e, setUser, setMessage, setUpdate, setShowPassword, navigate)
                }
              >
                {["username", "email", "password"].map((key) => (
                  <div key={key}>
                    <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
                    <div className={key === "password" ? "eye-div" : ""}>
                      <input
                        className={field[key].message.length > 1 ? "invalid" : ""}
                        type={key === "password" && !see ? "password" : "text"}
                        name={key}
                        defaultValue={
                          key === "username"
                            ? user.username
                            : key === "email"
                            ? user.email
                            : ""
                        }
                        onChange={(e) => inputFunction(e, setField)}
                        minLength={
                          key === "password" || key === "username" ? 8 : undefined
                        }
                        placeholder={
                          key === "password"
                            ? "Password"
                            : key === "username"
                            ? "Username"
                            : "Email"
                        }
                      />
                      {key === "password" && (
                        <i
                          className={`fa-solid ${see ? "fa-eye" : "fa-eye-slash"}`}
                          onClick={() => setSee(!see)}
                        ></i>
                      )}
                    </div>
                    <p>{field[key].message}</p>
                  </div>
                ))}
    
                <legend>Type in your password to confirm your changes: </legend>
                <div className={"eye-div"}>
                  <input
                    placeholder="Repeat your old password"
                    type={typeChange}
                    name="confirmPassword"
                    required
                  />
    
                  <i
                    className={`fa-solid ${
                      typeChange === "text" ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() =>
                      setTypeChange((prevMode) =>
                        prevMode === "password" ? "text" : "password"
                      )
                    }
                  ></i>
                </div>
                <button type="submit">Submit your changes</button>
              </form>
              <button
        onClick={() =>
          toggleTwoFactorAuthentication(setMessage, setAuthentication)
        }
      >
        {authentication
          ? ["Deactivate Two Factor Authentication", <i className="fa-solid fa-lock-open"></i>]
          : ["Activate Two Factor Authentication", <i className="fa-solid fa-lock"></i>]}
      </button>

      <button onClick={() => deleteUser(setMessage, navigate)}>
      <i className="fa-solid fa-face-dizzy"></i> Delete Profile
      </button>
      <button onClick={() => navigate("/profile")}><i className="fa-solid fa-user"></i> Back</button>
              </div>
    </>
  );
};

export default Options;
