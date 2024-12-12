import { useContext, useState } from "react";
import { Task } from "../context/ContextData";

const CreateTodo = () => {
  const { task, setTask } = useContext(Task);
  const [newTask, setNewTask] = useState("");

  function createTodo(e) {
    e.preventDefault();
  
    if (newTask.trim().length <= 0) {
      return alert("Input should not be empty!");
    }
  
    setTask((prevTask) => [
      ...prevTask,
      {
        todo: newTask,
        done: false,
      },
    ]);
  
    setNewTask("");
    e.target.reset()
  }
  
  return (
    <>
      <form action="" onSubmit={createTodo}>
        <fieldset>
          <legend>New Task</legend>
          <input
            type="text"
            required
            minLength={1}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Create task</button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateTodo;
