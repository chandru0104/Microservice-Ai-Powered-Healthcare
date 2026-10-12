import { z } from "zod"

export const appointmentValidation = z.object({
    doctor: z.string(),
    date: z.string(),
    time: z.string(),
    user: z.string(),
    phone: z.number(),
    fees: z.number()
})
