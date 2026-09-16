import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const OrderHistory = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = axios.get(`${API_GATEWAY_URL}/api/v1/order/list`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${adminAccessToken}`
                }
            }
        )
        return list

    } catch (error: any) {
        throw new Error(error.message)
    }
}
