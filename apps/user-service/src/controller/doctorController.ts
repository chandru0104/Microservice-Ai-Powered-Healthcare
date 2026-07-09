
import { doctorAddService, doctorListService, verifyOtpservice, doctorUpdateService, doctorDeleteService,doctorProfileService } from "../services/doctorService"


import { Request, Response } from "express";

export const doctorAddController = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const file = req.file
        const user = await doctorAddService(data, file);

        res.status(201).json({
            success: true,
            message: "User added successfully",
            data: user,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message,
        });
    }
};


export const verifyOtpController = async (req: Request, res: Response) => {

    try {

        const { email, otp } = req.body

        await verifyOtpservice(email, otp)

        res.status(200).json({
            success: true,
            message: "OTp verify successfully",
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message,
        });
    }
}

export const listDoctorController = async (req: Request, res: Response) => {
    try {
        const listData = await doctorListService()

        res.status(200).json({
            success: true,
            message: "Doctor listed successfully",
            data: listData
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message,
        });
    }
}


export const doctorUpdateController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body
        const file = req.file

        const updateData = await doctorUpdateService(id, data, file)

        res.status(201).json({
            success: false,
            message: "Doctor updated successfully",
            data: updateData
        })

    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message,
        });
    }
}

export const doctorDeleteController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        await doctorDeleteService(id)

        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully"
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            mesaage: error.message,
        });
    }
}

export const doctorProfileController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const profileDoctor =await doctorProfileService(id)

        res.status(200).json({
            success: true,
            message: "Doctor profile",
            data: profileDoctor
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message:error.message,
        })
    }
}