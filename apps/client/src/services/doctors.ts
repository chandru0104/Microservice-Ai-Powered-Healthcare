import { getErrorMessage } from "../models/errorHandler"
import axios from "axios"


const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const doctorList = async () => {
    try {
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/doctors/list`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}


export const doctorProfile = async (id: string) => {
    try {

        const profile = await axios.get(`${API_GATEWAY_URL}/api/v1/doctors/doctor-profile/${id}`)
        return profile
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}

export const doctorUpdate = async (id: string, data: any) => {
    try {
        const token = localStorage.getItem("doctorAccessToken")

        const formData = new FormData()

        formData.append("name", data.name)
        formData.append("email", data.email)
        formData.append("specialties", data.specialties)
        formData.append("experience", data.experience)
        formData.append("price", data.price)
        formData.append("place", data.place)
        if (data.profile instanceof File) {
            formData.append("profile", data.profile)
        }
        
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/doctors/doctor-update/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return update
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}


export const doctorDelete = async (id: string) => {
    try {
        const token = localStorage.getItem("doctorAccessToken")
        const del = axios.put(`${API_GATEWAY_URL}/api/v1/doctors/doctor-delete/${id}`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return del
    } catch (error: any) {
        throw new Error(getErrorMessage(error))
    }
}