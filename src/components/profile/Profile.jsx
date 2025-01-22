import { useContext, useEffect, useState } from "react";
import { List, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";
import { NavLink } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const [authentication, setAuthentication] = useState(null);

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
          <div className="profile">
            <div className="profile-data">
            <h3>Username:</h3>
            <p>{user.username}</p>
            <h3>Email:</h3>
            <p>{user.email}</p>
            <h3>Password:</h3>
            <p>********</p>
            <NavLink to="/options">
          <i className="fa-solid fa-gear"></i>Profile Options
        </NavLink>
            </div>
            
      <NavLink to="/workspace">
        <i className="fa-solid fa-arrow-left-long"></i>Back
      </NavLink>
          </div>
        
    </>
  );
};

export default Profile;
