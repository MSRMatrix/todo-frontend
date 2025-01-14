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
        <div key={listItem._id} className="list-div">
          {update !== listItem._id ? (
            <div>
              <h2>{listItem.name}</h2>
              <p>{listItem.description}</p>
              <p>
                Tasks completed: {taskComplete(listItem)}/{taskLength(listItem)}
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
            className="fa-solid fa-pencil"
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
          <ul>
            <ul>
              {task.map((taskItem) =>
                taskItem.listId === listItem._id ? (
                  <div className="list" key={taskItem._id}>
                    {update !== taskItem._id ? (
                      <li
                        className="task"
                        key={taskItem._id}
                        style={{
                          textDecoration: taskItem.done ? "line-through" : "",
                        }}
                      >
                        {taskItem.task}
                      </li>
                    ) : (
                      <form
                        className="task"
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
                    <div className="task-option">
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
                      {!taskItem.done ? (
                        <i
                          onClick={() =>
                            setUpdate(
                              update === taskItem._id ? "" : taskItem._id
                            )
                          }
                          className={`fa-solid fa-pencil${
                            update ? " pencil-update" : " pencil-done"
                          }`}
                        ></i>
                      ) : (
                        ""
                      )}
                      <i
                      style={{cursor: "pointer"}}
                        onClick={() =>
                          checkTask(
                            taskItem._id,
                            setUser,
                            setList,
                            setTask,
                            setMessage
                          )
                        }
                        className={`fa-solid fa-square-${
                          taskItem.done ? "check" : "xmark"
                        }`}
                      ></i>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </ul>
          </ul>
          {taskLength(listItem) < 4 ? (
            <CreateTask listId={listItem._id} />
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default DisplayList;
