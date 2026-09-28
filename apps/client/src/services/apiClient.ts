import axios from "axios";
import { userRefreshToken, doctorRefreshToken } from "./authService"

const apiClient = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_GATEWAY_URL ||
        "http://localhost:5000",
    withCredentials: true,
})


apiClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const requrl = error.config

        if (error.response.status === 401 && !requrl._retry) {
            requrl._retry = true

            const pathName = typeof window == "object" ? window.location.pathname :""

            try {
                if (pathName.startsWith("/user")) {
                    await userRefreshToken()
                }else if (pathName.startsWith("/doctor")) {
                    await doctorRefreshToken()
                }
                return apiClient(requrl)
            } catch (error) {

                return Promise.reject(error)
            }

        }
        return Promise.reject(error)

    }
)


export default apiClient