import bcrypt from "bcrypt";
import { Doctor } from "../model/loginModel";
import { redis } from "../utils/redis";

export const resetPasswordDoctorService = async (
  email: string,
  resetToken: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    // Check required fields
    if (!email || !resetToken || !newPassword || !confirmPassword) {
      throw new Error("Please fill all fields");
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Get token from Redis
    const data = await redis.get(`email:${email}`);

    if (!data) {
      throw new Error("Reset token expired or not found");
    }


    // Compare token
    if (resetToken !== data) {
      throw new Error("Invalid reset token");
    }

    // Find doctor
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    doctor.password = hashedPassword;
    await doctor.save();

    // Delete token from Redis
    await redis.del(`email:${email}`);

    return "Password reset successfully";

  } catch (error: any) {
    throw new Error(error.message);
  }
};