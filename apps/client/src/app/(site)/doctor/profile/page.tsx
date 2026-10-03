"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { doctorProfile } from "apps/client/src/services/doctors"
import { useEffect, useState } from "react"
import { Loading } from "apps/client/src/components/Loading"
import { Grid } from "@mui/material"
import { FaUserDoctor } from "react-icons/fa6";
import { GoStar } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { GoLocation } from "react-icons/go";
import Image from "next/image"
import { MdVerified } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import 

export default function DoctorProfile() {

    const [loading, setLoading] = useState<boolean>(false)
    const [details, setDetails] = useState<any>([])

    const id = typeof window === "object" ? localStorage.getItem("doctorId") : ""

    const dooctorDetails = async () => {
        try {
            setLoading(true)
            const list = await doctorProfile(id as string)
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
            {loading ? <Loading /> : <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-end">
                    <button className="flex items-center border border-red-700 text-red-700 p-1 my-3 rounded-md" ><MdLogout />Logout</button>
                </div>
                <Grid container spacing={4}>

                    <Grid size={12}>
                        <div className="border border-gray-200 rounded-md  flex items-start justify-between shadow-lg">
                            <div className="p-4 flex items-start gap-3 ">
                                <Image src={details?.profile || "/images/doc"} alt="profile" width={200} height={200} />
                                <div className="text-gray-500 text-sm">
                                    <p className="text-gray-700 font-semibold text-[30px] p-2 flex items-center">{details.name} &nbsp; {details.is_approved === true ? <MdVerified color="green" /> : null}</p>
                                    <p className="flex items-center gap-1 font-semibold text-[30px] p-2"><FaUserDoctor color="blue" />{details.specialties}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><GoStar color="blue" />{details.experience}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><SlCalender color="gray" />{details.experience}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><GoLocation color="gray" />{details.place}</p>
                                </div>

                            </div>
                            <div className="text-semibold flex p-4 flex-col">
                                <p className="text-lg text-green-700 rounded-md  text-white font-semibold">Register No : {details.register}</p>
                                <p className="flex items-center" ><HiOutlineMailOpen size={18} color="gray" /> &nbsp; {details.email}</p>
                                <p className="font-semibold">Base pay Amount : ₹ {details.price}.00</p>
                                <button className="bg-orange-500 rounded-lg p-1 text-white m-1 shadow-md">View Appointment</button>
                                <button className="bg-blue-500 rounded-lg p-1 text-white m-1 shadow-md">Payment History</button>

                            </div>

                        </div>

                    </Grid>
                </Grid>
            </div>}
            <Footer />
        </>
    )
}