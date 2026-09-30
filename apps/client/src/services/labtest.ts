import axios from "axios"
import { addLabTestCategory, addLabTest } from "../models/lab"
import { getErrorMessage } from "../models/errorHandler"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const addLabTestlabCategory = async (data: addLabTestCategory) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/lab/category`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return add
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const listLabTestlabCategory = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/lab/category`, {
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

export const updateLabTestlabCategory = async (id: string, data: addLabTestCategory) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/lab/update/category/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const deleteLabTestlabCategory = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const deleteItem = await axios.delete(`${API_GATEWAY_URL}/api/v1/lab/category/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return deleteItem
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const addLabTests = async (data: addLabTest) => {
    try {
        const { name, categoryId, price, sampleType, gender, ageGroup, reportDelivery, address, description, authorDetailsId } = data
        const prices = Number(price)
        const payload = { name, categoryId, price: prices, sampleType, gender, ageGroup, reportDelivery, address, description, authorDetailsId }
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/lab/tests`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return add
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const listLabTest = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/lab/tests`, {
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

export const deletelabTest = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const deleteItem = await axios.put(`${API_GATEWAY_URL}/api/v1/lab/tests/delete/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            },
            withCredentials: true
        })
        return deleteItem
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UpdatelabTest = async (data: addLabTest, id: string | number) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const { name, categoryId, price, sampleType, gender, ageGroup, reportDelivery, address, description, authorDetailsId } = data
        const prices = Number(price)
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/lab/tests/${id}`, { name, categoryId, price: prices, sampleType, gender, ageGroup, reportDelivery, address, description, authorDetailsId }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const viewlabTest = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const view = await axios.get(`${API_GATEWAY_URL}/api/v1/lab/tests/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return view
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}