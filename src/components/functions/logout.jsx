export const logout = async(navigate, URL) => {
    try{
        const response = await fetch(`${URL}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        if(!response.ok){
            return alert("Logout failed: ", response.message)
        }
        else{
             alert("Logged out successfully")
             return navigate("/")
        }
    }catch(error){
        return alert(error)
    }
}