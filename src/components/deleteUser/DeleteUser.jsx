import { useNavigate } from "react-router-dom";
import { Message } from "../context/ContextData";
import { useContext } from "react";
import { deleteUser } from "../functions/deleteUser";

const DeleteUser = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useContext(Message);

  return (
    <>
      <h2>Do you want to delete your profile?</h2>
      <button onClick={() => deleteUser(setMessage, navigate)}>Yes</button>
      <button onClick={() => navigate("/workspace")}>No</button>
    </>
  );
};

export default DeleteUser;
