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



export const childCategoryAdd = async (name: string) => {
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


export const childCategoryList = async () => {
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

export const childCategoryUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/child-category/update/${id}`, { name }, {
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

export const childCategoryDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/child-category/delete/${id}`, {}, {
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



export const subCategoryAdd = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/sub-category`, { name }, {
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


export const subCategoryList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/sub-category`, {
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

export const subCategoryUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/sub-category/update/${id}`, { name }, {
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

export const subCategoryDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/sub-category/delete/${id}`, {}, {
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





export const productCategoryAdd = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/category`, { name }, {
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


export const productCategoryList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/category`, {
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

export const productCategoryUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/category/update/${id}`, { name }, {
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

export const productCategoryDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/category/delete/${id}`, {}, {
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

export const CategoryAdd = productCategoryAdd
export const categoryAdd = productCategoryAdd
export const categoryList = productCategoryList
export const categoryUpdate = productCategoryUpdate
export const categoryDelete = productCategoryDelete




export const brandAdd = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/brand`, { name }, {
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


export const brandList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/brand`, {
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

export const brandUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/brand/update/${id}`, { name }, {
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

export const brandDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/brand/delete/${id}`, {}, {
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





export const ageGroupAdd = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/age-group`, { name }, {
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


export const ageGroupList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/age-group`, {
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

export const ageGroupUpdate = async (id: string, name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/age-group/update/${id}`, { name }, {
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

export const ageGroupDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/age-group/delete/${id}`, {}, {
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



export const productAdds = async (data: any) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")

        const { name,
            description, price,
            returnPolicy,
            benefit,
            expiryDate,
            brandId,
            categoryId,
            subcategoryId,
            childCategoryId,
            originId,
            ageGroupId,
            variant,
            stock,
            file,
            files } = data
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", String(price))
        formData.append("returnPolicy", returnPolicy)
        formData.append("benefit", benefit)
        if (expiryDate) formData.append("expiryOn", expiryDate)
        formData.append("variant", variant)
        formData.append("stock", String(stock))
        formData.append("brandId", brandId)
        formData.append("categoryId", categoryId)
        formData.append("subcategoryId", subcategoryId)
        formData.append("childCategoryId", childCategoryId)
        formData.append("originId", originId)
        formData.append("ageGroupId", ageGroupId)
        if (files && Array.isArray(files) && files.length > 0) {
            files.forEach((f: File) => formData.append("files", f))
        } else if (file) {
            formData.append("file", file)
        }


        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/add`, formData, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return add
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const productList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/list`, {
            headers: {
                "Content-Type": "application/json",

            }
        })
        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const productView = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const view = await axios.get(`${API_GATEWAY_URL}/api/v1/product/view/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return view
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const productUpdate = async (id: string, data: any) => {
    try {

        const { name,
            description, price,
            returnPolicy,
            benefit,
            expiryDate,
            brandId,
            categoryId,
            subcategoryId,
            childCategoryId,
            originId,
            ageGroupId,
            variant,
            stock,
            file,
            files } = data
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("price", String(price))
        formData.append("returnPolicy", returnPolicy)
        formData.append("benefit", benefit)
        if (expiryDate) formData.append("expiryOn", expiryDate)
        formData.append("variant", variant)
        formData.append("stock", String(stock))
        formData.append("brandId", brandId)
        formData.append("categoryId", categoryId)
        formData.append("subcategoryId", subcategoryId)
        formData.append("childCategoryId", childCategoryId)
        formData.append("originId", originId)
        formData.append("ageGroupId", ageGroupId)
        if (files && Array.isArray(files) && files.length > 0) {
            files.forEach((f: File) => formData.append("files", f))
        } else if (file) {
            formData.append("file", file)
        }


        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/update/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const productDelete = async (id: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const del = await axios.put(`${API_GATEWAY_URL}/api/v1/product/delete/${id}`, {}, {
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