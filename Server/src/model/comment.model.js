import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String
        },
        owner: {
            type: Schema.ObjectId,
            ref: "User"
        },
        blogId: {
            type: Schema.ObjectId,
            ref: "Blog"
        }
    },
    {
        timestamps: true
    }
)

export const Comment = mongoose.model( "Comment", commentSchema )