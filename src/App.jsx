import { useState } from "react";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { List } from "./components/context/ContextData";

function App() {

  const [list, setList] = useState([])
  return (
    <>
      <List.Provider value={{ list, setList }}>
        <Dashboard />
      </List.Provider>
    </>
  );
}

export default App;