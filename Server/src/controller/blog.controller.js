import { User } from "../model/user.model.js";
import { Blog } from "../model/blog.model.js"

const createBlog = async(req, res) => {
    try {
        const {title, content, tags=[], status="draft"} = req.body
        if(!title || !content){
            throw new Error("Provide required details")
        }

        const user = req.user

        const blog = await Blog.create({
            title,
            content,
            tags,
            status,
            owner: user._id
        })

        if(!blog){
            throw new Error("Error creating a blog");
        }

        return res
        .status(201)
        .json(
            {
                data: blog,
                message: "Blog created successfully"
            }
        )

    } catch (error) {
        throw new Error(error.message);
        
    }
}
const modifyBlog = async(req, res) => {
    try {
        const user = req.user
        const {blogId} = req.params
        console.log("Blog ID ::", blogId);
        
        if(!blogId){
            throw new Error("Undefined Blog ID");
        }

        const {title, content, tags=[], status="draft"} = req.body
        if(!title || !content){
            throw new Error("Provide required details")
        }

        const existingBlog = await Blog.findById(blogId)
        if(!existingBlog){
            throw new Error("Blog doesn't exists");
        }

        if( user.role == "Writer" && existingBlog.owner !== user._id ){
            throw new Error("Unauthorized User");
        }

        existingBlog.title = title
        existingBlog.content = content
        existingBlog.tags = tags
        existingBlog.status = status 
        const updatedBlog = await existingBlog.save()

        return res
        .status(200)
        .json(
            {
                data: updatedBlog,
                message: "Blog Updated Successfully"    
            }
        )

    } catch (error) {
        throw new Error(error.message);
    }
}
const getBlog = async(req, res) => {
    try {
        const {search, page=1, limit=10} = req.query

        const blogToSkip = (Number(page)-1)*Number(limit)

        const blogs = await Blog.find({
            title: { $regex: search, $options: "i" }
            // status: "published"
        }).skip(blogToSkip).limit(Number(limit))

        return res
        .status(200)
        .json({
            data: blogs,
            message: "Blogs Fetched Successfully"
        })

    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    createBlog,
    modifyBlog,
    getBlog
}
