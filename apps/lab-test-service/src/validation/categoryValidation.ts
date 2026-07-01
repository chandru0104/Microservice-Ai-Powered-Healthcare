import {z} from "zod"

export const categoryValidation = z.object({
      name:z.string(),
      description:z.string()
})
