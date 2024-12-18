import { useContext } from "react";
import { List, Task, User } from "../context/ContextData";
import CreateTask from "../createTask/CreateTask";
import { getData } from "../functions/getData";

const URL = import.meta.env.VITE_BACKENDURL;

const DisplayList = () => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);

  const deleteList = async (listId) => {
    const password = prompt("Enter your password: ");
    try {
      const response = await fetch(`${URL}/list`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: listId, password: password }),
      });
      if (!response.ok) {
        return alert("List could not be deleted!");
      } else {
        getData(setUser, setList, setTask);
        return alert("List deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTask = async (listId, _id) => {
    try {
      const response = await fetch(`${URL}/task`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({listId: listId, _id: _id}),
      });
      const data = await response.json();

      if (!response.ok) {
        return alert("Task could not be deleted!");
      } else {
        getData(setUser, setList, setTask);
        alert("Task deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const emptyList = async (listId) => {
    const password = prompt("Enter your password: ");
    try {
      const response = await fetch(`${URL}/list/empty-list`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: listId, password: password }),
      });
      if (!response.ok) {
        return alert("List could not be deleted!");
      } else {
        getData(setUser, setList, setTask);
        return alert("List is now empty!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {list.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <button onClick={(e) => deleteList(item._id)}>Delete</button>
          <p>{item.description}</p>{item.task.length >= 1 ? (<button onClick={() => emptyList(item._id)}>Empty list</button>) : ""}
          <ul>
            <ul>
              {task.map((taskItem) =>
                taskItem.listId === item._id ? (
                  <li
                    key={taskItem._id}
                    style={{
                      textDecoration: taskItem.done ? "line-through" : "",
                    }}
                  ><button onClick={() => removeTask(item._id, taskItem._id)}>Delete</button>
                    {taskItem.task}
                    <button
                      type="checkbox"
                      onClick={() => (taskItem.done = !taskItem.done)}
                    ></button>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </ul>
          <CreateTask listId={item._id} />
        </div>
      ))}
    </>
  );
};

export default DisplayList;
