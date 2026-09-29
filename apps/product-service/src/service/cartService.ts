import { Cart } from "../model/cartModel"
import { Product } from "../model/productModel"


export const cartAddService = async (productId: string, quantity: number, userId: string) => {
    try {

        const checkCart = await Cart.findOne({ productId, userId })

        if (checkCart) {
            checkCart.quantity += quantity
            return await checkCart.save()
        }
        const cartAdd = (await Cart.create({ productId, quantity, userId }))
        return cartAdd
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const cartListService = async (userId: string) => {
    try {
        const cartList = await Cart.find({ userId }).populate("productId").lean()

        let totalCartPrice = 0
        let totalCartQuantity = 0

        const items = cartList.map((item: any) => {
            const price = typeof item.productId === "object" && item.productId !== null
                ? (Number(item.productId.price) || 0)
                : 0
            const quantity = Number(item.quantity) || 0
            const itemTotalPrice = price * quantity

            totalCartPrice += itemTotalPrice
            totalCartQuantity += quantity

            return {
                ...item,
                itemTotalPrice
            }
        })

        return {
            items,
            totalCartPrice,
            totalCartQuantity
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const cartDeleteService = async (id: string) => {
    try {

        await Cart.findByIdAndDelete(id)

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const cartEditService = async (cartId: string, quantity: any) => {
    try {

        const cart = await Cart.findById(cartId) 


        if (!cart) {
            throw new Error("Cart not found")
        }
        cart.quantity = quantity
        return await cart.save()


    } catch (error: any) {
        throw new Error(error.message)
    }
}