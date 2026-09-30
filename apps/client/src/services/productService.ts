import axios from "axios"
import { 
    IProductPayload, 
    IProductUpdatePayload, 
} from "../models/productModel"

export * from "../models/productModel"

import { getErrorMessage } from "../models/errorHandler"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const OriginList = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/origin`, {
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

export const AddOrgin = async (name: string) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/origin`, { name }, {
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const productAdds = async (data: IProductPayload) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")

        const {
            name,
            description,
            price,
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
            files
        } = data

        const formData = new FormData()

        if (name) formData.append("name", name)
        if (description) formData.append("description", description)
        if (price !== undefined) formData.append("price", String(price))
        if (returnPolicy) formData.append("returnPolicy", returnPolicy)
        if (benefit) formData.append("benefit", benefit)
        if (expiryDate) formData.append("expiryOn", expiryDate)
        if (variant) formData.append("variant", variant)
        if (stock !== undefined) formData.append("stock", String(stock))
        if (brandId) formData.append("brandId", brandId)
        if (categoryId) formData.append("categoryId", categoryId)
        if (subcategoryId) formData.append("subcategoryId", subcategoryId)
        if (childCategoryId) formData.append("childCategoryId", childCategoryId)
        if (originId) formData.append("originId", originId)
        if (ageGroupId) formData.append("ageGroupId", ageGroupId)

        if (files && Array.isArray(files) && files.length > 0) {
            files.forEach((f: File | Blob) => formData.append("files", f))
        } else if (file) {
            formData.append("file", file as Blob | string)
        }

        const add = await axios.post(`${API_GATEWAY_URL}/api/v1/product/add`, formData, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return add
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const productList = async () => {
    try {
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/list`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const productUpdate = async (id: string, data: IProductUpdatePayload | IProductPayload) => {
    try {
        const {
            name,
            description,
            price,
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
            files
        } = data

        const formData = new FormData()

        if (name) formData.append("name", name)
        if (description) formData.append("description", description)
        if (price !== undefined) formData.append("price", String(price))
        if (returnPolicy) formData.append("returnPolicy", returnPolicy)
        if (benefit) formData.append("benefit", benefit)
        if (expiryDate) formData.append("expiryOn", expiryDate)
        if (variant) formData.append("variant", variant)
        if (stock !== undefined) formData.append("stock", String(stock))
        if (brandId) formData.append("brandId", brandId)
        if (categoryId) formData.append("categoryId", categoryId)
        if (subcategoryId) formData.append("subcategoryId", subcategoryId)
        if (childCategoryId) formData.append("childCategoryId", childCategoryId)
        if (originId) formData.append("originId", originId)
        if (ageGroupId) formData.append("ageGroupId", ageGroupId)

        if (files && Array.isArray(files) && files.length > 0) {
            files.forEach((f: File | Blob) => formData.append("files", f))
        } else if (file) {
            formData.append("file", file as Blob | string)
        }

        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/product/update/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return update
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const cartAdd = async (productId: string | number, quantity: number | string) => {
    const userAccessToken = localStorage.getItem("userAccessToken")
    try {
        const formData = new FormData()
        formData.append("productId", String(productId))
        formData.append("quantity", String(quantity))

        const cartPost = await axios.post(`${API_GATEWAY_URL}/api/v1/product/cart`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return cartPost
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const cartList = async () => {
    const userAccessToken = localStorage.getItem("userAccessToken")
    try {
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/product/cart`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const cartDelete = async (id: string) => {
    const userAccessToken = localStorage.getItem("userAccessToken")
    try {
        const cartDelete = await axios.delete(`${API_GATEWAY_URL}/api/v1/product/cart/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        })
        return cartDelete
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const cartUpdate = async (id: string, quantity: number | string) => {
    const userAccessToken = localStorage.getItem("userAccessToken")
    try {
        const formData = new FormData()
        formData.append("quantity", String(quantity))

        const cartUpdate = await axios.put(`${API_GATEWAY_URL}/api/v1/product/cart/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        })
        return cartUpdate
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}