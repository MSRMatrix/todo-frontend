import { useNavigate } from "react-router-dom";
import "./startpage.css"
import { useContext, useEffect } from "react";
import { List, Task, User } from "../context/ContextData";

function Startpage(){
    const navigate = useNavigate()

    const { user, setUser } = useContext(User);
    const { list, setList } = useContext(List);
    const { task, setTask } = useContext(Task);


    const getData = async (setUser, setList, setTask) => {
            const URL = import.meta.env.VITE_BACKENDURL;
            try {
              const response = await fetch(`${URL}/user`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              });
              const data = await response.json();
        
              if (!response.ok) {
                console.log(`No cookie available!`);
                
                return navigate("/")
              } else {
                setUser(data.user)
                setList(data.list)
                setTask(data.task)
                return navigate("/workspace")
              }
            } catch (error) {
              console.log(error);
            }
          };
        

    useEffect(() => {
        getData(setUser, setList, setTask)
    }, [])

    return(
        <div className="startpage">
        <ul>
            <li onClick={() => navigate("/login")}>Login</li>
            <li onClick={() => navigate("/registration")}>Registration</li>
            <li onClick={() => navigate("/guest")}>Guest</li>
        </ul>
        
        </div>
    )
}

export default Startpage;