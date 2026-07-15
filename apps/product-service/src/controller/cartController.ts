import { cartAddService, cartListService, cartDeleteService, cartEditService } from "../service/cartService"
import { Response, Request } from "express"

export const cartAddController = async (req: any, res: Response) => {
    try {
        const userId = req.user?.id || req.user?._id

        // 1. Correctly extract the properties from req.body
        const { productId, quantity } = req.body

        // 2. Adjust the validation check since they are now separate values
        if (!productId || !quantity) {
            throw new Error("Please select product and quantity")
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }

        // 3. Match the service argument order: (productId, quantity, userId)
        const addCart = await cartAddService(productId, Number(quantity), userId)

        return res.status(201).json({
            success: true,
            message: "Cart added successfully",
            data: addCart
        })

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const cartListController = async (req: any, res: Response) => {
    try {
        const userId = req.user?.id || req.user?._id
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not authenticated"
            })
        }
        const listCart = await cartListService(userId)
        return res.status(200).json({
            success: true,
            message: "Cart listed successfully",
            data: listCart
        })
    }
    catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const cartDeleteController = async (req: Request, res: Response) => {
    try {

        const cartId = req.params.id
        await cartDeleteService(cartId)

        return res.status(204).json({
            success: true,
            message: "Cart removed"
        })

    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const cartEditController = async (req: Request, res: Response) => {
    try {

        const cartId = req.params.id
        const { quantity } = req.body

        const editCart = await cartEditService(cartId, quantity)

        return res.status(201).json({
            success: true,
            message: "Cart edited",
            data: editCart

        })

    } catch (error: any) {

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

