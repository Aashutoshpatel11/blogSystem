import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}) )
app.use( express.json() )
app.use( express.static( "public" ) )
app.use( express.urlencoded( {extended:true} ) )
app.use( cookieParser() )


// Routings

import { userRoute } from "./route/user.route.js"
import { blogRoute } from "./route/blog.route.js"
import { commentRoute } from "./route/comment.route.js"

app.use( "/api/v1/user", userRoute )
app.use( "/api/v1/blog", blogRoute )
app.use( "/api/v1/comment", commentRoute )

export {app}