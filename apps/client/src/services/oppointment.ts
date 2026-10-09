import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"


export const addOppointment = async (payload: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/add`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Beare ${userAccessToken}`

            }
        })
        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAllAppoinmentLits = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/list`, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`,
                "Content-Type": "application/json"
            }
        })
        return list

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUserAppointmentList = async (id: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const appointmentPaymentAdd = async (id: any, payload: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")

        const payment = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/payment/${id}`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return payment
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const verifyPayment = async (payload: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const verify = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/payment/verify`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return verify
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const paymentAllLsit = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/payment/history`, {
            headers: {
                "Content-Type": "apllication/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const paymentUserList = async (id: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/payment/history/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const fcmTokens = async (details: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const tokens = await axios.put(`${API_GATEWAY_URL}/api/v1/appointment/save-fcm-token`, details, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        })
        return tokens
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const videoCall = async (payload: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const call = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/video-call`, payload, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        })
        return call
    } catch (error: any) {
        throw new Error(error.message)
    }
}