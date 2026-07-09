import { RequestHandler } from "express";
import { z } from "zod";

export const validationMiddleware =
    (schema: z.ZodType): RequestHandler =>
        (req, res, next) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                res.status(400).json({
                    message: result.error.flatten(),
                });
                return;
            }

            req.body = result.data;
            next();
        };

export const doctorValidationMiddleware =(shema:z.ZodType):RequestHandler=>{
    return (req,res,next)=>{

        const result=shema.safeParse(req.body)

        if(!result.success){
            res.status(400).json({
                success:true,
                message:result.error.flatten()
            })

            req.body= result.data

            next()
        }
    }
}