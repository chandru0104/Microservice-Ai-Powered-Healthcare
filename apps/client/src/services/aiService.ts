import axios from "axios"
import { SymptomsCheckData } from "../models/aiModel"



const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"



export const aiSymptomsCheck = async (data: SymptomsCheckData) => {
    try {
const userAccessToken = localStorage.getItem("userAccessToken")
        const post = await axios.post(`${API_GATEWAY_URL}/api/v1/ai/symptoms`, { data }, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }, withCredentials: true

        })
        return post
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}

export const medicalReportAnalyzer = async (data: File) => {
    try {
const userAccessToken = localStorage.getItem("userAccessToken")
        const formData = new FormData()
        formData.append("file", data)
        const post = await axios.post(`${API_GATEWAY_URL}/api/v1/ai/report`, formData, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "multipart/form-data"
            }, withCredentials: true
        })
        return post
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}


export const aiMedicine = async (data: File) => {
    try {
const userAccessToken = localStorage.getItem("userAccessToken")
        const formData = new FormData()
        formData.append("file", data)
        const post = await axios.post(`${API_GATEWAY_URL}/api/v1/ai/medicine`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${userAccessToken}`
            }, withCredentials: true
        })
        return post
    } catch (error: any) {
        console.log(error.message)
        return null
    }
}