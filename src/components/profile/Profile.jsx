import { useContext } from "react";
import { User } from "../context/ContextData";

const Profile = () => {
    const { user, setUser } = useContext(User)
    
    return(
        <>
        Username: {user.username}
        Email: {user.email}
        Password: ********
        </>
    )
}
export default Profile;