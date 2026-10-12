import { Appointment } from "../model/appoinmentShema"

interface Appoinment {
    doctor: string,
    date: Date,
    time: string,
    user: string,
    phone: number,
    fees: number
}

export const addAppointmentService = async (data: Appoinment) => {
    try {
        const { doctor, date, time, user, phone, fees } = data

        if (!doctor || !date || !time || !user || !phone || !fees) {
            throw new Error("Fill all require fileds")
        }

        const addAppointmentService = await Appointment.create({ doctor, date, time, user, phone, fees })

        return addAppointmentService

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const listAppointmentService = async () => {
    try {
        const list = await Appointment.find().populate(["doctor", "user"])

        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const userListAppointmentService = async (data: string) => {
    try {
        if (!data) {
            throw new Error("Please pass the user id")
        }
        const list = await Appointment.find({user:data}).populate(["doctor", "user"])

        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const doctorListAppointmentService = async (doctorId: string) => {
    try {
        if (!doctorId) {
            throw new Error("Please pass the doctor id")
        }
        const list = await Appointment.find({ doctor: doctorId }).populate(["doctor", "user"])

        return list
    } catch (error: any) {
        throw new Error(error.message)
    }
}