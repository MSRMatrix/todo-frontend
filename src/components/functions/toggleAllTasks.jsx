import { getData } from "./getData";

export const toggleAllTasks = async (listId, setUser, setList, setTask, setMessage) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    
    try {
      const response = await fetch(`${URL}/task/check-all`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: listId }),
      });
      const data = await response.json()

      const text = data.message
      if (!response.ok) {
        setMessage({
        topic: text,
        show: true,
      });
        return console.log("Task could not be checked!");
      } else {
        setMessage({
          topic: text,
          show: true,
        });
        getData(setUser, setList, setTask);
        
        return console.log("All tasks checked!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  