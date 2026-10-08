"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { useEffect, useState } from "react"
import { cartList, cartDelete } from "apps/client/src/services/productService"
import { orderAdd, orderAddMultiple } from "apps/client/src/services/order"
import { Loading } from "apps/client/src/components/Loading"
import Image from "next/image"
import { Button } from "@mui/material"
import { paymentAdd } from "apps/client/src/services/payment"
export default function Cart() {

    const [cartData, setCartData] = useState<any>([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [dirData, setDirData] = useState<any>()


    const list = async () => {
        try {
            setLoading(true)
            const view = await cartList()
            setCartData(view?.data?.data)
            setDirData(view?.data)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        list()
    }, [])


    const removeItems = async (id: any) => {
        try {

            await cartDelete(id)
            list()
        } catch (error: any) {
            console.log(error.message)
        }
    }

    const orderSingleItem = async (item: any) => {
        try {
            const prodId = item?.productId?._id || item?.productId
            const qty = item?.quantity || 1
            const add = await orderAdd(prodId, qty)
            const orderId = add?.data?.data?._id
            const amount = add?.data?.data.price
            alert("Order placed successfully")
            if (add) {
                await paymentAdd(orderId, amount)
            }

            if (item?._id) {
                await cartDelete(item._id)
            }
            list()
        } catch (error: any) {
            alert(error.message || "Failed to place order")
            console.log(error.message)
        }
    }

    const orderCheckoutAll = async () => {
        try {
            if (!cartData || cartData.length === 0) {
                alert("No items found in cart")
                return
            }
            const items = cartData.map((item: any) => ({
                product: item?.productId?._id || item?.productId,
                quantity: item?.quantity || 1
            }))
            const add = await orderAddMultiple(items)
            const orderId = add?.data?.data?._id
            const amount = add?.data?.data.price
            if (add) {
                await paymentAdd(orderId, amount)
            }
            alert("Order placed successfully for all items")
            for (const item of cartData) {
                if (item?._id) {
                    await cartDelete(item._id)
                }
            }
            list()
        } catch (error: any) {
            alert(error.message || "Failed to place order")
            console.log(error.message)
        }
    }

    return (
        <>
            <Navbar />
            {loading ? <Loading /> : <div className="max-w-7xl mx-auto ">
                <h2 className="text-2xl font-bold mb-4">Cart List </h2>
                <div className="">
                    <div>
                        {
                            cartData && cartData.length == 0 ? <div><h3 className="text-center">No Items found in Cart </h3></div> : cartData.map((items: any, index: number) => {
                                return (
                                    <div className="mt-8 border border-gray-300 p-2  flex justify-between items-center rounded-md" key={index}>
                                        <div className="flex gap-2 ">
                                            <div className="flex gap-2   ">
                                                <Image src={items?.productId?.image?.[0] || "/medicineicon.webp"} alt={"pics"} height={100} width={100} />
                                                <div><h2>{items?.productId?.name} </h2> <p>{items?.productId?.variant}</p>  <p>Price : {items?.productId?.price}</p></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <div className="flex flex-col items-start mt-4 ">
                                                <p>Qty : {items?.quantity}</p>
                                                <p>Total Price : ₹ {items?.itemTotalPrice}.00</p>
                                            </div>
                                            <div className="flex gap-2 justify-between flex-col">
                                                <Button variant="contained" onClick={() => orderSingleItem(items)}>Buy Now</Button>
                                                <button className="border border-gray-900 px-3 py-1.5 rounded-md" onClick={() => removeItems(items?._id)}>Remove Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="p-2 border border-gray-300 mt-8 w-[300px] rounded-md relative left-[980px] bg-primary-bg  flex flex-col items-end">
                        <p className="text-white text-[15px]">Total Quantity : {dirData?.totalCartQuantity}</p>
                        <p className="text-white text-[20px]">Total Price : ₹ {dirData?.totalCartPrice}.00</p>
                        <button className="border border-gray-900 px-3 py-1.5 rounded-md bg-green-600 text-white mt-2" onClick={orderCheckoutAll}>Proceed to Checkout</button>
                    </div>

                </div>
            </div>}

            <Footer />
        </>
    )
}