import { Request, Response } from "express"
import { addCategoryService, listCategoryService, updateCategoryService, deleteCategoryService } from "../service/testCategoryService"



export const addCategoryController = async (req: Request, res: Response) => {
    try {
        const responseData = await addCategoryService(req.body)

        res.status(201).json({
            success: true,
            message: "Lab Category  add successfully",
            data: responseData
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const listCategoryController = async (req: any, res: Response) => {
    try {
        const responseData = await listCategoryService()

        res.status(200).json({
            success: true,
            message: "Lab Category  listed",
            data: responseData
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            messgae: error.message,
        })
    }
}


export const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body
        const responseData = await updateCategoryService(id, data)

        res.status(201).json({
            success: true,
            message: "Lab Category  updated",
            data: responseData
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const responseData = await deleteCategoryService(id)

        res.status(201).json({
            sucess: true,
            message: "Lab Category updated",
            data: responseData
        })
    } catch (error: any) {
        res.status(400).json({
            sucess: false,
            message: error.message
        })
    }
}