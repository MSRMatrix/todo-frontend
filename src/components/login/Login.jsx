import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../context/ContextData";
import { login } from "../functions/login";

const Login = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const [toggle, setToggle] = useState(false);
  const {user, setUser} = useContext(User)

  return (
    <>
      <form action="" onSubmit={(e) => login(e, navigate, setUser)}>
        <fieldset>
          <legend>Registration</legend>
          <p onClick={() => setToggle((prevMode) => !prevMode)}>
            Login with {toggle ? "Email" : "Username"}
          </p>
          <legend>{toggle ? "Username" : "Email"}:</legend>
          <input
            type={toggle ? "text" : "email"}
            name={toggle ? "username" : "email"}
            required
          />

          <legend>Password:</legend>
          <input
            type={see ? "text" : "password"}
            name="password"
            minLength={8}
            required
          />
          {!see ? (
            <i
              className="fa-solid fa-eye"
              onClick={() => setSee((prevMode) => !prevMode)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => setSee((prevMode) => !prevMode)}
            ></i>
          )}

          <button type="submit">Register</button>
        </fieldset>
      </form>

      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Login;