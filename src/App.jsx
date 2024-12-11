import { useState } from "react";
import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { List, Task, User } from "./components/context/ContextData";
import Dashboard from "./components/dashboard/Dashboard";
import Registration from "./components/registration/Registration";
import Guest from "./components/guest/Guest";
import Login from "./components/login/Login";
import Startpage from "./components/startpage/Startpage";

function App() {
  const [user, setUser] = useState([]);
  const [list, setList] = useState([]);
  const [task, setTask] = useState([]);

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
          element: <Registration />,
          path: "/registration",
        },
        {
          element: <Guest />,
          path: "/guest",
        },
      ],
    },
    {
      element: <Dashboard />,
      path: "*"
    },
  ]);

  return (
    <div>
      <User.Provider value={{ user, setUser }}>
        <List.Provider value={{ list, setList }}>
          <Task.Provider value={{ task, setTask }}>
            <RouterProvider router={router} />
          </Task.Provider>
        </List.Provider>
      </User.Provider>
    </div>
  );
}

export default App;
