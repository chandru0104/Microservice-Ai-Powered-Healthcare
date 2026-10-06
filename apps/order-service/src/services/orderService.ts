import { Order } from "../model/order"
import { OrderInterface } from "../utils/interfaces"
import { Product } from "../model/product"
import { User } from "../model/user"
import { Category } from "../model/category"
import { SubCategory } from "../model/subCategory"
import { ChildCategory } from "../model/childCategory"
import { Origin } from "../model/origin"
import { Brand } from "../model/brand"
import { AgeGroup } from "../model/ageGroup"
import { validationError } from "../utils/errorHandler"

export const addOrderService = async (data: OrderInterface) => {
    try {

        const { user, shippingAddress, items } = data

        let totalPrice = 0

        const orderItems = []
        for (const item of items) {
            const prodId = item.product || (item as any).productId
            const product = await Product.findById(prodId)

            if (!product) {
                throw new validationError("Product not found");
            }

            totalPrice += product.price * item.quantity
            orderItems.push({
                product: prodId,
                quantity: item.quantity
            })
        }

        const addOrder = await Order.create({ user, shippingAddress, items: orderItems, price: totalPrice as any })

        return addOrder

    } catch (error: any) {
        throw new Error(error.message)
    }
}




export const listOderService = async (page?: number, limit?: number) => {
    try {
        const p = Number(page) > 0 ? Number(page) : 1;
        const l = Number(limit) > 0 ? Number(limit) : 50;
        const skip = (p - 1) * l;
        const listOder = await Order.find()
            .populate("user", "name email phone")
            .populate({
                path: "items.product",
                select: "name price image variant"
            })
            .skip(skip)
            .limit(l);

        return listOder;

    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const listUserOderService = async (userId: any, page?: number, limit?: number) => {
    try {
        const p = Number(page) > 0 ? Number(page) : 1;
        const l = Number(limit) > 0 ? Number(limit) : 50;
        const skip = (p - 1) * l;
        const query = userId ? { user: userId } : {};
        const listUserOder = await Order.find(query)
            .populate("user", "name email phone")
            .populate({
                path: "items.product",
                select: "name price image variant"
            })
            .skip(skip)
            .limit(l);

        if (!listUserOder) {
            throw new validationError("No order");
        }

        return listUserOder;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
