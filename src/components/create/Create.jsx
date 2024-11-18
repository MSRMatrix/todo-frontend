import { useContext, useState } from "react";
import { List } from "../context/ContextData";

const Create = () => {
  const { list, setList } = useContext(List);
  const [newTask, setNewTask] = useState("");

  function createTodo(e) {
    e.preventDefault();
  
    if (newTask.trim().length <= 0) {
      return alert("Input should not be empty!");
    }
  
    setList((prevList) => [
      ...prevList,
      {
        todo: newTask,
        done: false,
      },
    ]);
  
    setNewTask("");
    e.target.reset()
  }
  

  console.log(list);
  

  return (
    <>
      <form action="" onSubmit={createTodo}>
        <fieldset>
          <legend>New list</legend>
          <input
            type="text"
            required
            minLength={1}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Create list</button>
        </fieldset>
      </form>
    </>
  );
};

export default Create;
