import { useContext } from "react";
import "./popUp.css"
import { Message } from "../context/ContextData";

const PopUp = () => {
    const { message, setMessage } = useContext(Message);
    return(
        <div className="pop-up">
        <p>{message.topic}</p>
        </div>
    )
}

export default PopUp;