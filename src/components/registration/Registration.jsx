import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKENDURL;
  const [see, setSee] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    const response = await fetch(`${URL}/user`, {
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

    if (!response.ok) {
      console.error("Error fetching category data:", response.statusText);
    } else {
      alert("Registration successfully!");
      navigate("/login");
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Registration</legend>

          <legend>Username:</legend>
          <input type="text" name="username" minLength={8} required />

          <legend>Email:</legend>
          <input type="email" name="email" required />

          <legend>Password:</legend>
          <input
            type={see ? "text" : "password"}
            name="password"
            minLength={8}
            required
          />
            {!see ? (
              <i className="fa-solid fa-eye" onClick={() => setSee((prevMode) => !prevMode)}></i>
            ) : (
              <i className="fa-solid fa-eye-slash" onClick={() => setSee((prevMode) => !prevMode)}></i>
            )}

          <button type="submit">Register</button>
        </fieldset>
      </form>

      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Registration;
