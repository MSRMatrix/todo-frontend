import { useContext, useState } from "react";
import { updateTask } from "../../functions/updateTask";
import { List, Message, Task, User } from "../../context/ContextData";
import { removeTask } from "../../functions/removeTask";
import { checkTask } from "../../functions/checkTask";

const ListComponent = ({listItem}) => {
    const { user, setUser } = useContext(User);
    const { list, setList } = useContext(List);
    const { task, setTask } = useContext(Task);
    const { message, setMessage } = useContext(Message);
    const [update, setUpdate] = useState("");

    return(
        <>
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
                
                      <i className="fa-solid fa-trash" onClick={() =>
                          removeTask(
                            listItem._id,
                            taskItem._id,
                            setUser,
                            setList,
                            setTask,
                            setMessage
                          )
                        }></i>
                      {!taskItem.done ? (
                        <i
                          onClick={() =>
                            setUpdate(
                              update === taskItem._id ? "" : taskItem._id
                            )
                          }
                          className={`fa-solid fa-pencil${
                            update === taskItem._id
                              ? " pencil-update"
                              : " pencil-done"
                          }`}
                        ></i>
                      ) : (
                        ""
                      )}
                      <i
                        style={{ cursor: "pointer" }}
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
        </>
    )
}

export default ListComponent;




// import { useContext, useState } from "react";
// import { updateTask } from "../../functions/updateTask";
// import { List, Message, Task, User } from "../../context/ContextData";
// import { removeTask } from "../../functions/removeTask";
// import { checkTask } from "../../functions/checkTask";

// const CheckedList = ({listItem}) => {
//     const { user, setUser } = useContext(User);
//     const { list, setList } = useContext(List);
//     const { task, setTask } = useContext(Task);
//     const { message, setMessage } = useContext(Message);
//     const [update, setUpdate] = useState("");

//     return(
//         <>
//           {task.map((taskItem) =>
//                 taskItem.listId === listItem._id && !taskItem.done ? (
//                   <div className="list" key={taskItem._id}>
//                     {update !== taskItem._id ? (
//                       <li
//                         className="task"
//                         key={taskItem._id}
//                         style={{
//                           textDecoration: taskItem.done ? "line-through" : "",
//                         }}
//                       >
//                         {taskItem.task}
//                       </li>
//                     ) : (
//                       <form
//                         className="task"
//                         action=""
//                         onSubmit={(e) =>
//                           updateTask(
//                             e,
//                             taskItem.task,
//                             taskItem._id,
//                             setUser,
//                             setList,
//                             setTask,
//                             setUpdate,
//                             setMessage
//                           )
//                         }
//                       >
//                         <input defaultValue={taskItem.task} />
//                         <button type="submit">Update</button>
//                       </form>
//                     )}
//                     <div className="task-option">
                
//                       <i className="fa-solid fa-trash" onClick={() =>
//                           removeTask(
//                             listItem._id,
//                             taskItem._id,
//                             setUser,
//                             setList,
//                             setTask,
//                             setMessage
//                           )
//                         }></i>
//                       {!taskItem.done ? (
//                         <i
//                           onClick={() =>
//                             setUpdate(
//                               update === taskItem._id ? "" : taskItem._id
//                             )
//                           }
//                           className={`fa-solid fa-pencil${
//                             update === taskItem._id
//                               ? " pencil-update"
//                               : " pencil-done"
//                           }`}
//                         ></i>
//                       ) : (
//                         ""
//                       )}
//                       <i
//                         style={{ cursor: "pointer" }}
//                         onClick={() =>
//                           checkTask(
//                             taskItem._id,
//                             setUser,
//                             setList,
//                             setTask,
//                             setMessage
//                           )
//                         }
//                         className={`fa-solid fa-square-${
//                           taskItem.done ? "check" : "xmark"
//                         }`}
//                       ></i>
//                     </div>
//                   </div>
//                 ) : (
//                   ""
//                 )
//               )}
//         </>
//     )
// }

// export default CheckedList;