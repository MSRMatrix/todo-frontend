import { useContext, useEffect, useState } from "react";
import { Field, List, Message, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleTwoFactorAuthentication } from "../functions/toogleTwoFactorAuthentication";
import { updateProfile } from "../functions/updateProfile";
import { inputFunction } from "../functions/inputFunction";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);
  const [authentication, setAuthentication] = useState(null);
  const [update, setUpdate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { field, setField } = useContext(Field);
  const [see, setSee] = useState(false);

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
            onSubmit={(e) =>
              updateProfile(e, setUser, setMessage, setUpdate, setShowPassword)
            }
          >
            {["username", "email", "password"].map((key) => (
              <div key={key}>
                <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
                <div className={key === "password" ? "eye-div" : ""}>
                  <input
                    className={field[key].message.length > 1 ? "invalid" : ""}
                    type={key === "password" && !see ? "password" : "text"}
                    name={key}
                    defaultValue={
                      key === "username"
                        ? user.username
                        : key === "email"
                        ? user.email
                        : ""
                    }
                    onChange={(e) => inputFunction(e, setField)}
                    minLength={
                      key === "password" || key === "username" ? 8 : undefined
                    }
                    placeholder={
                      key === "password"
                        ? "Password"
                        : key === "username"
                        ? "Username"
                        : "Email"
                    }
                  />
                  {key === "password" && (
                    <i
                      className={`fa-solid ${see ? "fa-eye" : "fa-eye-slash"}`}
                      onClick={() => setSee(!see)}
                    ></i>
                  )}
                </div>
                <p>{field[key].message}</p>
              </div>
            ))}
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

        <button
          onClick={() =>
            toggleTwoFactorAuthentication(setMessage, setAuthentication)
          }
        >
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
