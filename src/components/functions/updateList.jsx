import { getData } from "./getData";

export const updateList = async (
  e,
  oldList,
  _id,
  setUser,
  setList,
  setTask,
  setUpdate,
  setMessage
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
    const text = data?.errors?.map((item) => item.msg).join(" \n") || data.message
    if (!response.ok) {
      setMessage({
      topic: text,
      show: true
    })
      return 
    } else {
      getData(setUser, setList, setTask);
      console.log("List updated!");
      setUpdate("");
      setMessage({
        topic: text,
        show: true
      })
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
