"use client"

import { userRefreshToken, doctorRefreshToken } from "../services/authService"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const usePath = usePathname()
    useEffect(() => {
        const refreshToken = async () => {
            const userRole = localStorage.getItem("userRole");
            const doctorRole = localStorage.getItem("doctorRole");
            try {
                if (userRole === "user") {
                    const res = await userRefreshToken()
                    const token = res?.data?.accessToken
                    if (token) {
                        localStorage.setItem("userAccessToken", token)
                    }

                } else if (doctorRole === "doctor") {
                    const res = await doctorRefreshToken()
                    const token = res?.data?.accessToken
                    if (token) {
                        localStorage.setItem("doctorAccessToken", token)
                    }
                }
            } catch (error: any) {
                console.log(error.message)
            }

        }
        refreshToken()
    }, [usePath])
    return <>{children}</>
}   