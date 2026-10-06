import { addOrderService, listOderService, listUserOderService } from "../services/orderService"
import { Request, Response } from "express"



export const addOrderController = async (req: Request, res: Response) => {
    try {

        const addOrder = await addOrderService(req.body)

        return res.status(201).json({
            success: true,
            message: "order placed successfully",
            data: addOrder
        })

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,

        })
    }
}


export const listOderController = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)

        const lisOrder = await listOderService(page, limit)

        return res.status(200).json({
            success: true,
            message: "Order listed",
            data: lisOrder
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })

    }
}



export const listUserOderController = async (req: any, res: Response) => {

    try {
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)

        const userId = req.user?.id || req.user?._id || req.user?.userId

        const userOrderList = await listUserOderService(userId, page, limit)

        return res.status(200).json({
            success: true,
            message: "Order listed",
            data: userOrderList
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}