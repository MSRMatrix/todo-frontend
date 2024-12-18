export const login = async (e, navigate, setUser) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const response = await fetch(`${URL}/user/login`, {
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

    if(response.status === 410){
      alert("You need to verify your email adress")
      return navigate("/verify")
    }

    if(response.status === 401){
      alert(data.message)
      return navigate("/")
    }

    if(response.status === 420){
      alert(data.message)
      return navigate("/two-factor-authentication")
    }

    if (!response.ok) {
      console.error("Error fetching category data:", response.statusText);
      return alert(data.message)
    } else {
      setUser(data)
      alert("Registration successfully!");
      navigate("/workspace");
    }
  };