import jwt from 'jsonwebtoken';
import User from "../models/user.model.js"

const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.notrious_jwt
        if(!token) {
            return res.status(401).json({
                status:'fail',
                message: "Unautrized Error: No token found!"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        if(!decoded)
        {
            return res.status(401).json({
                status:'fail',
                message: "Unautorized Error: Invalid Token!"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                status:'fail',
                message: "User not found!"})
        }
        req.user = user;
        next();


    }catch(error){
        console.log("Error in protectRoutes: ", error.message)
        return res.status(401).json({
            status:'fail',
            message: "Internal server error"})
    }
}

export default protectRoute