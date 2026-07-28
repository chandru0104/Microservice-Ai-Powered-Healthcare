import { addAppointmentService } from "../service/appointmentService"
import { Request, Response } from "express"


export const addAppointmentController = async (req: Request, res: Response) => {
    try {

        const data = req.body
        const addAppointment = await addAppointmentService(data)

        return res.status(201).json({
            success: true,
            message: "Add appointemnt successfully",
            data: addAppointment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}