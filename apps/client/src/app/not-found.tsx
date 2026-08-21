"use client"

import Image from "next/image"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Button from "@mui/material/Button"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {

    const router = useRouter()

    function push() {
        router.push("/")
    }

    return (
        <>
            <Navbar />
            <div className="flex item-center justify-center py-[100px] gap-10 h-[450px] max-w-7xl mx-auto">
                <div >
                    <Image src={"/404.svg"} alt="404 page" height={350} width={400} />
                </div>
                <div className="pt-20 ">
                    <h2 className="text-4xl pb-2">Sorry! We couldn't find <br /> what you were looking for</h2>
                    <Button onClick={push} >Back to Home</Button>
                </div>
            </div>
            <Footer />
        </>

    )
}