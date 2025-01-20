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
import ListComponent from "./list/CheckedList";

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
        <div key={listItem._id} className="list-container">
          <div className="task">
            {update !== listItem._id ? (
              <div>
                <h2>{listItem.name}</h2>
                <p>{listItem.description}</p>
              </div>
            ) : (
              <form
                className="update-list"
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
          </div>

          <div className="list-actions">
            <i
              onClick={() =>
                setUpdate(update === listItem._id ? "" : listItem._id)
              }
              className={`fa-solid fa-pencil${
                update === listItem._id ? " pencil-update" : " pencil-done"
              }`}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={(e) =>
                deleteList(listItem._id, setUser, setList, setTask, setMessage)
              }
            ></i>
            {listItem.task.length >= 1 ? (
              <i
                onClick={() =>
                  toggleAllTasks(
                    listItem,
                    setUser,
                    setList,
                    setTask,
                    setMessage
                  )
                }
                className={`fa-solid fa-check-double ${
                  taskComplete(listItem) === taskLength(listItem)
                    ? "checked"
                    : "unchecked"
                }`}
              ></i>
            ) : (
              ""
            )}

            {listItem.task.length >= 1 ? (
              <i
                onClick={() =>
                  emptyList(listItem._id, setUser, setList, setTask, setMessage)
                }
                className="fa-solid fa-broom"
              ></i>
            ) : (
              ""
            )}
          </div>

          <ul className="task-div">
            {/* <ul className="filter-tasks">
            <li>Unfinished Tasks</li>    
            <li>Finished Tasks</li>
            </ul> */}
            <h2>
              Tasks completed: {taskComplete(listItem)}/{taskLength(listItem)}{" "}
              {taskComplete(listItem) === taskLength(listItem) &&
              taskLength(listItem) > 0 ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                ""
              )}
            </h2>
            <ul className="lists">
              <div className="task-div">
                <ListComponent listItem={listItem} />
              </div>
              {/* <div className="unchecked-task"><UnCheckedList listItem={listItem}/></div> */}
            </ul>
          </ul>
          {taskLength(listItem) < 4 ? <CreateTask listId={listItem._id} /> : ""}
        </div>
      ))}
    </>
  );
};

export default DisplayList;
