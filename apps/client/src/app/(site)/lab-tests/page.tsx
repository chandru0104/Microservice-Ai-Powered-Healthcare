"use client"


import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import Image from "next/image"
import { Droplets, HeartPulse, Activity, FlaskConical, Thermometer } from "lucide-react"
import { listLabTest } from "../../../services/labtest"
import { useState } from "react"
import { useEffect } from "react"
import { GrTestDesktop } from "react-icons/gr";
import Link from "next/link"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"


const recentTest = [
    {
        name: "CBC Test ",
        included: "30 Tests included",
        icon: Droplets,
        bgColor: "text-red-500",
        color: "bg-red-50"
    },
    {
        name: "Lipid Profile Test",
        included: "8 Tests included",
        icon: HeartPulse,
        bgColor: "text-rose-500",
        color: "bg-rose-50"
    },
    {
        name: "Liver Function Test (LFT)",
        included: "11 Tests included",
        icon: Activity,
        bgColor: "text-amber-500",
        color: "bg-amber-50"
    },
    {
        name: "Kidney Function Test (KFT)",
        included: "7 Tests included",
        icon: FlaskConical,
        bgColor: "text-blue-500",
        color: "bg-blue-50"
    },
    {
        name: "Thyroid Profile Test",
        included: "3 Tests included",
        icon: Thermometer,
        bgColor: "text-purple-500",
        color: "bg-purple-50"
    }
];


function LabTestsPage() {

    const [labCategoryList, setLabCategoryList] = useState<any[]>([])

    const router = useRouter()
    const list = async () => {
        try {
            const listData = await listLabTest()
            const data = listData?.data?.data
            setLabCategoryList(data)
        } catch (error: any) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        list()
    }, [])

    function viewAll() {
        router.push("/lab-tests/test-list")
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-4">
                <div>
                    <Image src={"/test-banner1.webp"} alt={"image"} height={1200} width={1400} />

                </div>
                <div >
                    <div className="pt-6">
                        <h2 className="font-bold">Lab Tests List</h2>
                    </div>
                    <div className="flex flex-wrap items-center justify-start gap-4">
                        {labCategoryList && labCategoryList.slice(0, 20).map((items: any, index: any) => (
                            <div key={index} >

                                <Link href={`/lab-tests/lab-test-details/${items._id}`} className="flex bg-blue-100 mt-3 p-3 rounded-md w-[250px] gap-3">
                                    <div className="text-blue-900 flex justify-center items-center "><GrTestDesktop size={30} /></div><div > {items.name} <br />  <div>{items.categoryId.name}</div> </div>
                                </Link>
                            </div>
                        ))

                        }

                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <Button variant="contained" onClick={() => viewAll()}>View All</Button>
                    </div>
                </div>

                <div className="pt-6">
                    <Image src={"/test-banner3.png"} alt={"image"} height={1200} width={1400} />
                </div>

                <div >
                    <h2 className="font-semibold pt-6">Popular Health Checkup Packages</h2>
                    <div className="flex items-center justify-between gap-2 py-6">

                        {recentTest && recentTest.map((items: any, index: any) => {
                            const Icon = items.icon;
                            return (
                                <div key={index} >
                                    <div className={`flex p-2 border border-gary-100 rounded-md items-center  ${items.color} gap-2 `}>
                                        <p className={`${items.color} ${items.bgColor} `}><Icon size={40} /></p>
                                        <div className={`${items.color} text-sm font-semibold`}>{items.name} <br /> <p className="font-medium bg-green-600 text-white m-1 p-1 rounded-md">{items.included}</p></div>
                                    </div>
                                </div>

                            )
                        })

                        }
                    </div>
                </div>


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


export default LabTestsPage