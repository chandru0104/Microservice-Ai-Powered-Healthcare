"use client"

import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import Grid from '@mui/material/Grid';
import { userProfile } from "../../../services/user"
import { useEffect } from "react";
import { Loading } from "apps/client/src/components/Loading"
import { useState } from "react"

const UserProfile = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string | undefined>("")
    const [email, setEmail] = useState<string | undefined>("")
    const [password, setPassword] = useState<string | undefined>("")
    const [profile, setProfile] = useState<any>("")

    const fetchUserProfile = async () => {
        try {
            setLoading(true)
            const user = await userProfile()
            const userData = user?.data?.data
            setProfile(userData)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto ">
                <Grid container spacing={2}>
                    <Grid size={8}>
                             

                    </Grid>
                    <Grid size={4}>

                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}

export default UserProfile