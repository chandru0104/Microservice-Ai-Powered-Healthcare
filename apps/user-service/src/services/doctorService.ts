import { sendMail } from "../kafkaProducer/producer"
import { docter } from "../utils/interfaces"
import { redis } from "../utils/redis"
import { Doctor } from "../models/doctorModel"
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary"
import { validationError } from "../utils/errorHandler"

export const verifyOtpservice = async (email: string, otp: any) => {

    try {
        const raw: any = await redis.get(`email:${email}`)

        // null check — OTP expired or never stored
        if (!raw) {
            throw new validationError("OTP expired or not found. Please register again.")
        }


        // raw IS the hashOtp string directly (stored as plain bcrypt hash)
        const hashOtp: string = raw

        console.log("hashOtp from Redis:", hashOtp)

        const otpCompare = await bcrypt.compare(otp, hashOtp)

        if (!otpCompare) {
            throw new validationError("Invalid OTP. Please try again.")
        }

        await Doctor.findOneAndUpdate({ email }, { is_verify: true })
        await redis.del(`email:${email}`)

    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const doctorAddService = async (data: docter, file: Express.Multer.File) => {
    const { name, specialties, experience, place, price, email, register, password } = data

    const otp = Math.floor(10000 + Math.random() * 90000).toString()

    const salt = 10
    const hashOtp = await bcrypt.hash(otp, salt)

    await redis.setex(
        `email:${email}`,
        300,
         hashOtp
    )
    await sendMail(email, otp)

    let doctorProfile = ""

    if (file && file.path) {
        const profile = await cloudinary.uploader.upload(file.path, {
            folder: "doctor-profile"
        })
        doctorProfile = profile.secure_url
    }

    const hashPassword = await bcrypt.hash(password, salt)

    const addDoctor = await Doctor.create({ name, specialties, experience, place, price, email, register, password: hashPassword, profile: doctorProfile })

    return addDoctor
}


export const doctorListService = async (page: any, limit: any) => {
    try {
        const query = { status: 1, is_active: true }
        if (page && limit) {
            const pageNum = parseInt(page) || 1
            const limitNum = parseInt(limit) || 10
            const skip = (pageNum - 1) * limitNum
            return await Doctor.find(query).select("-password").skip(skip).limit(limitNum)
        }

        const listData = await Doctor.find(query).select("-password")
        return listData

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const doctorUpdateService = async (id: String, data: docter, file: Express.Multer.File) => {

    try {
        const updatePayload: any = { ...data };
        if (file && file.path) {
            const filedata = await cloudinary.uploader.upload(file.path, {
                folder: "doctor-profile"
            })
            updatePayload.profile = filedata.secure_url
        } else {
            // Do not overwrite profile with empty string if no new file was uploaded
            delete updatePayload.profile;
        }
        const updateData = await Doctor.findOneAndUpdate({ _id: id, status: 1, is_active: true }, updatePayload, { runValidators: true, new: true })
        if (!updateData) {
            throw new validationError("Doctor not found or account has been deleted")
        }
        return updateData
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const doctorDeleteService = async (id: string) => {
    try {
        const doctorDelete = await Doctor.findByIdAndUpdate(id, { status: 0, is_active: false }, { new: true })
        return doctorDelete
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const doctorProfileService = async (id: string) => {
    try {
        const doctorProfile = await Doctor.findById(id).select("-password")

        if (!doctorProfile || doctorProfile.status === 0 || !doctorProfile.is_active) {
            throw new validationError("Doctor not found or account has been deleted")
        }

        return doctorProfile
    } catch (error: any) {
        throw new Error(error.message)
    }
}