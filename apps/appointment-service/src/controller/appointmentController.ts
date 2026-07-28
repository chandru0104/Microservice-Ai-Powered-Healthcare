import { addAppointmentService, listAppointmentService, userListAppointmentService } from "../service/appointmentService"
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

export const listAppointmentController = async (req: any, res: Response) => {
    try {
        const listAppointment = await listAppointmentService()

        return res.status(200).json({
            success: true,
            message: "Appointemnt listed successfully",
            data: listAppointment
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const userListAppointmentController = async (req: any, res: Response) => {
    try {

        const id = req.params.id
        const list = await userListAppointmentService(id)
        return res.status(200).json({
            success: true,
            message: "Appointemnt listed successfully",
            data: list
        })
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}