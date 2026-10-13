import dotenv from "dotenv"
import { Appointment } from "../model/appoinmentShema"

dotenv.config()

export const videoCallService = async (appointmentId: string) => {

    if (!appointmentId) {
        throw new Error("Please provied appointment ID")
    }

    const appointment = await Appointment.findById(appointmentId).populate(["doctor", "user"])

    if (!appointment) {
        throw new Error("Appointment not found")
    }

    const roomName = `Appointment_${appointmentId}`
    const domain = process.env.JITSI_DOMAIN || "meet.jit.si"
    const meetUrl = `https://${domain}/${roomName}`

    const doctor: any = appointment.doctor
    const user: any = appointment.user

    return {
        roomName,
        domain,
        meetUrl,
        appointmentId: appointment._id,
        date: appointment.date,
        time: appointment.time,
        doctorName: doctor?.name || "",
        doctorEmail: doctor?.email || "",
        doctorSpecialties: doctor?.specialties || "",
        patientName: user?.name || "",
        patientEmail: user?.email || "",
        fees: appointment.fees,
        payment: appointment.payment
    }
}