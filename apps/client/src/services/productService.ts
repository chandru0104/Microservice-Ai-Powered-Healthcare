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
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/origin`, { name }, {
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

export const UpdateOrigin = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/origin/update/${id}`, { name }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const DeleteOrigin = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/origin/delete/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return del
    } catch (error: any) {
        throw new Error(error.message)
    }
}



export const CategoryAdd = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/child-category`, { name }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const categoryList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/child-category`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const categoryUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/child-category/update/${id}`, { name }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    }catch(error:any){
        throw new Error(error.message)
    }
}

export const categoryDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/child-category/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return del
    }catch(error:any){
        throw new Error(error.message)
    }
}