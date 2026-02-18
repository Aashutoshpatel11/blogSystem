import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"

export const verifyJWT = async (req, res, next) => {
    const token = req.cookies.accessToken

    if( !token ){
        throw new Error("Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET )
    const user = await User.findById(decodedToken._id)
    
    if( !user ){
        throw new Error("invalid Access Token");
    }

    req.user = user
    next()
}