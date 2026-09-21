"use client"

import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { listLabTest } from "../../../../services/labtest"
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function TestList() {

    const router = useRouter()
    const [testList, setTestList] = useState<any>([])

    const list = async () => {
        try {
            const data = await listLabTest()
            const listData = data?.data?.data
            setTestList(listData)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        list()
    }, [])

    const bookNow =(id:string)=>{

    }

    const viewDetails =(id:string)=>{
       router.push(`/lab-tests/lab-test-details/${id}`)
    }


    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto ">
                <div className="flex items-center justify-center">
                <input type="text" name="" id="" placeholder="Search" className="w-[500px] p-2 border border-gray-400 rounded-md m-4 "/> 
                </div>
               <div className="flex flex-wrap pt-2 items-center justify-center gap-3">
                {testList && testList.map((items:any ,index:number)=>(
                    <div key={index} className="p-6 w-[250px] bg-gray-100 rounded-md hover:shadow-md">
                        <div >{items.name}</div>
                        <div className="text-[12px]">{items?.categoryId?.name}</div>
                        <div className="text-[12px]">Delivery : {items?.reportDelivery}</div>
                        <div className="font-semibold">Price : {items.price} Rs</div>
                        <div className="flex items-center justify-between pt-2">
                        <button className="bg-green-500 p-1 rounded-md border border-gray-600 text-white" onClick={()=>bookNow(items._id)}>Book now</button> <button className="border border-gray-400 rounded-md p-1" onClick={()=>viewDetails(items._id)}>View Details</button>
                        </div>
                    </div>
                ))
                }
               </div>
            </div>
            <Footer />
        </>
    )
}