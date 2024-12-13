import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../context/ContextData";

const Login = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKENDURL;
  const [see, setSee] = useState(false);
  const [toggle, setToggle] = useState(false);
  const {user, setUser} = useContext(User)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const response = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formDataObject.username,
        email: formDataObject.email,
        password: formDataObject.password,
      }),
    });

    const data = await response.json()

    if (!response.ok) {
      console.error("Error fetching category data:", response.statusText);
    } else {
      setUser(data)
      alert("Registration successfully!");
      navigate("/workspace");
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
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