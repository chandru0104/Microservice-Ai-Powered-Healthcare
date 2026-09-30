import { 
    Login, 
    UserRegister, 
    DoctorRegister, 
    ResetPassword, 
    ResetPasswordDoctor, 
    ForgotEmail, 
    ForgotOtp, 
    GoogleAuthPayload 
} from "../models/authModel"
import { getErrorMessage } from "../models/errorHandler"
import axios from "axios"

export * from "../models/authModel"

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || process.env.API_GATEWAY_URL || "http://localhost:5000"

export const AuthUserLogin = async (data: Login) => {
    try {
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }

        const userLogin = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/user/login`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return userLogin.data

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UserRegisters = async (data: UserRegister) => {
    try {
        if (!data.name || !data.email || !data.password) {
            throw new Error("Please fill all values")
        }

        const Register = await axios.post(`${API_GATEWAY_URL}/api/v1/user/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        localStorage.setItem("tempEmailUser", data.email)
        return Register.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const OtpUser = async (otp: number | string) => {
    try {
        const email = localStorage.getItem("tempEmailUser")
        const stringOtp = otp.toString()
        const payload = { otp: stringOtp, email }

        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/user/verify/otp`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (verfiy) {
            localStorage.removeItem("tempEmailUser")
        }

        return verfiy

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const OtpDoctor = async (otp: number | string) => {
    try {
        const email = localStorage.getItem("tempDoctorEmail")
        const payload = { otp: otp.toString(), email }
        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/doctors/doctor-verfiy`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        localStorage.removeItem("tempDoctorEmail")
        return verfiy
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const DoctorLogin = async (data: Login) => {
    try {
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }
        const loginData = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/doctor/login`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        return loginData.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const DoctorRegisters = async (data: FormData | DoctorRegister) => {
    try {
        const Register = await axios.post(`${API_GATEWAY_URL}/api/v1/doctors/doctor-register`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const userEmail = data instanceof FormData ? data.get("email") : data.email
        if (!userEmail) {
            throw new Error("Email not found in request")
        }
        if (typeof window === 'object') {
            localStorage.setItem("tempDoctorEmail", String(userEmail))
        }
        return Register.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UserForgotEmail = async (data: ForgotEmail | { email: string }) => {
    try {
        const enterEmail = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/forgot/password`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return enterEmail

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UserForgotOtp = async (data: ForgotOtp) => {
    try {
        const { email, otp } = data
        const payload = { email, userOtp: otp }

        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/verfiy/otp`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resetToken = verfiy.data.resetToken || verfiy.data.token
        if (resetToken) {
            localStorage.setItem("resetToken", resetToken)
        }
        return verfiy.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UserResetPassword = async (data: ResetPassword) => {
    try {
        const { email, token, newPassword, confirmPassword } = data

        if (!email || !token || !newPassword) {
            throw new Error("Please provided all values")
        }

        const payload = { email: email, token: token, newPassword: newPassword, confirmPassword: confirmPassword }

        const resetPassword = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/new/password`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return resetPassword

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const DoctorForgotEmail = async (data: ForgotEmail | { email: string }) => {
    try {
        const enterEmail = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/forgot-doctor/password`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return enterEmail

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const DoctorForgotOtp = async (data: ForgotOtp) => {
    try {
        const { email, otp } = data
        const payload = { email, userOtp: otp }

        const verfiy = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/verify-doctor/otp`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const resetToken = verfiy.data.resetToken || verfiy.data.token
        if (resetToken) {
            localStorage.setItem("resetTokenDoctor", resetToken)
        }
        return verfiy.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const DoctorResetPassword = async (data: ResetPasswordDoctor) => {
    try {
        const { email, resetToken, newPassword, confirmPassword } = data

        if (!email || !resetToken || !newPassword) {
            throw new Error("Please provided all values")
        }

        const payload = { email: email, resetToken: resetToken, newPassword: newPassword, confirmPassword: confirmPassword }

        const resetPassword = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/reset-doctor/password`, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return resetPassword

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const AdminLogin = async (data: Login) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        if (!data.email || !data.password) {
            throw new Error("Please fill all values")
        }
        const loginData = await axios.post(`${API_GATEWAY_URL}/api/v1/admin/admin-login`, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            },
            withCredentials: true
        })
        return loginData.data
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const UserAllList = async () => {
    try {
        const users = await axios.get(`${API_GATEWAY_URL}/api/v1/user/users`, {
            headers: {
                "Content-Type": "application/json",
            }, 
            withCredentials: true
        })
        return users
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const doctorList = async () => {
    try {
        const list = await axios.get(`${API_GATEWAY_URL}/api/v1/doctors/list`, {
            headers: {
                "Content-Type": "application/json",
            }, 
            withCredentials: true
        })
        return list
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const doctorVerifyData = async (id: string | number) => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken")
        const verify = await axios.put(`${API_GATEWAY_URL}/api/v1/doctors/doctor-update/${id}`, { is_approved: 1 }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        })
        return verify
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const googleLoginUser = async (auth: GoogleAuthPayload) => {
    try {
        const user = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/google/login`, auth, {
            headers: {
                "Content-Type": "application/json"
            }, 
            withCredentials: true
        })
        return user
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const googleLoginDoctor = async (auth: GoogleAuthPayload) => {
    try {
        const doctor = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/google/doctor/login`, auth, {
            headers: {
                "Content-Type": "application/json"
            }, 
            withCredentials: true
        })
        return doctor
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const userRefreshToken = async () => {
    try {
        const refreshToken = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/refresh-token`, {}, {
            headers: {
                "Content-Type": "application/json"
            }, 
            withCredentials: true
        })
        return refreshToken
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}

export const doctorRefreshToken = async () => {
    try {
        const refreshDoctorToken = await axios.post(`${API_GATEWAY_URL}/api/v1/auth/doctor-refresh/token`, {}, {
            headers: {
                "Content-Type": "application/json"
            }, 
            withCredentials: true
        })
        return refreshDoctorToken
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error))
    }
}