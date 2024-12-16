import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_BACKENDURL;

const DeleteUser = () => {
  const navigate = useNavigate();

  async function handleSubmit() {
    const password = prompt("Please type in your password: ");
    try {
      const response = await fetch(`${URL}/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      {
        alert("User deleted");
        return navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Do you want to delete your profile?</h2>
      <button onClick={handleSubmit}>Yes</button>
      <button onClick={() => navigate("/workspace")}>No</button>
    </>
  );
};

export default DeleteUser;
