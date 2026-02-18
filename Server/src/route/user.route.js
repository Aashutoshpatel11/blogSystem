import { Router } from "express";

const userRoute = Router()

import { registerUser, loginUser } from "../controller/user.controller.js";

userRoute.route('/register').post(registerUser)
userRoute.route('/login').post(loginUser)

export {
    userRoute
}