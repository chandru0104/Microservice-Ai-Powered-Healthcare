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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import {Button} from "@mui/material"
export default function DoctorDetails() {

    const params = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [details, setDetails] = useState<any>({})
    const [dates, setDates] = useState<any>([])
    const [time, setTime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

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
    function handleDate(date: any) {
        setDates(date)
        console.log(dates)
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <Grid container spacing={4}>
                    <Grid size={8}>
                        {
                            loading ? <Loading /> :
                                <div className="border border-gray-200 rounded-md m-6 flex items-start justify-between">
                                    <div className="p-4 flex items-start gap-3 ">
                                        <Image src={details?.profile || "/doctoroppoinment.svg"} alt="profile" width={100} height={100} className="w-[100px] h-[100px] object-cover rounded-md" />
                                        <div className="text-gray-500 text-sm">
                                            <p className="text-gray-700 font-semibold text-lg">{details.name}</p>
                                            <p className="flex items-center gap-1 font-semibold"><FaUserDoctor color="blue" />{details.specialties}</p>
                                            <p className="flex items-center gap-1"><GoStar color="blue" />{details.experience}</p>
                                            <p className="flex items-center gap-1"><SlCalender color="gray" />{details.experience}</p>
                                            <p className="flex items-center gap-1"><GoLocation color="gray" />{details.place}</p>
                                        </div>

                                    </div>
                                    <div className="text-semibold flex p-4">
                                        <p className="text-sm bg-green-700 rounded-md px-2 text-white">Register No : {details.register}</p>
                                    </div>

                                </div>
                        }
                        <div className="m-6">
                            <h2 className="text-lg font-semibold ">About Dr. {details?.name}</h2>

                            {details?.about ? (
                                <p className="text-sm mt-3 text-gray-600 leading-relaxed text-justify">{details.about}</p>
                            ) : (
                                <p className="text-sm mt-3 text-gray-600 leading-relaxed text-justify">
                                    Dr. {details?.name || "Doctor"} is a seasoned {details?.specialties || "specialist"} based in {details?.place || "our healthcare center"} with over {details?.experience || "several"} years of clinical experience. Dedicated to delivering high-quality patient care and specialized treatment in {details?.specialties || "medicine"}, Dr. {details?.name || "Doctor"} focuses on comprehensive patient well-being and health management. Book a consultation with Dr. {details?.name || "Doctor"} in {details?.place || "our clinic"} for expert medical guidance and treatment.
                                </p>
                            )}
                        </div>
                        <div>

                        </div>
                    </Grid>

                    <Grid size={4}>
                        <div className="border border-gray-200 rounded-lg mt-5 p-4">
                            <div className="flex justify-between items-center border-b border-gray-200 py-3">
                                <p>Online Consult </p><p className="font-semibold">₹{details?.price}.00</p>
                            </div>
                            <h2 className="text-lg font-semibold mt-2 flex items-center justify-center">Book Date and Time</h2>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div>
                                    <DateCalendar onChange={handleDate} />
                                </div>
                                <div className="mt-3">
                                    <TimePicker
                                        className="w-full"
                                        label="Select Time"
                                        value={time}
                                        onChange={(newValue) => setTime(newValue)}
                                    />
                                </div>
                                <div className="mt-3 flex items-center justify-center">
                                    <Button variant="contained">Book Appointment</Button>
                                </div>
                            </LocalizationProvider>
                        </div>

                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}