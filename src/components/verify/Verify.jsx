import { NavLink, useNavigate } from "react-router-dom";
import { verifyProfile } from "../functions/verifyProfile"
import { useContext } from "react";
import { Message } from "../context/ContextData";

const Verify = () => {
  const navigate = useNavigate();
  const { message, setMessage } = useContext(Message);
  return (
    <>
      <form action="" onSubmit={(e) => verifyProfile(e, navigate, setMessage)}>
        <fieldset>
          <legend>Verify Account</legend>

          <legend>Email:</legend>
          <input type="email" name="email" />

          <legend>Code:</legend>
          <input type="text" name="code" />

          <button type="submit">Verify</button>
        </fieldset>
      </form>
      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Verify;
