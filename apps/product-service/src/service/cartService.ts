import { Cart } from "../model/cartModel"


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
        const cartList = await Cart.find({ userId }).populate(["productId", "quantity"])
        return cartList
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