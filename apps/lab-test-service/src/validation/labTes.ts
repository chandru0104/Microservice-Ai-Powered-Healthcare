import {z} from "zod"

export const labTestValidation = z.object({
       name:z.string(),
       description:z.string(),
       categoryId:z.string(),
       sampleType:z.string(),
       gender:z.string(),
       ageGroup:z.string(),
       reportDelivery:z.string(),
       price:z.number(),
       address:z.string()

})