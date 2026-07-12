import {refreshTokenDoctorService} from "../service/refreshTokenDoctorService"

import { Request,Response } from "express"

export const refreshTokenDoctorController = async(req:Request,res:Response)=>{

    try{
         const refreshToken = req.cookies.doctorRefreshToken

         if(!refreshToken){
            res.status(401).json({
                success:false,
                message:"Refresh token are expried"
            })
         }

         const accessToken = await refreshTokenDoctorService(refreshToken)

         return res.status(200).json({
            success:true,
            message :"Access token generated",
            accessToken
         })
    }catch(error:any){
       return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}