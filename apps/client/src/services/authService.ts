import { Login, UserRegister } from "../models/authModel"

import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const AuthUserLogin = async (data: Login) => {
    try {
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }

        const userLogin = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/user/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return userLogin.data

    } catch (error: any) {
        throw new Error(error.message)
    }
}
export const UserRegisters = async (data: UserRegister) => {
    try {
        if (!data.name || !data.email || !data.password) {
            throw new Error("Please fill all values")
        }

        const Register = await axios.post(`${API_GATEWAY_URL}/api/v1/user/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        localStorage.setItem("tempEmailUser", data.email)
        return Register.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const OtpUser = async (otp: number) => {
    try {


        const email = localStorage.getItem("tempEmailUser")
        const stringOtp = otp.toString()
        const payload = { otp: stringOtp, email }

        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/user/verify/otp`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (verfiy) {
            localStorage.removeItem("tempEmailUser")
        }

        return verfiy

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const OtpDoctor = async (otp: number) => {
    try {
        const email = localStorage.getItem("tempDoctorEmail")
        const payload = { otp: otp.toString(), email }
        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/doctors/doctor-verfiy`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        localStorage.removeItem("tempDoctorEmail")
        return verfiy
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const DoctorLogin = async (data: Login) => {
    try {
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }
        const loginData = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/doctor/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return loginData.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const DoctorRegisters = async (data: any) => {
    try {

        const Register = await axios.post(`${API_GATEWAY_URL}/api/v1/doctors/doctor-register`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const userEmail = data instanceof FormData ? data.get("email") : data.email
        if (!userEmail) {
            throw new Error("Email not found in request")
        }
        if (typeof window == 'object') {
            localStorage.setItem("tempDoctorEmail", String(userEmail))
        }
        return Register.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}