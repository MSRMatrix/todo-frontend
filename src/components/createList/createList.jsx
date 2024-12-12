import { useContext, useState } from "react";
import { List } from "../context/ContextData";

const CreateTodo = () => {
  const { list, setList } = useContext(List);
  const [newList, setNewList] = useState("");

  function createTodo(e) {
    e.preventDefault();
  
    if (newList.trim().length <= 0) {
      return alert("Input should not be empty!");
    }
  
    setList((prevList) => [
      ...prevList,
      {
        todo: newList,
        done: false,
      },
    ]);
  
    setNewList("");
    e.target.reset()
  }
  

  console.log(list);
  

  return (
    <>
      <form action="" onSubmit={createTodo}>
        <fieldset>
          <legend>New list</legend>
          <input
            type="text"
            required
            minLength={1}
            onChange={(e) => setNewList(e.target.value)}
          />
          <button type="submit">Create list</button>
        </fieldset>
      </form>
    </>
  );
};

export default CreateTodo;