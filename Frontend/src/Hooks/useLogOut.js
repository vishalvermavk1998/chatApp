import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";


function useLogout() {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
 
    const Logout = async () =>{
        setLoading(true)

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {"Content-Type" : "application/json"}
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.message)
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error("Error is : ", error.message)
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, Logout};
}

export default useLogout;