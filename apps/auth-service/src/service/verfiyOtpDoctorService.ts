import { redis } from "../utils/redis"
import bcrypt from "bcrypt"
import crypto from "crypto"
import {validationError} from "../utils/errorHaddler"

export const verfiyOtpDoctorService = async (email: string, userOtp: string) => {
     try {
          const hashOtp = await redis.get(
               `email:${email}`,
          ) as string

          if (!hashOtp) {
               throw new validationError("OTP expired or not found");
          }
          const verfiyOtp = await bcrypt.compare(userOtp, hashOtp)

          if (!verfiyOtp) {
               throw new validationError("Invalid OTP");
          }

          const resetToken = crypto.randomBytes(32).toString("hex")
          await redis.del(`email:${email}`)
          await redis.setex(`email:${email}`, 1000,resetToken)


          return resetToken

     } catch (error: any) {
          throw new Error(error.message)
     }
}