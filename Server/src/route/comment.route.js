import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import {allowedRole} from "../middleware/access.middleware.js"

const commentRoute = Router()

import { postComment, removeComment } from "../controller/comment.controller.js";

commentRoute.route('/post/:blogId').post(verifyJWT, allowedRole("Writer", "Admin", "Reader"), postComment)
commentRoute.route('/remove/:commentId').post(verifyJWT, allowedRole("Writer", "Admin", "Reader"), removeComment)

export {
    commentRoute
}