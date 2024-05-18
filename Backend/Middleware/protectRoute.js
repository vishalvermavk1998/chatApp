import jwt from "jsonwebtoken"
import User from "../models/user.models.js";

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
         
        if (!token) {
            return res.status(400).json({Error : "Unauthorized : Token not provided "})
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({Error : "Unauthorized : Invalid token "})
        }

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).json({Error : "User Not Found "})
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute : ", error);
        res.status(400).json("Internal server error")
    }
}

export default protectRoute;
