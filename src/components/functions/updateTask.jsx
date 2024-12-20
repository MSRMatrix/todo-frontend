import { getData } from "./getData";

export const updateTask = async (e, oldTask, _id, setUser, setList, setTask, setUpdate) => {
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
    if (!response.ok) {
      return alert(data.message);
    } else {
      getData(setUser, setList, setTask);
      console.log("Task updated!");
      setUpdate("")
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
