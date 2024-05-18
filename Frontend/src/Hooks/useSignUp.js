import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignUp() {

    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp = async ({ fullName, userName, password, confirmPassword, gender }) => {
        setLoading(true);

        const inputData = handleInputError({ fullName, userName, password, confirmPassword, gender });

        if (!inputData) return;

        try {

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, userName, password, confirmPassword, gender })
            })

            const data = await res.json();

            if (!data) {
                throw new Error(data.message)
            }

            // set user in local storage
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)

            console.log("Response data is : ", data)

        } catch (error) {
            toast.error("Error is ", error.message)
        }
        finally {
            setLoading("false")
        }

    }

    return { loading, signUp };

}

export default useSignUp

function handleInputError({ fullName, userName, password, confirmPassword, gender }) {

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match ")
        return false
    }

    if (password.length < 6) {
        toast.error("Plaeseenter the password in atleast 6 words")
        return false
    }

    return true;
}
