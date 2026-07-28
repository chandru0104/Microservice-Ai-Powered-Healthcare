import razorpay from "razorpay"
import dotenv from "dotenv"

dotenv.config()

export const Payment = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})