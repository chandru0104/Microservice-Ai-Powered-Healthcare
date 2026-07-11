import { redis } from "../utils/redis"
import bcrypt from "bcrypt"
import crypto from "crypto"

export const verfiyOtpDoctorService = async (email: string, userOtp: string) => {
     try {
          const hashOtp = await redis.get(
               `email:${email}`,
          ) as string

          if (!hashOtp) {
               throw new Error("OTP expired or not found");
          }
          const verfiyOtp = await bcrypt.compare(userOtp, hashOtp)

          if (!verfiyOtp) {
               throw new Error("Invalid OTP");
          }

          const resetToken = crypto.randomBytes(32).toString("hex")
          await redis.del(`email:${email}`)
          await redis.setex(`email:${email}`, 1000, JSON.stringify({ token: resetToken }))


          return resetToken

     } catch (error: any) {
          throw new Error(error.message)
     }
}