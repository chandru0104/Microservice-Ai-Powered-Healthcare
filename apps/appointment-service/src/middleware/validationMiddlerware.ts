import { Request, Response, NextFunction } from "express"

import { z } from "zod"

export const appointmentValidationMiddleware = (shema: z.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction): void => {

        const result = shema.safeParse(req.body)

        if (!result.success) {
            res.status(400).json({
                success: false,
                message: result.error.flatten()
            })
            return
        }
        req.body = result.data
        next()
    }


}