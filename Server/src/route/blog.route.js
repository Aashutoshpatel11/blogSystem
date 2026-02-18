import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import {allowedRole} from "../middleware/access.middleware.js"

const blogRoute = Router()

import { createBlog, modifyBlog, getBlog } from "../controller/blog.controller.js";

blogRoute.route('/create').post(verifyJWT, allowedRole("Writer", "Admin"), createBlog)
blogRoute.route('/modify/:blogId').post(verifyJWT, allowedRole("Writer", "Admin"), modifyBlog)
blogRoute.route('/get').get(verifyJWT, allowedRole("Writer","Reader", "Admin"), getBlog)

export {
    blogRoute
}