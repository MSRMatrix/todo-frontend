export async function verifyProfile(e, navigate, setMessage) {
  e.preventDefault();
  const URL = import.meta.env.VITE_BACKENDURL;
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

    const text =
      data?.errors?.map((item) => item.msg).join(" \n") || data.message;

    if (!response.ok) {
      return setMessage({
        topic: text,
        show: true,
      });
    } else {
      setMessage({
        topic: text,
        show: true,
      });
      navigate("/workspace");
    }
  } catch (error) {
    console.log(error);
  }
}
