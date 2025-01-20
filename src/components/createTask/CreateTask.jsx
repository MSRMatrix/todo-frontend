import { useContext } from "react";
import { List, Message, Task, User } from "../context/ContextData";
import { getData } from "../functions/getData";
import { createTask } from "../functions/createTask";

const CreateTask = ({listId}) => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);

  return (
    <>
      <form action="" onSubmit={(e) => createTask(e, listId, setMessage, getData, setUser, setList, setTask)}>
        <fieldset>
          <legend>New Task</legend>
          <input
            type="text"
            required
            name="task"
            placeholder="New Task"
          />
          <button type="submit"><i className="fa-solid fa-plus"></i></button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateTask;
