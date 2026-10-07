import axios from "axios"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const paymentAdd = async (payload: any) => {
    try {
        const token = localStorage.getItem("userAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/payment/add`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const paymentVerfiy = async (payload:any)=>{
    try{
        const token = localStorage.getItem("userAccessToken")
        const verify = axios.post(`${API_GATEWAY_URL}/api/v1/payment/verify`,payload,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${token}`
                }
            })
            return verify
    }catch(error:any){
        throw new Error(error.message)
    }
}