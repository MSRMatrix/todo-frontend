export const updateProfile = async (e, setUser, setMessage, setUpdate, setShowPassword, navigate) => {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(`${URL}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: formDataObject.password.trim(),
          username: formDataObject.username.trim(),
          email: formDataObject.email.trim(),
          confirmPassword: formDataObject.confirmPassword.trim(),
        }),
      });
      const data = await response.json();
      const text = 
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;

      if (!response.ok) {
        setMessage({
          topic: text,
          show: true,
        });
        return console.log(data);
      } else {
        setUser(data.user);
        console.log(data.message);
        e.target.reset();
        setUpdate(false);
        setShowPassword(false);
        setMessage({
          topic: text,
          show: true,
        });
        return navigate("/profile")
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
    }
  };