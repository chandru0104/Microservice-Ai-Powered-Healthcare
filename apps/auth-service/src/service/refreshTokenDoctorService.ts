import jwt from "jsonwebtoken"
import doenv from "dotenv"
doenv.config()

const refreshKey = process.env.REFRESH_SECRET_KEY as string

interface accessTokenDetails {
    id: string,
    name: string,
    role: string
}

export const refreshTokenDoctorService = async (token: any) => {
    try {

        const refreshToken = jwt.verify(token, refreshKey) as accessTokenDetails

        if (!refreshToken) {
            throw new Error("Invalid refresh token")
        }

        const accessToken = jwt.sign({ id: refreshToken.id, name: refreshToken.name, role: refreshToken.role }, refreshKey, { expiresIn: "1hr" })

        return accessToken

    } catch (error: any) {
        throw new Error(error.message)
    }
}