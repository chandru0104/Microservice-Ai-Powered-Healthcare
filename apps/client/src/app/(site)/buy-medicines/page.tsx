"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { FaSearch } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react"
import { productList } from "../../../services/productService"
import Image from "next/image"
import { Button } from "@mui/material"
import { Loading } from "apps/client/src/components/Loading";
import Link from "next/link";



interface Product {
    _id: string;
    name: string;
    price: number;
    image: string[];
    variant?: string;
    brandId?: {
        _id?: string;
        name?: string;
    };
}

export default function Productlist() {
    const [loading , setLoading] = useState<boolean>(false)
    const [productLists, setProductList] = useState<Product[]>([])
    const [search, setSearch] = useState<string>(" ")

    const products = async () => {
        try {
            setLoading(true)
            const lists = await productList()
            const listData: Product[] = lists?.data?.data || []
            setProductList(listData)
            console.log(listData)

        } catch (error: any) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        products()
    }, [])


    const filterProduct = useMemo(()=>{
        return productLists.filter((items:Product)=>items.name.toLowerCase().includes(search.trim().toLowerCase()))
    },[productLists,search])


    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto p-3">
                <div className="mb-10">
                    <h1 className="text-2xl text-center sm:text-4xl">Genuine Medicines, Delivered to Your Door</h1>
                    <p className="text-1xl text-center sm:text-1xl ">Order 100% authentic medicines and health essentials with fast doorstep delivery and the best prices</p>
                </div>

                <div className="flex items-center justify-center">
                    <FaSearch size={40} color="white" className="bg-[var(--primary-bg)] p-2 rounded-md " /><input type="text" name="" id="" placeholder="Search" className="w-[500px] p-2 border border-gray-400 rounded-md m-4 "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-7 mt-6 items-center justify-start">
                    {loading ? <Loading/> : filterProduct && filterProduct.length == 0 ? <div className="mx-auto"><h3 className="text-center ">No Product found </h3></div> : filterProduct.map((items: Product) => {
                        return (
                            <div className="border boder-gray-500 h-[300px] w-[200px] p-3" key={items._id} >
                                <Image src={items?.image?.[0]?.toString() || ""} height={130} width={130} alt={items.name} />
                                <div>{items.name}</div>
                                <div className="flex gap-2">
                                    <p className="bg-orange-100 inline p-1 rounded-md text-[12px]">{items.brandId?.name}</p>
                                    <p className="bg-orange-100 inline p-1 rounded-md text-[12px]">{items.variant}</p>
                                </div>
                                <p className="font-semibold">₹ {items.price}.00</p>
                                <Button variant="contained">Order</Button> <Link href={`/buy-medicines/details/${items._id}`}><button className="text-blue-900 p-1.5 rounded-md border border-blue-900">View details</button></Link>
                            </div>)
                    })

                    }

                </div>

            </div>
            <Footer />
        </>
    )
}