import { Doctor } from "../model/appoinmentShema";


export const createFcmTokenService = async (data: any) => {
    try {
        const { user, token } = data

        if (!user || !token) {
            throw new Error("Please provide all value")
        }

        await Doctor.findByIdAndUpdate(user, { fcmtoken: token }, { new: true, runValidators: true })

        return "Fcm token updated"

    } catch (error: any) {
        throw new Error(error.message)
    }
}