"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { Grid } from "@mui/material"
import { useEffect, useState } from "react"
import {productList} from "../../../services/productService"
export default function Productlist() {

    const [productLists, setProductList] = useState<any[]>([])
    
    const products = async ()=>{
        try{
            const lists = await productList()
            const listData = lists?.data?.data
            setProductList(listData)
            console.log(listData)
        }catch(error:any){
            console.log(error.message)
        }
    }

    useEffect(()=>{
        products()
    },[])

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <div>


                        </div>
                    </Grid>
                    <Grid size={8}>
                        <div>
                             {productLists && productLists.map((items:any,index:number)=>{
                                <></>
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