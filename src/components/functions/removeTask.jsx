import { getData } from "./getData";

export const removeTask = async (listId, _id, setUser, setList, setTask) => {
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