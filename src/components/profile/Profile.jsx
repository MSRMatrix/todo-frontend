import { useContext, useEffect, useState } from "react";
import { List, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";
import { NavLink, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BACKENDURL;
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const [authentication, setAuthentication] = useState(null);
  const [update, setUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const toggleTwoFactorAuthentication = async () => {
    const password = prompt("Please type in your password: ");
    if (!password) return alert("Password is required to toggle 2FA!");

    try {
      const response = await fetch(
        `${URL}/user/toggle-two-factor-authentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return alert(data.message);
      } else {
        setAuthentication(data.twoFactorAuthentication);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };

  const updateProfile = async (e, setUser) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`${URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: formDataObject.password.trim(),
          username: formDataObject.username.trim(),
          email: formDataObject.email.trim(),
          confirmPassword: formDataObject.confirmPassword.trim(),
        }),
      });
      const data = await response.json();
      
      
      if (!response.ok) {
        return console.log(data);
      } else {
        setUser(data.user);
        alert(data.message);
        e.target.reset()
        setUpdate(false)
        setShowPassword(false)
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(setUser, setList, setTask);
      if (data && data.authentication !== undefined) {
        setAuthentication(data.authentication);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <button onClick={() => {setUpdate((prevMode) => !prevMode), setShowPassword(false)}}>
          {update ? "Close Update" : "Open Update"}
        </button>
        {update ? (
          <form action="" onSubmit={(e) => updateProfile(e, setUser)}>
            <legend>Username:</legend>
            <input name="username" type="text" defaultValue={user.username} />
            <legend>Email: </legend>
            <input name="email" type="email" defaultValue={user.email} />
            <legend>Password: </legend>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
            />
             {!showPassword ? (
            <i
              className="fa-solid fa-eye"
              onClick={() => setShowPassword((prevMode) => !prevMode)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash"
              onClick={() => setShowPassword((prevMode) => !prevMode)}
            ></i>
          )}
            <legend>Type in your password to confirm your changes: </legend>
            <input type="password" name="confirmPassword" required />
            <button type="submit">Submit your changes</button>
          </form>
        ) : (
          <div>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password: ********</p>
          </div>
        )}

        <button onClick={toggleTwoFactorAuthentication}>
          {authentication
            ? "Deactivate Two Factor Authentication"
            : "Activate Two Factor Authentication"}
        </button>
      </div>
      <NavLink to="/workspace">Back</NavLink>
    </>
  );
};

export default Profile;
