import { useNavigate } from "react-router-dom";
import { Message, User } from "../context/ContextData";
import { useContext } from "react";

const TwoFactorAuthentication = () => {
  const URL = import.meta.env.VITE_BACKENDURL;
  const { user, setUser } = useContext(User);
  const { message, setMessage } = useContext(Message);
  const navigate = useNavigate();

  async function handleSubmit(e, setMessage) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(
        `${URL}/user/test-two-factor-authentication`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: formDataObject.email,
            code: formDataObject.code,
          }),
        }
      );
      const data = await response.json();
      const text =
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;
      if (!response.ok) {
        
        setMessage({
        topic: text,
        show: true,
      });
        console.log(data.message);
        return;
      } else {
        setMessage({
          topic: text,
          show: true,
        });
        console.log("Profile verified!");
        navigate("/workspace");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form action="" onSubmit={(e) => handleSubmit(e, setMessage)}>
        <fieldset>
          <legend>Two-factor Authentication</legend>

          <legend>Email:</legend>
          <input type="email" name="email" />

          <legend>Code:</legend>
          <input type="text" name="code" />

          <button type="submit">Verify</button>
        </fieldset>
      </form>
    </>
  );
};

export default TwoFactorAuthentication;
