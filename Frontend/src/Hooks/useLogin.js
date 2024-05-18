import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


function useLogin() {
  
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login =async ({userName, password}) =>{
        setLoading(true);

        if(!userName || !password){
            toast.error("Please fill all the fields");
            return;
        }

        try {
            const res =  await fetch("/api/auth/login",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({userName, password})
               });
        
               const data = await res.json();
        
               if(data.error){
                throw new Error(data.error);
               }
        
            //    save the user in local storage

            localStorage.setItem("chat-user", JSON.stringify(data));

            setAuthUser(data);   
                 
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }

    }

    return {loading, login}

}

export default useLogin
