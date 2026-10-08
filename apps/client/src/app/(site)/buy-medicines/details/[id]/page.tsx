"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { productView, cartAdd } from "apps/client/src/services/productService"
import { Button, Grid } from "@mui/material"
import Image from "next/image"
import { GrSecure } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { Loading } from "apps/client/src/components/Loading"
import { orderAdd } from "apps/client/src/services/order"
import {paymentAdd} from "apps/client/src/services/payment"


const productDetails = () => {
    const [detailsData, setDetailsData] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const [increment, setIncrement] = useState<number>(1)

    if (increment === -1 || increment === 0) {
        setIncrement(1)
    }

    const params: any = useParams()
    const { id } = params

    const details = async () => {
        try {
            setLoading(true)
            const view = await productView(id)
            setDetailsData(view?.data?.data)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        details()
    }, [])

    const cartAdds = async (id: any, quantity: any) => {

        try {
            await cartAdd(id, quantity)
            alert("Cart Added successfully...")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const orderProduct = async (id: any) => {
        try {
            const orderAdds = await orderAdd(id, increment)
            alert("Order placed successfully")
           
            const createdOrder = orderAdds?.data?.data;
            if (createdOrder?._id) {
                const addpayment = await paymentAdd(createdOrder._id, createdOrder.price)
                console.log(addpayment)
            }

            console.log(orderAdds)
        } catch (error: any) {
            alert(error.message || "Failed to place order")
            console.log(error.message)
        }
    }

    return (
        <>
            <Navbar />

            {loading ? <Loading /> : <div className="max-w-7xl mx-auto flex pt-4 gap-6">
                <Grid>
                    <div className="flex">
                        <div className="flex flex-col gap-3">
                            {detailsData?.image?.length > 0 ? (
                                detailsData.image.slice(0, 4).map((imgUrl: string, idx: number) => (
                                    <Image key={idx} src={imgUrl || "/medicineicon.webp"} alt="pics" height={50} width={50} className="border border-gray-400 rounded-md" />
                                ))
                            ) : (
                                <Image src="/medicineicon.webp" alt="pics" height={50} width={50} className="border border-gray-400 rounded-md" />
                            )}
                        </div>
                        <div className="flex items-center justify-center mx-4">
                            <Image src={detailsData?.image?.[0] || "/medicineicon.webp"} alt="pics" height={400} width={200} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2>{detailsData?.name}</h2>
                            <p >Stock : {detailsData?.stock.toString()}</p>
                            <p >Expiry : {detailsData?.expiryOn}</p>
                            <p >Variant : {detailsData?.variant}</p>

                            <div>
                                <table className="mt-8 w-[600px] border-collapse bg-blue-100">
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Product Type
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.subcategoryId?.name || "-"}
                                                </div>
                                            </td>

                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Category
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.categoryId?.name || "-"}
                                                </div>
                                            </td>

                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Product Variant
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.childCategoryId?.name || "-"}
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Brand
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.brandId?.name || "-"}
                                                </div>
                                            </td>

                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Age Group
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.ageGroupId?.name || "-"}
                                                </div>
                                            </td>

                                            <td className="border border-gray-300 p-3">
                                                <div className="text-sm font-semibold">
                                                    Origin
                                                </div>
                                                <div className="mt-1 text-sm text-gray-600">
                                                    {detailsData?.originId?.name || "-"}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <p>Return: {detailsData?.returnPolicy} </p>
                            <p>Description: {detailsData?.description}</p>
                        </div>
                    </div>
                </Grid>
                <Grid>
                    <div className="flex gap-6">
                        <div className="flex flex-col items-center justify-center ">
                            <div className="flex flex-row gap-1">
                                <GrSecure size={15} />
                                <p className="text-[12px]">100% Genuine</p>
                            </div>
                            <p className="text-[12px]">Products</p>

                        </div>
                        <div className="flex flex-col items-center justify-center ">
                            <div className="flex flex-row gap-1">
                                <BsCalendarDate size={15} />
                                <p className="text-[12px]">Expiry After</p>
                            </div>
                            <p className="text-[12px]">{detailsData?.expiryOn}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center ">
                            <div className="flex flex-row gap-1">
                                <RiSecurePaymentLine size={15} />
                                <p className="text-[12px]">Safe & Secure</p>
                            </div>
                            <p className="text-[12px]">Payments</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <p className="font-semibold text-[20px]">Price : ₹ {detailsData?.price}.00</p>
                    </div>
                    <div className="flex items-start justify-start">

                        <p>Quantity : <button onClick={() => setIncrement(increment - 1)} className="bg-blue-300 px-6 py-0.5 font-semibold text-[20px] m-3 cursor-pointer">-</button>
                            {increment}
                            <button onClick={() => setIncrement(increment + 1)} className="bg-blue-300 px-6 py-0.5 font-semibold text-[20px] m-3 cursor-pointer">+</button></p>
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-2">
                        <Button className="cartBtn" onClick={() => cartAdds(detailsData?._id, increment)}>Add to cart</Button>
                        <Button onClick={() => orderProduct(detailsData?._id)}>Buy now</Button>
                    </div>
                </Grid>
            </div>}

            <Footer />
        </>
    )
}

export default productDetails