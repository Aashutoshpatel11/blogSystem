import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DBNAME}`)
        console.log( "DB connected successfully :: Hosted at :: ", connection.connection.host );

    } catch (error) {
        console.log("Error connecting to DB:", error);
        
    }
}

export default connectDB