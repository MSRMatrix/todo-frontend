import "./displayList.css";
import { useContext, useState } from "react";
import { List, Message, Task, User } from "../context/ContextData";
import CreateTask from "../createTask/CreateTask";
import { deleteList } from "../functions/deleteList";
import { removeTask } from "../functions/removeTask";
import { emptyList } from "../functions/emptyList";
import { checkTask } from "../functions/checkTask";
import { updateTask } from "../functions/updateTask";
import { updateList } from "../functions/updateList";
import { toggleAllTasks } from "../functions/toggleAllTasks";
import CheckedList from "./list/CheckedList";
import UnCheckedList from "./list/UnCheckedList";

const DisplayList = () => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);
  const [update, setUpdate] = useState("");

  function taskLength(listItem) {
    try {
      const taskObjects = task.filter((test) =>
        listItem.task.includes(test._id)
      );
      return taskObjects.length;
    } catch (error) {
      return;
    }
  }

  function taskComplete(listItem) {
    try {
      const taskObjects = task.filter((test) =>
        listItem.task.includes(test._id)
      );
      return taskObjects.filter((test) => test.done).length;
    } catch (error) {
      return;
    }
  }

  return (
    <>
      {list.map((listItem) => (
        <div key={listItem._id} className="top-div">
          {update !== listItem._id ? (
            <div>
              <h2>{listItem.name}</h2>
              <p>{listItem.description}</p>
              <p>
                Tasks completed: {taskComplete(listItem)}/{taskLength(listItem)}{" "}
                {taskComplete(listItem) === taskLength(listItem) &&
                taskLength(listItem) > 0 ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  ""
                )}
              </p>
            </div>
          ) : (
            <form
              action=""
              onSubmit={(e) =>
                updateList(
                  e,
                  listItem.task,
                  listItem._id,
                  setUser,
                  setList,
                  setTask,
                  setUpdate,
                  setMessage
                )
              }
            >
              <input name="name" defaultValue={listItem.name} />
              <textarea
                name="description"
                defaultValue={listItem.description}
              />
              <button type="submit">Update</button>
            </form>
          )}
          <i
            onClick={() =>
              setUpdate(update === listItem._id ? "" : listItem._id)
            }
            className={`fa-solid fa-pencil${
              update === listItem._id ? " pencil-update" : " pencil-done"
            }`}
          ></i>
          <button
            onClick={() =>
              toggleAllTasks(listItem, setUser, setList, setTask, setMessage)
            }
          >
            Check Buttons
          </button>
          <button
            onClick={(e) =>
              deleteList(listItem._id, setUser, setList, setTask, setMessage)
            }
          >
            Delete
          </button>
          {listItem.task.length >= 1 ? (
            <button
              onClick={() =>
                emptyList(listItem._id, setUser, setList, setTask, setMessage)
              }
            >
              Empty list
            </button>
          ) : (
            ""
          )}
          <ul className="task-div">
            <ul className="filter-tasks">
            <li>Unfinished Tasks</li>    
            <li>Finished Tasks</li>
            </ul>
            <ul className="lists">
              <div className="checked-task"><CheckedList listItem={listItem}/></div>
              <div className="unchecked-task"><UnCheckedList listItem={listItem}/></div>
            </ul>
          </ul>
          {taskLength(listItem) < 4 ? <CreateTask listId={listItem._id} /> : ""}
        </div>
      ))}
    </>
  );
};

export default DisplayList;
