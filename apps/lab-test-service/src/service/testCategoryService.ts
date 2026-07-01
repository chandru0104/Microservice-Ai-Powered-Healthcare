
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

export const listCategoryService = async () => {
    try {
        const categoryData = await TestCategory.find({ status: 1 })

        return categoryData
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateCategoryService = async (id: string, data: category) => {
    try {

        const updateList = await TestCategory.findByIdAndUpdate(id, { data }, { new: true, runValidators: true })

        return updateList
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteCategoryService = async (id: string) => {
    try {

        await TestCategory.findByIdAndUpdate(id, { status: 0 }, { run: true, runvalidators: true })

    } catch (error: any) {
        throw new Error(error.message)
    }
}