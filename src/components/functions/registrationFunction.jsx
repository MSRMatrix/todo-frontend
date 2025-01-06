export async function registrationFunction(e, navigate, setMessage) {
    e.preventDefault();

  const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    const response = await fetch(`${URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: formDataObject.username,
        email: formDataObject.email,
        password: formDataObject.password,
      }),
    });

    const data = await response.json()
    const text = data?.errors?.map((item) => item.msg).join(" \n") || data.message

    if (!response.ok) {
      console.error("Error fetching category data:", response.statusText);
      return setMessage({
        topic: text,
        show: true
      })
    } else {
      setMessage({
        topic: data.message,
        show: true
      })
      navigate("/verify");
    }
  }
