import axios from "axios"
import { getErrorMessage } from "../models/errorHandler"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const OrderHistory = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/order/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const userOrderList = async () => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/order/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

