import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export const dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.DB_URL as string)

        if (!db) {
            throw new Error("DB not connected")
        }
        console.log("Lab Test service DB connected")
    }
    catch (error: any) {
        console.log(error.message)
    }
}
