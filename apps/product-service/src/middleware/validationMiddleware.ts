import { Request, Response, NextFunction } from "express"

import { z } from "zod"

export const ValidationMiddleware = (shema: z.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = shema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: result.error.flatten()
            })
        }
        req.body = result.data
        next()
    }


}