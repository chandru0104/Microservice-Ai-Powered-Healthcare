import { getErrorMessage } from "../models/errorHandler"
import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const userAppointmentList = async (userId: string) => {
    try {
        const token = localStorage.getItem("userAccessToken")
        const res = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/user/${userId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return res
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}
