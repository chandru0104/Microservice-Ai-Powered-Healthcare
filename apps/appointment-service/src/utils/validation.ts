import { z } from "zod"

export const appointmentValidation = z.object({
    doctor: z.string(),
    date: z.date(),
    time: z.string(),
    day: z.string(),
    user: z.string(),
    phone: z.number(),
    gender: z.enum(["Male", "Female" ,"Not to say"]),
    termsCondition: z.boolean(),
    fees: z.number()

})
