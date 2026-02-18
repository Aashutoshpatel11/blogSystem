import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
            unique: true
        },
        role: {
            type: String,
            enum: ["Writer", "Reader", "Admin"]
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model( "User", userSchema )