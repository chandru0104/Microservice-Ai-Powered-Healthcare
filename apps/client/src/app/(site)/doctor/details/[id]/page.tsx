"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { doctorProfile } from "apps/client/src/services/doctors"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Grid } from "@mui/material"
import { Loading } from "apps/client/src/components/Loading"
import Image from "next/image"
import { FaUserDoctor } from "react-icons/fa6";
import { GoStar } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { GoLocation } from "react-icons/go";

export default function DoctorDetails() {

    const params = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [details, setDetails] = useState<any>([])
    const dooctorDetails = async () => {
        try {
            setLoading(true)
            const list = await doctorProfile(params?.id as string)
            setDetails(list?.data?.data)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        dooctorDetails()
    }, [])

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <Grid container spacing={4}>
                    <Grid size={8}>
                        {
                            loading ? <Loading /> : 
                            <div className="border border-gray-200 rounded-md m-6">
                                <div className="p-4 flex items-start gap-3">
                                    <Image src={details.profile} alt="profile" width={100} height={100}/> 
                                    <div className="text-gray-500 text-sm">
                                        <p className="text-gray-700">{details.name}</p>
                                        <p className="flex items-center gap-1"><FaUserDoctor color="blue"  />{details.specialties}</p>
                                        <p className="flex items-center gap-1"><GoStar color="blue" />{details.experience}</p>
                                        <p className="flex items-center gap-1"><SlCalender color="gray" />{details.experience}</p>
                                        <p className="flex items-center gap-1"><GoLocation color="gray" />{details.place}</p>
                                    </div>
                                </div>
                            </div>
                        }

                    </Grid>

                    <Grid size={4}>

                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}