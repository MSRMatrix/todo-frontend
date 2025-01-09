export async function twoFactorAuthentication(e, setMessage, navigate) {
    e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;
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
            username: formDataObject.username,
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
