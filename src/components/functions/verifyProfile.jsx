export async function verifyProfile(e, navigate) {
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
      
      if (!response.ok) {
        alert(data.message);
        return;
      } else {
        alert("Profile verified!");
        navigate("/workspace");
      }
    } catch (error) {
      console.log(error);
    }
  }