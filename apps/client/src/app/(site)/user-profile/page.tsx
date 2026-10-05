"use client"

import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import Grid from '@mui/material/Grid';
import { userProfile } from "../../../services/user"
import { useEffect } from "react";
const UserProfile = () => {



    useEffect(() => {
        const user = async () => await userProfile()
        user()
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto ">
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <form action="">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label htmlFor="">Name</label></td><td><input type="text" /></td>

                                    </tr>
                                    <tr>
                                        <td><label htmlFor="">Namddde</label></td><td><input type="text" /></td>

                                    </tr>
                                    <tr>
                                        <td><label htmlFor="">Ndddame</label></td><td><input type="text" /></td>

                                    </tr>
                                </tbody>
                            </table>
                        </form>
                          
                    </Grid>
                    <Grid size={8}>

                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}

export default UserProfile