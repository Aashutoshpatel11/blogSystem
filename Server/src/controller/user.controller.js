import {User} from "../model/user.model.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body
    
        if( !name || !email || !password || !role ){
            throw new Error("Please provide all details")
        }
    
        const existingUser = await User.find({email})
        if(existingUser.length){
            throw new Error("user with same email already exists")
        }

        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const newUser = await User.create({
            name, 
            email, 
            password: hashedPassword,
            role
        })
    
        if(!newUser){
            throw new Error("Error registering new User")
        }
    
        return res
        .status(201)
        .json({
            data: newUser,
            message: "User Registered Successfully"
        })
    } catch (error) {
        console.log("Error Registering User");
        throw new Error(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if( !email || !password ){
            throw new Error("Please provide all details")
        }
    
        const existingUser = await User.findOne({email})
        if(!existingUser){
            throw new Error("User Not Exists");
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect){
            throw new Error("Incorrect Password");
        }

        const accessToken = jwt.sign(
            {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    
        const refreshToken = jwt.sign(
            {
                _id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    
        existingUser.refreshToken = refreshToken
        await existingUser.save()
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .cookie( "accessToken", accessToken , options )
        .cookie( "refreshToken", refreshToken , options )
        .status(200)
        .json({
            data: existingUser,
            message: "User Logged in Successfully"
        })
    } catch (error) {
        console.log("Error Logging in User ");
        throw new Error(error?.message);
    }
}

export {
    registerUser,
    loginUser
}