import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const dbConnected = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string)
        console.log("Order db connected")
    } catch (error: any) {
        throw new Error(error.message)
    }
}