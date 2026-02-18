import { User } from "../model/user.model.js";
import { Blog } from "../model/blog.model.js";
import { Comment } from "../model/comment.model.js"

const postComment = async( req, res ) => {
    try {
        const user = req.user
        const {blogId} = req.params
        const {content} = req.body

        if(!blogId){
            throw new Error("Invalid Blog ID");
        }
        if(!content){
            throw new Error("Invalid comment content");
        }

        const comment = await Comment.create({
            content,
            owner: user._id,
            blogId
        })

        if(!comment){
        throw new Error("Error posting comment")
        }

        return res
        .status(201)
        .json({
            data: comment,
            message: "Comment Posted Successfully"
        }) 

    } catch (error) {
        throw new Error(error.message)
    }
}

const removeComment = async (req, res) => {
    try {
        const user = req.user
        const {commentId} = req.params

        if(!commentId){
            throw new Error("Invalid Blog ID");
        }

        const existingComment = await Comment.findById(commentId)
        if( !existingComment ){
            throw new Error("comment doesn't exists");
        }

        if( existingComment.owner.toString() !== user._id.toString() ){
            throw new Error("Current User is not the owner of this comment");
        }

        await Comment.findByIdAndDelete(commentId)

        return res
        .status(200)
        .json({
            data:{},
            message: "Comment Deleted Successfully"
        })


    } catch (error) {
        throw new Error(error.message);
    }
}

export {
    postComment,
    removeComment
}