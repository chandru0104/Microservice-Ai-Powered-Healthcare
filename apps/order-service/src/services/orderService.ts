import { Order } from "../model/order"
import { OrderInterface } from "../utils/interfaces"
import { Product } from "../model/product"



export const addOrderService = async (data: OrderInterface) => {
    try {

        const { user, shippingAddress, items } = data

        let totalPrice = 0

        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product) {
                throw new Error("Product not found");
            }

            totalPrice += product.price * item.quantity
        }

        const addOrder = await Order.create({ user, shippingAddress, items, price: totalPrice as any })


        return addOrder

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const listOderService = async (page: number, limit: number) => {
    try {
        const skip = (page - 1) * limit
        const listOder = await Order.find().populate("items.product").skip(skip).limit(limit)

        return listOder

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const listUserOderService = async (user: any, page: number, limit: number) => {
    try {
        const skip = (page - 1) * limit
        const listUserOder = await Order.find(user).populate("items.product").skip(skip).limit(limit)

        if (!listUserOder) {
            return "No order"
        }

        return listUserOder
    } catch (error: any) {
        throw new Error(error.message)
    }
}
