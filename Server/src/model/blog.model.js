import mongoose, {Schema} from "mongoose";

//  title, content, tags, status

const blogSchema = new Schema(
    {
        title: {
            type: String
        },
        content: {
            type: String
        },
        status: {
            type: String,
            enum: ["draft", "published"]
        },
        tags: [
            {
                type: String
            }
        ],
        owner: {
            type: Schema.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Blog = mongoose.model( "Blog", blogSchema )