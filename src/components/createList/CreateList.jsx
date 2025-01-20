import "./createList.css"
import { useContext } from "react";
import { getData } from "../functions/getData";
import { List, Message, Task, User } from "../context/ContextData";
import { createList } from "../functions/createList";

const CreateList = () => {
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { user, setUser } = useContext(User);
  const { message, setMessage } = useContext(Message);

  return (
    <>
      <form
        className="create-form"
        action=""
        onSubmit={(e) =>
          createList(e, setMessage, getData, setUser, setList, setTask)
        }
      >
        <h1>Create list</h1>
        <fieldset>
          <legend>List Name</legend>
          <input
            type="text"
            required
            minLength={1}
            name="name"
            placeholder="List name"
          />

          <legend>New description</legend>
          <textarea
            name="description"
            placeholder="Description for your list."
          ></textarea>

          <button type="submit">Create list</button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateList;
