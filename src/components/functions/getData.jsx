export const getData = async (setUser, setList, setTask) => {
    const URL = import.meta.env.VITE_BACKENDURL;
    try {
      const response = await fetch(`${URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log("Data not there!");
      } else {
        setUser(data.user)
        setList(data.list)
        setTask(data.task)
        return
      }
    } catch (error) {
      console.log(error);
    }
  };
