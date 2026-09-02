import axios from "axios"
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const OriginList = async () => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/origin`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const AddOrgin = async (name: string) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/origin`, JSON.stringify({ name }), {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}