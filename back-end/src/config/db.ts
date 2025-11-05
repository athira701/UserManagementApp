import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}, DB: ${conn.connection.name}`);
    } catch (error) {
        console.log("MongoDB connection failed",error);
        process.exit(1);
    }
}

export default connectDB;
