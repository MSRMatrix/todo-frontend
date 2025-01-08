export async function createList(
  e,
  setMessage,
  getData,
  setUser,
  setList,
  setTask
) {
  e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;
  const formData = new FormData(e.target);
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  try {
    const response = await fetch(`${URL}/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: formDataObject.name,
        description: formDataObject.description,
      }),
    });

    const data = await response.json();
    const text =
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;
    if (!response.ok) {
      e.target.reset();

      setMessage({
        topic: text,
        show: true,
      });
      return console.log("List could not be created!");
    } else {
      await getData(setUser, setList, setTask);
      e.target.reset();
      setMessage({
        topic: text,
        show: true,
      });
      return console.log("List created!");
    }
  } catch (error) {
    alert(error, ": List could not be created!");
  }
}
