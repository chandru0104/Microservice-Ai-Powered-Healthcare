import {resetPasswordDoctorService} from "../service/resetDoctorPasswordService"
import { Request,Response } from "express"

export const resetPassowrdDoctorController = async(req:Request,res:Response)=>{
    try{
        const {email, resetToken, newPassword, confirmPassword } = req.body;
      const resetPassword =  await resetPasswordDoctorService(email, resetToken, newPassword, confirmPassword)

      return res.status(201).json({
        success:true,
        message:resetPassword
      })

    }catch(error:any){
      return res.status(400).json({
               success:false,
               message:error.message
      })
    }
}