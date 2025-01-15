import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Field, Message, User } from "../context/ContextData";
import { login } from "../functions/login";
import { disableFunction } from "../functions/disableFunction";
import { inputFunction } from "../functions/inputFunction";
import { emailOrUsername } from "../functions/emailOrUsername";

const Login = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const { user, setUser } = useContext(User);
  const { message, setMessage } = useContext(Message);
  const { field, setField } = useContext(Field);
  const formName = "Login";
  const [toggleName, setToggleName] = useState("email");

  return (
    <>
      <form action="" onSubmit={(e) => login(e, navigate, setUser, setMessage)}>
        <fieldset>
          <legend>Login</legend>
          <button
            onClick={(e) => {
              emailOrUsername(e, field, setField, toggleName, setToggleName);
            }}
          >
            Login with {toggleName === "username" ? "Username" : "Email"}
          </button>
          {[toggleName, "password"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <div className={key === "password" ? "eye-div" : ""}>
                <input
                  className={field[key].message.length > 1 ? "invalid" : ""}
                  type={
                    key === "password"
                      ? see
                        ? "text" 
                        : "password" 
                      : key === "username"
                      ? "text"
                      : "email"
                  }
                  name={key}
                  value={field[key].value}
                  onChange={(e) => inputFunction(e, setField)}
                  minLength={
                    key === "password" || key === "username" ? 8 : undefined
                  }
                  placeholder={key === "password" ? "Password" : key === "username" ? "Username" : "Email"}
                  required
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

          <button
            disabled={disableFunction(field, formName)}
            style={{
              backgroundColor: disableFunction(field, formName) ? "#B56565" : "#00ff7f",
              cursor: disableFunction(field, formName)
                ? " not-allowed"
                : "pointer",
            }}
            type="submit"
          >
            Login
          </button>
        </fieldset>
      </form>

      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Login;
