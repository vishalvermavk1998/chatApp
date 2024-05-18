import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {toast} from "react-hot-toast"
import { setMessages } from "../redux/conversationSlice";

function useSendMessage() {
 
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const selectedConversation = useSelector(state => state.conversation.selectedConversation);
    const messages = useSelector(state => state.conversation.messages);

    const sendMessage = async (message) =>{

        setLoading(true);

        try {
            const res = await fetch(`/api/message/send/${selectedConversation._id}`,{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body : JSON.stringify({message})
            });

            const data = await res.json();
            if(!data){
                throw new Error(data.error);
            }

            dispatch(setMessages([...messages, data ]))
            
        } catch (error) {
        
            toast.error(error.message)
        }finally{
            setLoading(false);
        }

    }

    return {loading, sendMessage}
}

export default useSendMessage;
