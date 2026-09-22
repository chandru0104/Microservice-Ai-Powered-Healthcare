"use client"

import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { viewlabTest } from "../../../../../services/labtest"
import { useState } from "react"
import { useEffect } from "react"
import { BiMaleFemale } from "react-icons/bi";
import { useParams } from "next/navigation"
import { Grid } from "@mui/material"
import { BiSolidCategoryAlt } from "react-icons/bi";
import { PiTestTubeFill } from "react-icons/pi";
import { MdAddLocationAlt } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { MdOutlineDescription } from "react-icons/md";
import Image from "next/image";
import { MdBookmarkAdded } from "react-icons/md";

export default function TestList() {

    const [testList, setTestList] = useState<any>([])
    const params: any = useParams()

    const details = async () => {
        try {
            const data = await viewlabTest(params?.id)
            const listData = data?.data?.data
            setTestList(listData)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        details()
    }, [])

    const bookNow = (id: string) => {

    }



    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto mt-4 ">
                <Grid container spacing={4}>
                    <Grid size={4}>
                        <div key={testList._id} className="shadow-md p-2 bg-gray-100 border border-gray-300 rounded-md">
                            <div className="font-semibold text-[25px] p-2">{testList?.name}</div>
                            <div className="flex gap-2 p-2">Description : {testList?.description}</div>
                            <div className="flex gap-2 p-2">Delivery Time : {testList?.reportDelivery}</div>
                            <div className="font-bold p-2 text-[20px]">Price : {testList?.price} /Rs</div>
                            <button className="bg-green-500 p-2 mt-4 rounded-md border border-gray-600 text-white w-full flex items-center justify-center gap-2" onClick={() => bookNow(testList?._id)}><MdBookmarkAdded size={26} />Book now</button>
                        </div>
                    </Grid>
                    <Grid size={8}>
                        <div className="shadow-md p-2 bg-gray-100 border border-gray-300 rounded-md p-4">
                            <div className="flex gap-2 p-2"><BiSolidCategoryAlt size={26} className="text-[#004097]" /> Category name : {testList?.categoryId?.name}</div>
                            <div className="flex gap-2 p-2"><MdOutlineDescription size={26} className="text-[#004097]" />  Description : {testList?.categoryId?.description}</div>
                            <div className="flex gap-2 p-2"><PiTestTubeFill size={26} className="text-[#004097]" /> Sample Type : {testList?.sampleType}</div>
                            <div className="flex gap-2 p-2"><BiMaleFemale size={26} className="text-[#004097]" /> Gender : {testList?.gender}</div>
                            <div className="flex gap-2 p-2"><GrGroup size={26} className="text-[#004097]" /> Age group : {testList?.ageGroup}</div>
                            <div className="flex gap-2 p-2"><MdAddLocationAlt size={26} className="text-[#004097]" /> Address : {testList?.address}</div>

                            <div className="p-2">
                                <h2 className="text-2xl font-semibold ">What is the {testList?.name} - Essential?</h2>
                                <p>The Care Hub Heart Panel – Essential is a preventive health screening package designed to assess your cardiovascular risk profile through 64 targeted tests. It evaluates not only heart-specific markers but also interconnected systems, such as kidney function, blood sugar control, and anaemia status, that significantly impact heart health.

                                    This panel helps identify early signs of conditions like dyslipidemia (abnormal cholesterol levels), kidney strain linked to high blood pressure, and systemic inflammation. By analyzing blood and urine samples, it provides your doctor with a comprehensive overview of the physiological factors that influence heart function and vascular integrity.

                                    Ideal for individuals with a family history of heart disease, lifestyle-related risk factors, or those seeking routine cardiac monitoring, the Care Hub Heart Panel – Essential enables timely intervention and personalised care. With easy online booking, home sample collection, and secure digital reporting, it offers a reliable starting point for evidence-based heart health management.</p>
                            </div>
                        </div>
                    </Grid>

                </Grid>


                <div className="pt-6">
                    <Image alt={"image"} height={1200} width={1400} src={"/test-banner2.webp"} />
                </div>

                <div className="pt-10">
                    <p className="font-semibold py-2">Fast Sample Collection & Report Delivery by Care Hub Diagnostics</p>
                    <p>With an extensive network of verified diagnostic partner labs and patient care centres, Care Hub brings seamless digital healthcare to your doorstep. Once you book your home lab test or diagnostic health package, a certified phlebotomist visits your home for safe and hygienic sample collection, ensuring quick turnaround and same-day digital report delivery for most tests.</p>

                    <p className="font-semibold py-2">Why Choose Care Hub for a Lab Test at Home?</p>
                    <p>Care Hub combines clinical accuracy with modern AI-driven health analytics to provide an effortless diagnostic experience. Every sample is processed in certified laboratories using state-of-the-art medical equipment. With automated digital report generation, doctor consultations on test results, and completely transparent pricing, Care Hub makes preventive healthcare accessible and reliable.</p>

                    <p className="font-semibold py-2">AI-Powered Diagnostic Reports & Insights</p>
                    <p>In addition to standard medical reports, Care Hub provides smart AI-assisted report summaries that break down complex medical terms into simple, understandable insights. This helps you track critical biomarker trends over time and effortlessly consult with our specialist doctors for personalized health recommendations.</p>

                    <p className="font-semibold py-2">Value for Money & Transparent Pricing</p>
                    <p>With exclusive discounts on lab test packages and comprehensive full-body checkups, Care Hub ensures high-quality diagnostics remain affordable for every family. Enjoy flexible payment options including online payments and cash on collection, with zero hidden charges.</p>

                    <p className="font-semibold py-2">When Do You Need to Book a Lab Test Online?</p>
                    <p>In preventive healthcare, regular diagnostic tests are the first line of defence against diseases. Routine screenings help detect early-onset conditions—such as diabetes, cholesterol, thyroid disorders, and vitamin deficiencies—long before symptoms appear. For individuals managing existing conditions, regular tests serve as vital biomarkers to monitor recovery and help your doctor fine-tune your personalized treatment plan.</p>
                </div>
            </div>


            <Footer />
        </>
    )
}