
import { TestCategory } from "../model/testCategory"

import { category } from "../utils/interfaces"


export const addCategoryService = async (data: category) => {

    try {
        const { name, description } = data

        const addCategory = await TestCategory.create({ name, description })
        
        return addCategory
    } catch (error: any) {
        throw new Error(error.message)
    }

}

export const listCategoryService = async (page:number,limit:number) => {
    try {
        const pages = (page-1)*limit
        const categoryData = await TestCategory.find().skip(pages).limit(limit)

        return categoryData
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateCategoryService = async (id: string, data: category) => {
    try {

        const payload = { ...data }

        const updateList = await TestCategory.findByIdAndUpdate(id, payload, { runValidators: true, new: true })

        return updateList
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteCategoryService = async (id: string) => {
    try {

        await TestCategory.findByIdAndDelete(id)

    } catch (error: any) {
        throw new Error(error.message)
    }
}