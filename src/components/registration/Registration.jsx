import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registrationFunction } from "../functions/registrationFunction";
import { Field } from "../context/ContextData";
import { inputFunction } from "../functions/inputFunction";

const Registration = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const { field, setField } = useContext(Field);

  return (
    <>
      <form onSubmit={(e) => registrationFunction(e, navigate)}>
        <fieldset>
          <legend>Registration</legend>

          {["username", "email", "password"].map((key) => (
            <div key={key}>
              <legend>{key.charAt(0).toUpperCase() + key.slice(1)}:</legend>
              <input
                type={key === "password" && !see ? "password" : "text"}
                name={key}
                value={field[key].value}
                onChange={(e)=>inputFunction(e, setField)}
                style={{boxShadow: field[key].message.length > 1 ? "0px 0px 4px 4px red" : ""}}
                minLength={key === "password" || key === "username" ? 8 : undefined}
                required
              />
              {key === "password" && (
                <i
                  className={`fa-solid ${see ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setSee(!see)}
                ></i>
              )}
              <p>{field[key].message}</p>
            </div>
          ))}

          <button type="submit">Register</button>
        </fieldset>
      </form>

      <NavLink to="/">Back</NavLink>
    </>
  );
};

export default Registration;