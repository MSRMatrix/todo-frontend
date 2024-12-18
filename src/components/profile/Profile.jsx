import { useContext, useEffect, useState } from "react";
import { List, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";

const Profile = () => {
  const URL = import.meta.env.VITE_BACKENDURL;
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const [authentication, setAuthentication] = useState(null);

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
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Password: ********</p>
        <button onClick={toggleTwoFactorAuthentication}>
          {authentication ? "Deactivate Two Factor Authentication" : "Activate Two Factor Authentication"}
        </button>
      </div>
    </>
  );
};

export default Profile;
