import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookies from '../utils/generateToken.js';


export const signup = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;


        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password does not match " })
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "User name is already existed" })
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);



        const newUser = new User({
            fullName,
            userName,
            password: hashPassword,
            gender
        })

        if (newUser) {
            // generate jwt tokens
            generateTokenAndSetCookies(newUser._id, res)

            await newUser.save();
            const createdUser = await User.findById(newUser._id).select("-password");
            res.status(201).json(createdUser);
        }
        else {
            res.status(400).json({ error: "Invalid data" })

        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(400).json({ error: "Internal Server Error" })
    }
}


export const login = async (req, res) => {
    
    try {
        const {userName, password }= req.body;

        if(!userName){
           return res.status(401).json({error : "Enter a valid username"})
        }
    
        if(password === ""){
           return res.status(401).json({error: "Please enter password with atleast 6 character"})
        }
    
        const user = await User.findOne({userName});
    
        if(!user){
           return res.status(401).json({error : "This user name is not existed"}) 
        }
    
       const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    
       if(!isPasswordCorrect){
      return res.status(401).json({error : "Password is not matched"})
       }
    
       generateTokenAndSetCookies(user._id, res);
    
    
       res.status(200).json({
        _id : user._id,
        fullName: user.fullName,
        userName : user.userName
       })
      
    } catch (error) {
        console.log("Internal server error in Login Controller and error is : ", error.message)
        return res.status(500).json({error: "Internal server error in Login Controller"});
    }
   
};

export const logout = (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true,
            maxAge: 0
        }
        res.clearCookie("jwt", options)
        res.status(200).json("Logout sucessfully");
    } catch (error) {
        res.status(400).json("Internal server error in Logout Controller", error.message);
    }
}