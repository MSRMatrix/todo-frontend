import { NavLink, useNavigate } from "react-router-dom";
import { Field, Message } from "../context/ContextData";
import { useContext, useState } from "react";
import { disableFunction } from "../functions/disableFunction";
import { inputFunction } from "../functions/inputFunction";
import { twoFactorAuthentication } from "../functions/twoFactorAuthentication";
import { emailOrUsername } from "../functions/emailOrUsername";

const TwoFactorAuthentication = () => {
  const { message, setMessage } = useContext(Message);
  const navigate = useNavigate();
  const [toggleName, setToggleName] = useState("email");
  const { field, setField } = useContext(Field);
  const [see, setSee] = useState(false);
  const formName = "Verify";

  return (
    <div className="form-div">
      <form
        action=""
        onSubmit={(e) => twoFactorAuthentication(e, setMessage, navigate)}
      >
        <fieldset>
          <legend>Two-factor Authentication</legend>
          <button
            onClick={(e) => {
              emailOrUsername(e, field, setField, toggleName, setToggleName);
            }}
          >
            Login with {toggleName === "username" ? "Username" : "Email"}
          </button>
          {[toggleName, "code"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <div className={key === "password" ? "eye-div" : ""}>
                <input
                  className={field[key].message.length > 1 ? "invalid" : ""}
                  type={
                    key === "code"
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
                    key === "code"
                      ? 6
                      : undefined || key === "username"
                      ? 8
                      : undefined
                  }
                  placeholder={key === "code" ? "Code" : key === "username" ? "Username" : "Email"}
                  required
                />
                {key === "code" && (
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
            className={disableFunction(field, formName) ? "disable-button" : "enable-button"}
            type="submit"
          >
            Verify
          </button>
        </fieldset>
      </form>
      <NavLink to="/"><i className="fa-solid fa-arrow-left-long"></i> Back</NavLink>
    </div>
  );
};

export default TwoFactorAuthentication;
