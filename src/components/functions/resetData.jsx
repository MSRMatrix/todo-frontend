import { getData } from "./getData";

export const resetData = async (setUser, setList, setTask) => {
  const password = prompt("Type in your password: ")
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/list/reset-data`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        return alert("Data not there!");
      } else {
        getData(setUser, setList, setTask);
        return 
      }
    } catch (error) {
      console.log(error);
    }
  };
