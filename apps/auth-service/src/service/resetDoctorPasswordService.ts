import bcrypt from "bcrypt";
import { Doctor } from "../model/loginModel";
import { redis } from "../utils/redis";
import {validationError} from "../utils/errorHaddler"

export const resetPasswordDoctorService = async (
  email: string,
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    // Check required fields
    if (!email || !resetToken || !newPassword || !confirmPassword) {
      throw new validationError("Please fill all fields");
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      throw new validationError("Passwords do not match");
    }

    // Get token from Redis
    const data = await redis.get(`email:${email}`);

    if (!data) {
      throw new validationError("Reset token expired or not found");
    }


    // Compare token
    if (resetToken !== data) {
      throw new validationError("Invalid reset token");
    }

    // Find doctor
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new validationError("Doctor not found");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update only password field (avoids full validation)
    await Doctor.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    // Delete token from Redis 
    await redis.del(`email:${email}`);

    return "Password reset successfully";

  } catch (error: any) {
    throw new Error(error.message);
  }
};