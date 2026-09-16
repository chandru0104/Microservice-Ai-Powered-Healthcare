"use client";

import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { UserAllList, doctorList } from "../services/authService"
import { OrderHistory } from "../services/orderHistory"
import { productList } from "../services/productService"



export function DashboardCard() {
    const [userCount, setUserCount] = useState<number | string>("Loading...")
    const [productCount, setProductCount] = useState<any>("Loading...")
    const [doctorCount, setDoctorCount] = useState<any>("Loading...")
    const [orderCount, setOrderCount] = useState<any>("Loading...")
    const [revenueCount, setRevenueCount] = useState<any>("Loading...")

    const user = async () => {
        try {
            const userCountData = await UserAllList()
            const usersArray = userCountData?.data?.data || userCountData?.data
            const count = Array.isArray(usersArray) ? usersArray.length : 0
            setUserCount(count)
        } catch (error: any) {
            console.log(error.message)
            setUserCount(0)
        }
    }

    const doctor = async () => {
        try {
            const doctorCount = await doctorList()
            const doctorsArray = doctorCount?.data?.data || doctorCount?.data
            const count = Array.isArray(doctorsArray) ? doctorsArray.length : 0
            setDoctorCount(count)
        } catch (error: any) {
            console.log(error.message)
            setDoctorCount(0)
        }
    }

    const orders = async () => {
        try {
            const orderRes = await OrderHistory()
            const ordersArray = orderRes?.data?.data || orderRes?.data
            const count = Array.isArray(ordersArray) ? ordersArray.length : 0
            setOrderCount(count)
        } catch (error: any) {
            console.log(error.message)
            setOrderCount(0)
        }
    }

    const product = async () => {
        try {
            const products = await productList()
            const count = Array.isArray(products?.data) ? products?.data.length :0
            setProductCount(count+1)
    } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        user()
        doctor()
        orders()
        product()
    }, [])

    return (
        <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaUserShield /></p>
                        <p className="">Active Users</p>
                    </div>

                </h3>
                <p className="text-2xl">{userCount}</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaUserDoctor /></p>
                        <p className="">Active Doctors</p>
                    </div>
                </h3>
                <p className="text-2xl">{doctorCount}</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaShop /></p>
                        <p className="">Total Order</p>
                    </div>
                </h3>
                <p className="text-2xl">{orderCount}</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><HiShoppingCart /></p>
                        <p className="">Total Products</p>
                    </div>
                </h3>
                <p className="text-2xl">{productCount}</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><RiMoneyRupeeCircleFill /></p>
                        <p className="">Total Revenue</p>
                    </div>
                </h3>
                <p className="text-2xl">Rs 10Lacs</p>
            </div>
        </div>
    )
}