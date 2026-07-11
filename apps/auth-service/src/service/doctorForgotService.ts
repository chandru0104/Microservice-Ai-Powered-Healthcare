import { redis } from "../utils/redis"
import bcrypt from "bcrypt"
import { sendMail } from "../producer/emailProducerDoctor"

export const forgotPasswordService = async (data: any) => {
    try {

        const { email } = data
        const otp = Math.floor(100000 + Math.random() * 90000).toString()

        const salt = 10
        const hashOtp =await bcrypt.hash(otp, salt)

        await redis.setex(
            `email:${email}`,
            1000,
            hashOtp
        )

        sendMail(email, otp)

    } catch (error: any) {
        throw new Error(error.message)
    }
}