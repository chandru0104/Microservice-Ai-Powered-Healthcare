import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY || process.env.RAZORPAY_API_KEY || "rzp_test_TF2ZuOVH6kAxq8"

export const addOppointment = async (payload: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/add`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`

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

export const getDoctorAppointmentList = async (id: any) => {
    try {
        const doctorAccessToken = localStorage.getItem("doctorAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/doctor/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${doctorAccessToken}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const appointmentPaymentAdd = async (id: any) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")

        const payment = await axios.post(`${API_GATEWAY_URL}/api/v1/appointment/payment/${id}`,{},{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        const amount = payment?.data?.data?.amount
        const razorpayOrderId = payment?.data?.data?.id
        const receipt = payment?.data?.data?.receipt
        const options = {
            key: keyId,
            amount: amount*100,
            currency: "INR",
            name: 'Care Hub',
            description: 'Healthcare',
            order_id: razorpayOrderId,
            callback_url: 'http://localhost:3000/user-appointment',
            handler: async (response: any) => {
                try {
                    await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt,
                    })
                    if (typeof window === "object") {
                        window.location.href = "http://localhost:3000/user-appointment"
                    }
                } catch (error: any) {
                    throw new Error(error.message)
                }
            },
            prefill: {
                name: 'Chandru',
                email: 'chandrus0104@gmail.com',
                contact: '9900990090'
            },
            theme: {
                color: '#004097'
            }
        };

        if (typeof window !== "undefined" && window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Razorpay SDK is not loaded on window.");
        }
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

export const paymentDoctorList = async (id: any) => {
    try {
        const doctorAccessToken = localStorage.getItem("doctorAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/appointment/payment/history/doctor/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${doctorAccessToken}`
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