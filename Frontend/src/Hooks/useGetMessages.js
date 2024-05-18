import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/conversationSlice";


function useGetMessages() {

    const [loading, setLoading] = useState(false);
    const dispatcher = useDispatch();
    const selectedConversation = useSelector(state => state.conversation.selectedConversation);
    const messages = useSelector(state => state.conversation.messages);

    useEffect(()=>{
        
        const getMessages = async () =>{
            setLoading(true);
            try {
                
                const res = await fetch(`api/message/${selectedConversation._id}`);
                const data = await res.json();

                if(data.error){
                    throw new Error(data.error);
                }
                dispatcher(setMessages(data));

            } catch (error) {
                toast.error(error.message)
            }finally{
                setLoading(false);
            }
        }

        if(selectedConversation?._id) getMessages();

    },[selectedConversation?._id, setMessages])

    return {messages, loading} ;
}

export default useGetMessages
