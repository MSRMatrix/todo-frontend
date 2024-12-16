import { useContext } from "react";
import Logout from "../logout/Logout";
import { User } from "../context/ContextData";
import DeleteUser from "../deleteUser/DeleteUser";

const Profile = () => {
    const { user, setUser } = useContext(User)
    
    return(
        <>
        Username: {user.username}
        Email: {user.email}
        Password: ********
        <Logout />
        <DeleteUser />
        </>
    )
}
export default Profile;