import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string)

        console.log("Payment DB connected")
    } catch (error: any) {
        throw new Error(error.message)
    }
}