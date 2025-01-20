import { getData } from "./getData";

export const resetData = async (setUser, setList, setTask, setMessage) => {
  const password = prompt("Type in your password: ");
  const URL = import.meta.env.VITE_BACKENDURL;

  if(password === null){
    console.log("Data not deleted!")
  return setMessage({
     topic: "Data not deleted!",
     show: true,
   });
 }
 
  try {
    const response = await fetch(`${URL}/list/reset-data`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    const text = data.message;

    if (!response.ok) {
      setMessage({
        topic: text,
        show: true,
      });
      return console.log("Data not there!");
    } else {
      getData(setUser, setList, setTask);
      setMessage({
        topic: text,
        show: true,
      });
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
