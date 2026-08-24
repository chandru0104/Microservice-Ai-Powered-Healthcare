import { Login } from "../models/authModel"
import axios from "axios"


const API_GATEWAY_URL = process.env.API_GATEWAY_URL

export const AuthLogin = async (data: Login) => {

    try {
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }

        const userLogin = await axios.post(`http://localhost:5000/api/v1/auth/user/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return userLogin.data

    } catch (error: any) {
        throw new Error(error.message)
    }


}