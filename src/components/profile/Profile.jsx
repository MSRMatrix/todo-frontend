import { useContext } from "react";
import Logout from "../logout/Logout";
import { User } from "../context/ContextData";

const Profile = () => {
    const { user, setUser } = useContext(User)
    
    return(
        <>
        Username: {user.username}
        Email: {user.email}
        Password: ********
        <Logout />
        </>
    )
}
export default Profile;