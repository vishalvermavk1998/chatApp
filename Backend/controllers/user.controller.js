import User from "../models/user.models.js";


export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUser = req.user._id;

        const filteredUsers = await User.find({_id : {$ne : loggedInUser}}).select("-password");

        res.status(201).json(filteredUsers);
    } catch (error) {
        console.log("Error in get user for side bar controller", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}