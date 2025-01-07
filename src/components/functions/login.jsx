export const login = async (e, navigate, setUser, setMessage) => {
  e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;
  console.log(URL);
  
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

  const data = await response.json();
  const text =
    data?.errors?.map((item) => item.msg).join(" \n") || data.message;

  if (response.status === 410) {
    setMessage({
      topic: text,
      show: true,
    });
    return navigate("/verify");
  }

  if (response.status === 401) {
    setMessage({
      topic: text,
      show: true,
    });
    return;
  }

  if (response.status === 420) {
    setMessage({
      topic: text,
      show: true,
    });
    return navigate("/two-factor-authentication");
  }

  if (!response.ok) {
    console.error("Error fetching category data:", response.statusText);
    setMessage({
      topic: text,
      show: true,
    });
    return;
  } else {
    setUser(data);
    setMessage({
      topic: text,
      show: true,
    });
    navigate("/workspace");
    return
  }
};
