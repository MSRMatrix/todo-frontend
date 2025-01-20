import { getData } from "./getData";

export const emptyList = async (
  listId,
  setUser,
  setList,
  setTask,
  setMessage
) => {
  const URL = import.meta.env.VITE_BACKENDURL;
  const password = prompt("Enter your password: ");

  if(password === null){
    console.log("List not cleared!")
  return setMessage({
     topic: "List not cleared!",
     show: true,
   });
 }
  try {
    const response = await fetch(`${URL}/list/empty-list`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id: listId, password: password }),
    });
    const data = await response.json();
    const text =
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;
    if (!response.ok) {
      setMessage({
        topic: text,
        show: true,
      });
      return;
    } else {
      getData(setUser, setList, setTask);
      setMessage({
        topic: text,
        show: true,
      });
      return console.log("List is now empty!");
    }
  } catch (error) {
    console.log(error);
  }
};
