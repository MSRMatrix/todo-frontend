export const logout = async(navigate, setMessage) => {
    try{ 
        const URL = import.meta.env.VITE_BACKENDURL;
        const response = await fetch(`${URL}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        if(!response.ok){
            setMessage({
                topic: "Logout successful!",
                show: true,
              });
            return console.log("Logout failed: ", response.message)
        }
        else{
            setMessage({
                topic: "Logout successful!",
                show: true,
              });
             return navigate("/")
        }
    }catch(error){
        return alert(error)
    }
}