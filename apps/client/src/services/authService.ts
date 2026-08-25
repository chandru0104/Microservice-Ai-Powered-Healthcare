import { Login, UserRegister } from "../models/authModel"

import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const AuthLogin = async (data: Login) => {
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

        localStorage.setItem("temUserEmail", data.email)
        return Register.data
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const Otp = async (otp: number) => {
    try {


        const getUserEmail = localStorage.getItem("temUserEmail")
        const data = { otp, email }

        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/user/verify/otp`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        localStorage.removeItem("temUserEmail")
        return verfiy

    } catch (error: any) {
        throw new Error(error.message)
    }
}