import { NavLink, useNavigate } from "react-router-dom";
import { verifyProfile } from "../functions/verifyProfile";
import { useContext, useState } from "react";
import { Field, Message } from "../context/ContextData";
import { inputFunction } from "../functions/inputFunction";
import { disableFunction } from "../functions/disableFunction";

const Verify = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useContext(Message);
  const [toggleName, setToggleName] = useState("email");
  const { field, setField } = useContext(Field);
  const [see, setSee] = useState(false);
  const formName = "Verify";

  function emailOrUsername(e) {
    e.preventDefault();
    if (toggleName === "username") {
      field.username.value = "";
      return setToggleName("email");
    } else {
      field.email.value = "";
      return setToggleName("username");
    }
  }

  return (
    <>
      <form action="" onSubmit={(e) => verifyProfile(e, navigate, setMessage)}>
        <fieldset>
          <legend>Verify Account</legend>
          <button onClick={(e) => emailOrUsername(e)}>
            Login with {toggleName === "username" ? "Username" : "Email"}
          </button>
          {[toggleName, "code"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <input
              className={field[key].message.length > 1 ? "invalid" : ""}
                type={key === "password" && !see ? "password" : key === "username" || key === "code" ? "text" : "email"}
                name={key}
                value={field[key].value}
                onChange={(e) => inputFunction(e, setField)}
                minLength={
                  key === "code" ? 6 : undefined || key === toggleName ? 8 : undefined
                }
                required
              />
              {key === "password" && (
                <i
                  className={`fa-solid ${see ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setSee(!see)}
                ></i>
              )}

              <p>{field[key].message}</p>
            </div>
          ))}

          <button disabled={disableFunction(field, formName)} type="submit">
            Verify
          </button>
        </fieldset>
      </form>
      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Verify;
