import { getData } from "./getData";

export const removeTask = async (
  listId,
  _id,
  setUser,
  setList,
  setTask,
  setMessage
) => {
  const URL = import.meta.env.VITE_BACKENDURL;
  try {
    const response = await fetch(`${URL}/task`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ listId: listId, _id: _id }),
    });
    const data = await response.json();
    const text = data.message;
    
    if (!response.ok) {
      setMessage({
        topic: text,
        show: true,
      });
      return console.log("Task could not be deleted!");
    } else {
      getData(setUser, setList, setTask);
      setMessage({
        topic: text,
        show: true,
      });
      console.log("Task deleted!");
    }
  } catch (error) {
    console.log(error);
  }
};
