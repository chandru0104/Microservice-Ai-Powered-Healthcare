import { Doctor } from "../model/loginModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {validationError} from "../utils/errorHaddler"


interface doctorAuth {
    email: string,
    password: string
}

export const doctorLoginService = async (data: doctorAuth) => {
    try {
        const { email, password } = data

        // Case-insensitive email lookup
        const doctor = await Doctor.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } })

        if (!doctor) {
            throw new validationError("Email not found")
        }

        if (!doctor.is_approved) {
            throw new validationError("Your account is pending admin approval")
        }

        if (!doctor.is_active) {
            throw new validationError("Your account has been deactivated")
        }

        const comparePassword = await bcrypt.compare(password, doctor.password as string)

        if (!comparePassword) {
            throw new validationError("Invalid password")
        }

        const accessToken = jwt.sign({ id: doctor.id, role: doctor.role, name: doctor.name, email: doctor.email }, process.env.ACCESS_SECRET_KEY as string, { expiresIn: "1hr" })
        const refreshToken = jwt.sign({ id: doctor.id, role: doctor.role, name: doctor.name, email: doctor.email }, process.env.REFRESH_SECRET_KEY as string, { expiresIn: "1hr" })

        return { id: doctor.id, role: doctor.role, name: doctor.name, email: doctor.email, accessToken, refreshToken }

    } catch (error: any) {
        throw new Error(error.message)
    }
}