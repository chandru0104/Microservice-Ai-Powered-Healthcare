"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { useEffect, useMemo, useState } from "react"
import { doctorList } from "apps/client/src/services/authService"
import { Loading } from "apps/client/src/components/Loading"
import { FaSearch } from "react-icons/fa";
import Link from "next/link"
import Image from "next/image"
import { Grid } from "@mui/material"
import { Button } from "@mui/material"
import { FaUserDoctor } from "react-icons/fa6";
import { GoStar } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { GoLocation } from "react-icons/go";
export default function DoctorList() {

    const [doctorLists, setdoctorLists] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState("")

    const fetchDoctorList = async () => {
        try {
            setLoading(true)
            const list = await doctorList()
            const listData = list?.data?.data
            setdoctorLists(listData)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctorList()
    }, [])

    const doctorSearch: any = useMemo(() => {
        return doctorLists.filter((items: any) => {
            return items.name.toLowerCase().includes(search.toLowerCase())
        })

    }, [search, doctorLists])

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-3">
                <div className="mb-10">
                    <h1 className="text-2xl text-center sm:text-4xl">Expert Care, Just a Click Away</h1>
                    <p className="text-1xl text-center sm:text-1xl ">Connect with verified specialists, book instant consultations, and get personalized healthcare tailored to your needs</p>
                </div>

                <div className="flex items-center justify-center">
                    <FaSearch size={40} color="white" className="bg-[var(--primary-bg)] p-2 rounded-md " /><input type="text" name="" id="" placeholder="Search" className="w-[500px] p-2 border border-gray-400 rounded-md m-4 "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    {loading ? <Loading /> : doctorSearch && doctorSearch.length === 0 ? <div className="mx-auto"><h1>Doctors not found</h1></div> :
                        <div >
                            {
                                doctorSearch.map((items: any) => (
                                    <Link href={`/doctor/details/${items._id}`} key={items._id}>
                                        <div className=" gap-3 items-start border border-gray-200 m-4 p-4 shadow-sm rounded-md">
                                            <Grid container spacing={2}>
                                                <Grid size={6}>
                                                    <div className="flex">
                                                        <Image src={items?.profile} height={100} width={120} alt="profile" />
                                                        <div className="m-3">
                                                            <p className="font-semibold flex gap-2 items-center"><FaUserDoctor color="blue" />{items.name}</p>
                                                            <p className="flex items-center gap-2"><GoStar color="gold" />{items.specialties}</p>
                                                            <p className="flex items-center gap-2 text-green-900"><SlCalender color="gray" />{items.experience}</p>
                                                            <p className="flex items-center gap-2 text-sm text-gray-500"><GoLocation color="gray" />{items.place}</p>
                                                        </div>

                                                    </div>
                                                </Grid>
                                                <Grid size={6}>
                                                    <div className="flex flex-col items-end justify-end mt-14">
                                                        <p className="font-semibold">Fees : ₹{items.price}.00</p>
                                                        <Button variant="contained">View Details</Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>

                    }

                </div>
            </div>
            <Footer />
        </>
    )
}