import { getData } from "./getData";

export const checkTask = async (taskId, setUser, setList, setTask) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/task/check`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ _id: taskId }),
      });
      if (!response.ok) {
        return alert("Task could not be checked!");
      } else {
        getData(setUser, setList, setTask);
        console.log("Task updated!");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };