import { getData } from "./getData";

export const checkTask = async (
  taskId,
  setUser,
  setList,
  setTask,
  setMessage
) => {
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
    const data = await response.json();
    const text =
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;
    if (!response.ok) {
      setMessage({
        topic: text,
        show: true,
      });
      return console.log("Task could not be checked!");
    } else {
      getData(setUser, setList, setTask);
      console.log("Task updated!");
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
