import { z } from "zod"


export const orderValidation = z.object({
    user: z.string(),
    paymetStatus: z.string(),
    shippingAddress: z.string(),
    items: z.array(
        z.object({
        productId: z.string(),
        quantity: z.number().min(1)
    })
    )
})