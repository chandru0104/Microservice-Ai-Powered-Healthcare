import { Appointment } from "../model/appoinmentShema"

interface Appoinment {
    doctor: string,
    date: Date,
    time: string,
    day: string,
    user: string,
    phone: number,
    gender: "Male" | "Female" | "Not to say",
    termsCondition: boolean,
    fees: number
}

export const addAppointmentService = async (data: Appoinment) => {
    try {
        const { doctor, date, time, day, user, phone, gender, termsCondition, fees } = data

        if (!doctor || !date || !time || !day || !user || !phone || !gender || !termsCondition || !fees) {
            throw new Error("Fill all require fileds")
        }

        const addAppointmentService = await Appointment.create({ doctor, date, time, day, user, phone, gender, termsCondition, fees })

        return addAppointmentService
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}