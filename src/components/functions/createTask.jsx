export async function createTask(e, listId, setMessage, getData, setUser, setList, setTask) {
    e.preventDefault();
    const URL = import.meta.env.VITE_BACKENDURL;
    const formData = new FormData(e.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try{
      const response = await fetch(`${URL}/task`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          task: formDataObject.task,
          listId: listId,
        }),
        
      })
      
      const data = await response.json();
      const text =
        data?.errors?.map((item) => item.msg).join(" \n") || data.message;


      if(!response.ok){
        e.target.reset()
        setMessage({
        topic: text,
        show: true,
      });
        return console.log(data.message)
      }
      else{
         getData(setUser, setList, setTask)
         e.target.reset()
         setMessage({
          topic: text,
          show: true,
        });
        return console.log("Task created!")
      }
    }catch(error){
      console.log(error);
    }
  }