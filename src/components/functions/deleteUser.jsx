export async function deleteUser(setMessage, navigate) {
    const URL = import.meta.env.VITE_BACKENDURL;
    const password = prompt("Please type in your password: ");

    if(password === null){
      console.log("User not deleted!")
    return setMessage({
       topic: "User not deleted!",
       show: true,
     });
   }
    try {
      const response = await fetch(`${URL}/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: password }),
      });
      const data = await response.json();
      const text = data.message;

      if (!response.ok) {
        setMessage({
          topic: text,
          show: true,
        });
        console.log("Profile not deleted!");
        return;
      }
     else {
      setMessage({
        topic: text,
        show: true,
      });
        console.log("User deleted");
        return navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }