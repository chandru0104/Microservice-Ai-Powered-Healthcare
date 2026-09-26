"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import { productList } from "../../../services/productService"
import Image from "next/image"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

export default function Productlist() {

    const [productLists, setProductList] = useState<any>([])
    const router = useRouter()

    const products = async () => {
        try {
            const lists = await productList()
            const listData = lists?.data?.data
            setProductList(listData)
            console.log(listData)

        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        products()
    }, [])

    function viewDetails(id: any) {
        router.push(`/buy-medicines/details/${id}`)

    }
    return (
        <>
            <Navbar />
            <div className="max-w-8xl mx-auto">
                <Grid container spacing={1}>
                    <Grid size={4}>
                        <div className="border boder-gray-900 h-screen  mt-6">

                            
                        </div>
                    </Grid>
                    <Grid size={8}>
                        <div className="flex  flex-wrap gap-7 mt-6 ">
                            {productLists && productLists.map((items: any, index: number) => {
                                return (
                                    <div className="border boder-gary-500 h-[300px] w-[200px] p-3" key={index} >
                                        <Image src={items?.image[0]} height={130} width={130} alt={items.name} />
                                        <div>{items.name}</div>
                                        <div className="flex gap-2">
                                            <p className="bg-orange-100 inline p-1 rounded-md text-[12px]">{items.brandId?.name}</p>
                                            <p className="bg-orange-100 inline p-1 rounded-md text-[12px]">{items.variant}</p>
                                        </div>
                                        <p className="font-semibold">₹ {items.price}.00</p>
                                        <Button variant="contained">Order</Button> <button className="text-blue-900 p-1.5 rounded-md border border-blue-900" onClick={() => viewDetails(items._id)}>View details</button>
                                    </div>)
                            })

                            }

                        </div>
                    </Grid>

                </Grid>
            </div>
            <Footer />
        </>
    )
}