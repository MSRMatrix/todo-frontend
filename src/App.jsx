import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Field,
  List,
  Message,
  Task,
  User,
} from "./components/context/ContextData";
import Dashboard from "./components/dashboard/Dashboard";
import Registration from "./components/registration/Registration";
import Guest from "./components/guest/Guest";
import Login from "./components/login/Login";
import Startpage from "./components/startpage/Startpage";
import Workspace from "./components/workspace/Workspace";
import Verify from "./components/verify/Verify";
import Profile from "./components/profile/Profile";
import TwoFactorAuthentication from "./components/twoFactorAuthentication/TwoFactorAuthentication";

function App() {
  const [user, setUser] = useState([]);
  const [list, setList] = useState([]);
  const [task, setTask] = useState([]);
  const [field, setField] = useState({
    username: { value: "", message: "" },
    email: { value: "", message: "" },
    password: { value: "", message: "" },
  });
  const [message, setMessage] = useState({
    topic: "",
    show: false,
  });

  const router = createBrowserRouter([
    {
      element: <Dashboard />,
      path: "/",
      children: [
        {
          element: <Startpage />,
          path: "/",
        },
        {
          element: <Login />,
          path: "/login",
        },
        {
          element: <Verify />,
          path: "/verify",
        },
        {
          element: <TwoFactorAuthentication />,
          path: "/two-factor-authentication",
        },
        {
          element: <Registration />,
          path: "/registration",
        },
        {
          element: <Guest />,
          path: "/guest",
        },
        {
          element: <Workspace />,
          path: "/workspace",
        },
        {
          element: <Profile />,
          path: "/profile",
        },
      ],
    },
    {
      element: <Dashboard />,
      path: "*",
    },
  ]);

  return (
    <div>
      <User.Provider value={{ user, setUser }}>
        <List.Provider value={{ list, setList }}>
          <Task.Provider value={{ task, setTask }}>
            <Field.Provider value={{ field, setField }}>
              <Message.Provider value={{ message, setMessage }}>
                <RouterProvider router={router} />
              </Message.Provider>
            </Field.Provider>
          </Task.Provider>
        </List.Provider>
      </User.Provider>
    </div>
  );
}

export default App;
