import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const orderAdd = async (id: any, qunt: any) => {

    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const userId = localStorage.getItem("userId")

        let userAddress = "No address provided"
        if (userId) {
            try {
                const profileRes = await axios.get(`${API_GATEWAY_URL}/api/v1/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${userAccessToken}`
                    }
                })
                if (profileRes?.data?.data?.address) {
                    userAddress = profileRes.data.data.address
                }
            } catch (err: any) {
                console.log(err.message)
            }
        }

        const payload = {
            user: userId,
            shippingAddress: userAddress,
            paymetStatus: "pending",
            items: [
                {
                    product: id,
                    productId: id,
                    quantity: Number(qunt) || 1
                }
            ]
        }

        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/order/add`, payload, {
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


export const orderListUser = async () => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/order/user`, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        })
        return list

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const orderListAdmin = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/order/list`, {
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