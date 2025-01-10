import { useNavigate } from "react-router-dom";
import { Field, Message } from "../context/ContextData";
import { useContext, useState } from "react";
import { disableFunction } from "../functions/disableFunction";
import { inputFunction } from "../functions/inputFunction";
import { twoFactorAuthentication } from "../functions/twoFactorAuthentication";

const TwoFactorAuthentication = () => {
  const { message, setMessage } = useContext(Message);
  const navigate = useNavigate();
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
      <form action="" onSubmit={(e) => twoFactorAuthentication(e, setMessage, navigate)}>
        <fieldset>
          <legend>Two-factor Authentication</legend>
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
                style={{
                  boxShadow:
                    field[key].message.length > 1 ? "0px 0px 4px 4px red" : "",
                }}
                minLength={
                  key === "code"
                    ? 6
                    : undefined || key === "username"
                    ? 8
                    : undefined
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
    </>
  );
};

export default TwoFactorAuthentication;
