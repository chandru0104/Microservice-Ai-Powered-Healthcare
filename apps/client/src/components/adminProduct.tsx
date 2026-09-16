import { useRouter } from "next/router"

function adminProduct() {

    const router = useRouter()
    const adminAccessToken = localStorage.getItem("adminAccessToken")
    if (!adminAccessToken) {
        router.push("/admin/login")
    }

    return (
        <h1>Admin Dashboard</h1>
    )
}

export default adminProduct