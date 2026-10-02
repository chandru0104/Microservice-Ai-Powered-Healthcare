"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { useEffect, useMemo, useState } from "react"
import { doctorList } from "apps/client/src/services/authService"
import { Loading } from "apps/client/src/components/Loading"
import { FaSearch } from "react-icons/fa";
import Link from "next/link"
import Image from "next/image"
export  default function DoctorList() {

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
                    {loading ? <Loading /> : doctorSearch && doctorSearch.length === 0 ? <div><h1>Doctors not found</h1></div> :
                        <div className="">
                            {
                                doctorSearch.map((items:any)=>(
                                     <Link href={`/doctor/details/${items._id}`} key={items._id}>
                                        <div className="">
                                          <Image src={items?.profile} height={40} width={40} alt="profile"/>
                                        <p>{items.name}</p>
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