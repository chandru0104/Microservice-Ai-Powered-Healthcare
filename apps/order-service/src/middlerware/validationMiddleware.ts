import {z} from "zod"
import { NextFunction, Response } from "express"


export const validationMiddlerware = (data:z.ZodType)=>{
    return (req:any,res:Response,next:NextFunction)=>{
        const check = data.safeParse(req.body)

        if(!check){
             res.status(401).json({
                success:false,
                message :"Please provide all value properly"
             })
        }
        next()
    }
}