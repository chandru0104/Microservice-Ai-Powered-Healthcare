"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { userOrderList } from "../../../services/orderHistory";
import { Loading } from "../../../components/Loading";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Package, Calendar, MapPin, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

export default function UserOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("userAccessToken");
            if (!token) {
                setLoading(false);
                return;
            }
            const res = await userOrderList();
            const orderData = res?.data?.data;
            if (Array.isArray(orderData)) {
                setOrders(orderData);
            } else if (orderData) {
                setOrders([orderData]);
            }
        } catch (err: any) {
            console.error("Error fetching orders:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusBadge = (status: string) => {
        const s = (status || "Pending").toLowerCase();
        if (s === "paid" || s === "completed" || s === "delivered") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">
                    <CheckCircle2 size={13} /> {status || "Delivered"}
                </span>
            );
        } else if (s === "failed" || s === "cancelled") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-200">
                    <AlertCircle size={13} /> {status || "Cancelled"}
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                <Clock size={13} /> {status || "Processing"}
            </span>
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
                {/* Header Banner */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                            <ShoppingBag size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-sm text-gray-500 mt-0.5">Track and manage your healthcare products & medicine purchases</p>
                        </div>
                    </div>
                    <Link href="/buy-medicines">
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "var(--primary-bg, #0284c7) !important",
                                textTransform: "none",
                                borderRadius: "10px",
                                px: 3,
                                py: 1,
                                fontWeight: 600,
                            }}
                        >
                            Explore Medicines
                        </Button>
                    </Link>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="py-20">
                        <Loading />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center max-w-lg mx-auto shadow-sm">
                        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Found</h3>
                        <p className="text-gray-500 text-sm mb-6">
                            You haven't placed any medicine or healthcare orders yet. Browse our verified pharmacy products today!
                        </p>
                        <Button
                            onClick={() => router.push("/buy-medicines")}
                            variant="contained"
                            sx={{
                                backgroundColor: "var(--primary-bg, #0284c7) !important",
                                textTransform: "none",
                                borderRadius: "8px",
                                px: 4,
                                py: 1.2,
                                fontWeight: 600,
                            }}
                        >
                            Shop Medicines Now
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any, idx: number) => {
                            const totalAmount = order?.items?.reduce(
                                (acc: number, item: any) =>
                                    acc + (item?.product?.price || 0) * (item?.quantity || 1),
                                0
                            );

                            return (
                                <div
                                    key={order?._id || idx}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    {/* Order Top Bar */}
                                    <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                                            <div>
                                                <span className="font-semibold text-gray-800">Order ID: </span>
                                                <span className="font-mono text-gray-700">#{order?._id?.slice(-8) || `ORD-${idx + 1}`}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-500">
                                                <Calendar size={14} />
                                                <span>
                                                    {order?.createdAt
                                                        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                              year: "numeric",
                                                              month: "short",
                                                              day: "numeric",
                                                          })
                                                        : "Recently placed"}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            {getStatusBadge(order?.paymetStatus || order?.status || "Confirmed")}
                                        </div>
                                    </div>

                                    {/* Items List */}
                                    <div className="p-6 divide-y divide-gray-100">
                                        {order?.items?.map((item: any, i: number) => {
                                            const prod = item?.product || {};
                                            const img = prod?.image?.[0] || prod?.images?.[0] || "/placeholder-medicine.png";
                                            return (
                                                <div key={i} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                                                            {img && img.startsWith("http") ? (
                                                                <Image
                                                                    src={img}
                                                                    alt={prod?.name || "Product"}
                                                                    width={64}
                                                                    height={64}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <Package size={28} className="text-gray-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                                                                {prod?.name || "Healthcare Medicine Item"}
                                                            </h4>
                                                            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-1">
                                                                {prod?.variant && <span>Variant: {prod.variant}</span>}
                                                                <span>Qty: {item?.quantity || 1}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-bold text-gray-900 text-sm sm:text-base">
                                                            ₹{((prod?.price || 0) * (item?.quantity || 1)).toLocaleString("en-IN")}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Order Footer Details */}
                                    <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                                        <div className="flex items-start gap-2 text-gray-600 max-w-md">
                                            <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                            <span className="text-xs text-gray-500">
                                                <strong>Shipping: </strong>
                                                {order?.shippingAddress || "Registered Delivery Address"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 ml-auto sm:ml-0">
                                            <span className="text-xs text-gray-500">Total Paid:</span>
                                            <span className="text-lg font-bold text-gray-900">
                                                ₹{(totalAmount || order?.amount || 0).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
