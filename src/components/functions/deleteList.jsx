import { getData } from "./getData";

export const deleteList = async (listId, setUser, setList, setTask, setMessage) => {
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
      const data = await response.json()

      const text = data.message
      if (!response.ok) {
        setMessage({
        topic: text,
        show: true,
      });
        return console.log("List could not be deleted!");
      } else {
        setMessage({
          topic: text,
          show: true,
        });
        getData(setUser, setList, setTask);
        
        return console.log("List deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  