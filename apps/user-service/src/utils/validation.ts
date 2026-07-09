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

export const doctorValidation = z.object({
    name:z.string(),
    specialties:z.string(),
    experience:z.string(),
    place:z.string(),
    price:z.number(),
    email:z.string(),
    register:z.string(),
    profile:z.string(),
    password:z.string(),
})