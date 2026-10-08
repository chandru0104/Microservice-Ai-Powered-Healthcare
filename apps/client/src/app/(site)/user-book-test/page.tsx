"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading";
import { useState, useEffect } from 'react';
import * as React from 'react';
import { userBookingList } from "apps/client/src/services/labtest";
import { bookTestPayment } from "apps/client/src/services/payment";
import Footer from "apps/client/src/components/Footer";
import Navbar from "apps/client/src/components/Navbar";
import { CreditCard, CheckCircle2, Clock } from "lucide-react";

const UserBookTestPage = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any[]>([]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await userBookingList();
            const listData = Array.isArray(res?.data?.data) ? res.data.data : [];
            const mapped = listData.map((item: any, index: number) => ({
                ...item,
                id: index + 1,
            }));
            setRows(mapped);
        } catch (error: any) {
            console.error("Error fetching lab test bookings:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handlePayNow = async (bookId: string, price: number) => {
        try {
            await bookTestPayment(bookId, price);
        } catch (err: any) {
            alert(err.message || "Payment initiation failed");
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'patientName',
            headerName: 'Patient Name',
            width: 150,
            valueGetter: (value, row) => row?.user?.name || "User",
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130,
            valueGetter: (value, row) => row?.user?.phone || "-",
        },
        {
            field: 'testName',
            headerName: 'Lab Test',
            width: 220,
            valueGetter: (value, row) => row?.test?.name || "Lab Test",
        },
        {
            field: 'sampleType',
            headerName: 'Sample Type',
            width: 130,
            valueGetter: (value, row) => row?.test?.sampleType || "Blood",
        },
        {
            field: 'reportDelivery',
            headerName: 'Delivery Time',
            width: 140,
            valueGetter: (value, row) => row?.test?.reportDelivery || "24 Hours",
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 110,
            valueGetter: (value, row) => `₹${row?.price || row?.test?.price || 0}.00`,
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 140,
            renderCell: (params: any) => {
                const status = params?.row?.paymentStatus || params?.row?.paymetStatus || "pending";
                const isSuccess = status === "success";
                return (
                    <div className="flex items-center h-full">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                                isSuccess
                                    ? "bg-green-100 text-green-700 border border-green-300"
                                    : "bg-amber-100 text-amber-700 border border-amber-300"
                            }`}
                        >
                            {isSuccess ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                            {isSuccess ? "Paid" : "Pending"}
                        </span>
                    </div>
                );
            },
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params: any) => {
                const status = params?.row?.paymentStatus || params?.row?.paymetStatus || "pending";
                if (status === "pending") {
                    return (
                        <div className="flex items-center h-full">
                            <button
                                onClick={() => handlePayNow(params?.row?._id, params?.row?.price)}
                                className="bg-[#004097] hover:bg-[#003072] text-white text-xs px-3 py-1.5 rounded flex items-center gap-1 transition-all"
                            >
                                <CreditCard size={14} /> Pay Now
                            </button>
                        </div>
                    );
                }
                return (
                    <div className="flex items-center h-full text-xs text-gray-500">
                        Completed
                    </div>
                );
            },
        },
        {
            field: 'createdAt',
            headerName: 'Booked On',
            width: 160,
            valueGetter: (value, row) => {
                if (!row?.createdAt) return "-";
                try {
                    return new Date(row.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    });
                } catch {
                    return "-";
                }
            },
        },
    ];

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6 min-h-[75vh]">
                <div className="flex items-center justify-between pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">My Lab Test Bookings</h1>
                        <p className="text-sm text-gray-500">View and track all your booked laboratory tests and payment status</p>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : rows.length === 0 ? (
                    <div className="border border-gray-200 rounded-lg p-12 text-center bg-gray-50 my-6">
                        <p className="text-gray-600 text-lg font-medium">No lab test bookings found</p>
                        <p className="text-gray-400 text-sm mt-1">Book tests from the Lab Tests section to see them here.</p>
                    </div>
                ) : (
                    <Box sx={{ height: 600, width: '100%', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, p: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10, 20, 50]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                )}
            </div>
            <Footer />
        </>
    );
};

export default UserBookTestPage;
