import { useContext } from "react";
import { List, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";

const URL = import.meta.env.VITE_BACKENDURL;

const CreateTask = ({listId}) => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);

 async function handleSubmit(e, listId) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try{
      const response = await fetch(`${URL}/task`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          task: formDataObject.task,
          listId: listId,
        }),
        
      })
      const data = await response.json()
      if(!response.ok){
        e.target.reset()
        return alert(data.message)
      }
      else{
         getData(setUser, setList, setTask)
         e.target.reset()
        return alert("Task created!")
      }
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <>
      <form action="" onSubmit={(e) => handleSubmit(e, listId)}>
        <fieldset>
          <legend>New Task</legend>
          <input
            type="text"
            required
            name="task"
          />
          <button type="submit">Create task</button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateTask;
