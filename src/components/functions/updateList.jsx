import { getData } from "./getData";

export const updateList = async (
  e,
  oldList,
  _id,
  setUser,
  setList,
  setTask,
  setUpdate
) => {
  e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;

  const formData = new FormData(e.target);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  const newList = e.target.elements[0].value.trim();

  if (newList === oldList) {
    return console.log(`Name is equal!`);
  }

  try {
    const response = await fetch(`${URL}/list`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ _id: _id, name: formDataObject.name, description: formDataObject.description, oldList: oldList }),
    });
    const data = await response.json();
    if (!response.ok) {
      return alert(data.message);
    } else {
      getData(setUser, setList, setTask);
      console.log("List updated!");
      setUpdate("");
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
