import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Field, Message, User } from "../context/ContextData";
import { login } from "../functions/login";
import { disableFunction } from "../functions/disableFunction";
import { inputFunction } from "../functions/inputFunction";

const Login = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const { user, setUser } = useContext(User);
  const { message, setMessage } = useContext(Message);
  const { field, setField } = useContext(Field);
  const formName = "Login"; 
  const [toggleName, setToggleName] = useState("email")


  function emailOrUsername(e){
    e.preventDefault()
    if(toggleName === "username"){
      field.username.value = ""
     return setToggleName("email")
    }else{
      field.email.value = ""
     return setToggleName("username")
    }
  }
  
  return (
    <>
      <form action="" onSubmit={(e) => login(e, navigate, setUser, setMessage)}>
        <fieldset>
          <legend>Login</legend>
          <button onClick={(e) => emailOrUsername(e)}>Login with {toggleName === "username" ? "Username" : "Email"}</button>
          {[toggleName, "password"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <input
                type={key === "password" && !see ? "password" : "text"}
                name={key}
                value={field[key].value}
                onChange={(e) => inputFunction(e, setField)}
                style={{
                  boxShadow: field[key].message.length > 1 ? "0px 0px 4px 4px red" : "",
                }}
                minLength={key === "password" || key === "username" ? 8 : undefined}
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
            Login
          </button>
        </fieldset>
      </form>

      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Login;
