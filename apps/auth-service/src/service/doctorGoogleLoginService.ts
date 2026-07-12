import { Doctor } from "../model/loginModel"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { client } from "../utils/googleLogin"
dotenv.config()

interface googleUser {
    code: string,
    role: string
}

// Keep these inside or cast them cleanly. 
// It's safer to ensure they exist before signing.
const Access = process.env.ACCESS_SECRET_KEY || ""
const Refresh = process.env.REFRESH_SECRET_KEY || ""

export const doctorGoogleLoginDoctor = async (data: googleUser) => {
    try {
        const { code, role } = data

        if (!code) {
            throw new Error("Authorization code is required") 
        }

        const { tokens } = await client.getToken(code)

        if (!tokens.id_token) {
            throw new Error("Invalid or missing Google ID token")
        }

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        const payload = ticket.getPayload() // Removed unnecessary await (getPayload is synchronous)

        if (!payload) {
            throw new Error("Invalid Google Token payload")
        }
        
        const { name, picture, sub, email } = payload // Note: Google uses 'picture', not 'profile' for the image URL

        // 1. Check if the doctor already exists by their unique google_id or email
        let user = await Doctor.findOne({ 
            $or: [{ google_id: sub }, { email: email }] 
        })

        // 2. If they don't exist, create a new record (Sign Up)
        if (!user) {
            user = await Doctor.create({
                name: name,
                profile: picture, // Mapping Google's 'picture' property
                email: email,
                google_id: sub,
                role: role // Assigning the role passed from the frontend
            })
        } else {
            // Optional: Update their profile picture or name if it changed on Google
            user.name = name || user.name
            user.profile = picture || user.profile
            await user.save()
        }

        // 3. Generate JWTs using the fetched or newly created user's data
        const accessToken = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            Access,
            { expiresIn: "1h" }
        )

        const refreshToken = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            Refresh,
            { expiresIn: "7d" }
        )

        return {
            user,
            accessToken,
            refreshToken
        }
        
    } catch (error: any) {
        // Forward the original error message cleanly
        throw new Error(error.message || "Authentication failed")
    }
}