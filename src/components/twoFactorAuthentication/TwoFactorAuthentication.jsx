import { useNavigate } from "react-router-dom";

const TwoFactorAuthentication = () => {
    const URL = import.meta.env.VITE_BACKENDURL;

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`${URL}/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formDataObject.email,
          code: formDataObject.code,
        }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.message);
        return;
      } else {
        alert("Profile verified!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
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
}

export default TwoFactorAuthentication;