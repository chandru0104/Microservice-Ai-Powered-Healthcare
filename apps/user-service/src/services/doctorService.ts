import { sendMail } from "../kafkaProducer/producer"
import { docter } from "../utils/interfaces"
import { redis } from "../utils/redis"
import { Doctor } from "../models/doctorModel"
import bcrypt from "bcrypt"
import cloudinary from "../utils/cloudinary"


export const verifyOtpservice = async (email: string, otp: any) => {

    try {
        const getOtp: any = await redis.get(
            `email ${email}`,
        )

        const otpCompare = await bcrypt.compare(otp, getOtp.hashOtp)

        if (!otpCompare) {
            throw new Error("Invalid otp")
        }

        await Doctor.findOneAndUpdate({ email }, { is_verify: true })
        await redis.del(`email:${email}`)
    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const doctorAddService = async (data: docter, file: any) => {
    const { name, specialties, experience, place, price, email, register, password } = data

    const otp = Math.floor(10000 + Math.random() * 90000).toString()

    const salt = 10
    const hashOtp = await bcrypt.hash(otp, salt)

    await redis.setex(
        `email ${email}`,
        1000,
        JSON.stringify({ email, hashOtp })
    )
    sendMail(email, otp)

    let doctorProfile = ""

    if (file && file.path) {
        const profile = await cloudinary.uploader.upload(file.path, {
            folder: "doctor-profile"
        })
        doctorProfile = profile.secure_url
    }
    console.log(doctorProfile)

    const hashPassword = await bcrypt.hash(password,salt)

    const addDoctor = await Doctor.create({ name, specialties, experience, place, price, email, register, password:hashPassword, profile: doctorProfile })

    return addDoctor
}


export const doctorListService = async () => {
    try {
        const listData = await Doctor.find({ status: 1 }).select("-password")

        return listData

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const doctorUpdateService = async (id: String, data: docter, file: any) => {

    try {
        let updatedFile = ""
        if (file && file.path) {
            const filedata = await cloudinary.uploader.upload(file.path, {
                folder: "doctor-profile"
            })
            updatedFile = filedata.secure_url
        }
        const updateData = await Doctor.findByIdAndUpdate(id, { ...data, profile: updatedFile }, { runValidators: true, new: true })

        return updateData
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const doctorDeleteService = async (id: any) => {
    try {
        const doctorDelete = await Doctor.findByIdAndUpdate(id, { status: 0 })
        return doctorDelete
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const doctorProfileService = async (id: string) => {
    try {
        const doctorProfile = await Doctor.findById(id)

        return doctorProfile
    } catch (error: any) {
        throw new Error(error.message)
    }
}