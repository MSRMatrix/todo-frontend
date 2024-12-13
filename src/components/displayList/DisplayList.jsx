import { useContext } from "react";
import { List, Task, User } from "../context/ContextData";
import CreateTask from "../createTask/CreateTask";

const DisplayList = () => {
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { user, setUser} = useContext(User)
;
  return (
    <>
      {list.map((item) => (
        <div key={item._id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <ul>
            {task.map((item) => {
              <li key={item._id} style={{ textDecoration: item.done ? "line-through" : "" }}>
                {item.task}
                <button
                  type="checkbox"
                  onClick={() => (item.done = !item.done)}
                ></button>
              </li>;
            })}
          </ul>
          <CreateTask />
        </div>
      ))}
    </>
  );
};

export default DisplayList;
