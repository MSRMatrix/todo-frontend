export async function registrationFunction(e, navigate) {
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

    if (!response.ok) {
      console.error("Error fetching category data:", response.statusText);
    } else {
      alert("You need to verify your email address before logging in!");
      navigate("/verify");
    }
  }
