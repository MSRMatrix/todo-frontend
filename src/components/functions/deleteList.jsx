import { getData } from "./getData";

export const deleteList = async (listId, setUser, setList, setTask) => {
    const URL = import.meta.env.VITE_BACKENDURL;
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