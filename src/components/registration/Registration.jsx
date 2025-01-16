import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registrationFunction } from "../functions/registrationFunction";
import { Field, Message } from "../context/ContextData";
import { inputFunction } from "../functions/inputFunction";
import { disableFunction } from "../functions/disableFunction";

const Registration = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const { field, setField } = useContext(Field);
  const { message, setMessage } = useContext(Message);
  const formName = "Registration";

  return (
    <>
      <form onSubmit={(e) => registrationFunction(e, navigate, setMessage)}>
        <fieldset>
          <legend>Registration</legend>

          {["username", "email", "password"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <div className={key === "password" ? "eye-div" : ""}>
                <input
                  className={field[key].message.length > 1 ? "invalid" : ""}
                  type={key === "password" && !see ? "password" : "text"}
                  name={key}
                  value={field[key].value}
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
          className={disableFunction(field, formName) ? "disable-button" : "enable-button"}
            disabled={disableFunction(field, formName)}
            type="submit"
          >
            Register
          </button>
        </fieldset>
      </form>
      <NavLink to="/"><i className="fa-solid fa-arrow-left-long"></i>Back</NavLink>
    </>
  );
};

export default Registration;
