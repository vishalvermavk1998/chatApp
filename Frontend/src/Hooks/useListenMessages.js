import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/conversationSlice";
import notificationSound from "../../public/notificationSound/sound.mp3"

function useListenMessages() {
  
    const {socket} = useSocketContext();
    const dispatcher = useDispatch();
    const messages = useSelector(state => state.conversation.messages);
    

    useEffect(()=>{

        socket?.on("newMessage", (newMessage)=>{

            const sound = new Audio(notificationSound);
            sound.play();
            dispatcher(setMessages([...messages, newMessage]))
        })

        return () => socket?.off("newMessage")
    },[socket, setMessages, messages])
}

export default useListenMessages
