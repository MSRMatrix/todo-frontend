import { NavLink, useNavigate } from "react-router-dom";
import { verifyProfile } from "../functions/verifyProfile";
import { useContext, useState } from "react";
import { Field, Message } from "../context/ContextData";
import { inputFunction } from "../functions/inputFunction";
import { disableFunction } from "../functions/disableFunction";
import { emailOrUsername } from "../functions/emailOrUsername";

const Verify = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useContext(Message);
  const [toggleName, setToggleName] = useState("email");
  const { field, setField } = useContext(Field);
  const [see, setSee] = useState(false);
  const formName = "Verify";

  return (
    <>
      <form action="" onSubmit={(e) => verifyProfile(e, navigate, setMessage)}>
        <fieldset>
          <legend>Verify Account</legend>
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
                      : undefined || key === toggleName
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
            style={{
              backgroundColor: disableFunction(field, formName) ? "#B56565" : "",
              cursor: disableFunction(field, formName)
                ? " not-allowed"
                : "pointer",
            }}
            type="submit"
          >
            Verify
          </button>
        </fieldset>
      </form>
      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Verify;
