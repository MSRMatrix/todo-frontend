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

const DisplayList = () => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { message, setMessage } = useContext(Message);
  const [update, setUpdate] = useState("");
  
  return (
    <>
      {list.map((listItem) => (
        <div key={listItem._id} className="list-div">
          {update !== listItem._id ? (
            <div>
              <h2>{listItem.name}</h2>
              <p>{listItem.description}</p>
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
            className="fa-solid fa-pencil"
          ></i>

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
          <ul>
            <ul>
              {task.map((taskItem) =>
                taskItem.listId === listItem._id ? (
                  <li
                    key={taskItem._id}
                    style={{
                      textDecoration: taskItem.done ? "line-through" : "",
                    }}
                  >
                    <button
                      onClick={() =>
                        removeTask(
                          listItem._id,
                          taskItem._id,
                          setUser,
                          setList,
                          setTask,
                          setMessage
                        )
                      }
                    >
                      Delete
                    </button>
                    {update !== taskItem._id ? (
                      <p>{taskItem.task}</p>
                    ) : (
                      <form
                        action=""
                        onSubmit={(e) =>
                          updateTask(
                            e,
                            taskItem.task,
                            taskItem._id,
                            setUser,
                            setList,
                            setTask,
                            setUpdate,
                            setMessage
                          )
                        }
                      >
                        <input defaultValue={taskItem.task} />
                        <button type="submit">Update</button>
                      </form>
                    )}
                    {!taskItem.done ? (
                      <i
                        onClick={() =>
                          setUpdate(update === taskItem._id ? "" : taskItem._id)
                        }
                        className="fa-solid fa-pencil"
                      ></i>
                    ) : (
                      ""
                    )}

                    <input
                      type="checkbox"
                      defaultChecked={taskItem.done}
                      onClick={() =>
                        checkTask(
                          taskItem._id,
                          setUser,
                          setList,
                          setTask,
                          setMessage
                        )
                      }
                    />
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </ul>
        {Array.isArray(task) && task.length < 4 ? <CreateTask listId={listItem._id} /> : ""}
        </div>
      ))}
    </>
  );
};

export default DisplayList;
