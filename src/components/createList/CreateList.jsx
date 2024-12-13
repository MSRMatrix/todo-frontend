import { useContext } from "react";
import { getData } from "../functions/getData";
import { List, Task, User } from "../context/ContextData";

const URL = import.meta.env.VITE_BACKENDURL;

const CreateList = () => {
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);
  const { user, setUser } = useContext(User);
  async function handleSubmit(e) {
    e.preventDefault();

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
      if (!response.ok) {
        e.target.reset();
        return alert("List could not be created!");
      } else {
        await getData(setUser, setList, setTask);
        e.target.reset();
        return alert("List created!");
      }
    } catch (error) {
      alert(error, ": List could not be created!");
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create list</legend>
          <legend>List Name</legend>
          <input
            type="text"
            required
            minLength={1}
            name="name"
            placeholder="List name"
          />

          <legend>New description</legend>
          <textarea
            name="description"
            placeholder="Description for your list."
          ></textarea>

          <button type="submit">Create list</button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateList;
