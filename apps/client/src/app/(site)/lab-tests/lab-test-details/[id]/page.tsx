"use client"

import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { viewlabTest } from "../../../../../services/labtest"
import { useState } from "react"
import { useEffect } from "react"

import { useParams } from "next/navigation"
import { Grid } from "@mui/material"

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
                <Grid container spacing={3}>
                    <Grid size={3}>
                        <div key={testList._id}>
                        <div>{testList?.name}</div>
                        <div>{testList?.description}</div>
                        <div>{testList?.reportDelivery}</div>
                        <div>{testList?.price}</div>
                        <button onClick={()=>bookNow(testList._id)}>Book Now</button>
                        </div>
                    </Grid>
                    <Grid size={9}>
                        <div>Category name : {testList?.categoryId?.name}</div>
                        <div>Category description : {testList?.categoryId?.description}</div>
                        <div>{testList?.sampleType}</div>
                        <div>{testList?.gender}</div>
                        <div>{testList?.ageGroup}</div>
                        <div>{testList?.address}</div>
                    </Grid>

                </Grid>
            </div>


            <Footer />
        </>
    )
}