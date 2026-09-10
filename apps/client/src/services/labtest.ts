import axios from "axios"
import { addLabTestCategory } from "../models/lab"
import { addLabTest } from "../models/lab"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"


export const addLabTestlabCategory = (data: addLabTestCategory) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const add = axios.post(`${API_GATEWAY_URL}/api/v1/lab/category`, data, {
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

export const listLabTestlabCategory = () => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const list = axios.get(`${API_GATEWAY_URL}/api/v1/lab/category`, {
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

export const updateLabTestlabCategory = (id: string, data: addLabTestCategory) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const update = axios.put(`${API_GATEWAY_URL}/api/v1/lab/update/category/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return update

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteLabTestlabCategory = (id: string) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const deleteItem = axios.delete(`${API_GATEWAY_URL}/api/v1/lab/category/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return deleteItem

    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const addLabTests = (data: addLabTest) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const add = axios.post(`${API_GATEWAY_URL}/api/v1/lab/tests`, data, {
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

export const listLabTest = () => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const list = axios.get(`${API_GATEWAY_URL}/api/v1/lab/tests`, {
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

export const deletelabTest = (id: string) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const deleteItem = axios.put(`${API_GATEWAY_URL}/api/v1/lab/tests/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return deleteItem
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const UpdatelabTest = (data: string, id: string) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const update = axios.put(`${API_GATEWAY_URL}/api/v1/lab/tests/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return update
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const viewlabTest = (id: string) => {
    try {
        const adminAccessToekn = localStorage.getItem("adminAccessToken")
        const view = axios.get(`${API_GATEWAY_URL}/api/v1/lab/tests/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToekn}`
            }
        })
        return view
    } catch (error: any) {
        throw new Error(error.message)
    }
}