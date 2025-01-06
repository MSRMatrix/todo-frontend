import { getData } from "./getData";

export const updateTask = async (
  e,
  oldTask,
  _id,
  setUser,
  setList,
  setTask,
  setUpdate,
  setMessage
) => {
  e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;
  const newTask = e.target.elements[0].value.trim();

  if (newTask === oldTask) {
    return console.log(`Name is equal!`);
  }

  try {
    const response = await fetch(`${URL}/task/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id: _id, task: newTask, oldTask: oldTask }),
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
      console.log("Task updated!");
      setUpdate("");
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
