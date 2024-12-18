import Profile from "../profile/Profile";
import DisplayList from "../displayList/DisplayList";
import { useContext, useEffect } from "react";
import { List, Task, User } from "../context/ContextData";
import CreateList from "../createList/CreateList";
import { getData } from "../functions/getData";
import Options from "../options/Options";

const Workspace = () => {
  const { user, setUser } = useContext(User);
  const { list, setList } = useContext(List);
  const { task, setTask } = useContext(Task);

  useEffect(() => {
    getData(setUser, setList, setTask);
  }, []);
  return (
    <>
      <Options />
      <CreateList />
      <DisplayList />
    </>
  );
};

export default Workspace;
