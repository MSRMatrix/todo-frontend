import { useContext, useEffect, useState } from "react";
import { List, Message, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleTwoFactorAuthentication } from "../functions/toogleTwoFactorAuthentication";
import { updateProfile } from "../functions/updateProfile";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);
  const [authentication, setAuthentication] = useState(null);
  const [update, setUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        <button
          onClick={() => {
            setUpdate((prevMode) => !prevMode), setShowPassword(false);
          }}
        >
          {update ? "Close Update" : "Open Update"}
        </button>
        {update ? (
          <form
            action=""
            onSubmit={(e) => updateProfile(e, setUser, setMessage, setUpdate, setShowPassword)}
          >
            <legend>Username:</legend>
            <input name="username" type="text" defaultValue={user.username} />
            <legend>Email: </legend>
            <input name="email" type="email" defaultValue={user.email} />
            <legend>Password: </legend>
            <input name="password" type={showPassword ? "text" : "password"} />
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

        <button onClick={() => toggleTwoFactorAuthentication(setMessage, setAuthentication)}>
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
