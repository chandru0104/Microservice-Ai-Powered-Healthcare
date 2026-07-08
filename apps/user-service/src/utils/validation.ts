import { z } from "zod"

export const userValidation = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    otp: z.string()
})
export const userUpdateValidation = z.object({
    name: z.string(),
    email: z.string(),
})