import { doctorLoginService } from "../service/doctorLoginServices"


export const doctorLoginController = async (req: any, res: any) => {
    try {

        const data = req.body
        const login = await doctorLoginService(data)

        res.cookie("doctorRefreshToken", login.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })

        const { id, role, name, email, accessToken } = login

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            data: { id, role, name, email, accessToken }
        })
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}