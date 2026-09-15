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

        for (const item of items) {
            const product = await Product.findById(item.product)

            if (!product) {
                throw new validationError("Product not found");
            }

            totalPrice += product.price * item.quantity
        }

        const addOrder = await Order.create({ user, shippingAddress, items, price: totalPrice as any })


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
            .populate("user")
            .populate({
                path: "items.product",
                populate: [
                    { path: "subcategoryId" },
                    { path: "categoryId" },
                    { path: "childCategoryId" },
                    { path: "originId" },
                    { path: "brandId" },
                    { path: "ageGroupId" },
                ]
            })
            .skip(skip)
            .limit(l);

        return listOder;

    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const listUserOderService = async (user: any, page?: number, limit?: number) => {
    try {
        const p = Number(page) > 0 ? Number(page) : 1;
        const l = Number(limit) > 0 ? Number(limit) : 50;
        const skip = (p - 1) * l;
        const listUserOder = await Order.find(user)
            .populate("user")
            .populate({
                path: "items.product",
                populate: [
                    { path: "subcategoryId" },
                    { path: "categoryId" },
                    { path: "childCategoryId" },
                    { path: "originId" },
                    { path: "brandId" },
                    { path: "ageGroupId" },
                ]
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
