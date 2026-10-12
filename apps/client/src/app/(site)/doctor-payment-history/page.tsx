"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading";
import { useState, useEffect } from 'react';
import * as React from 'react';
import { paymentDoctorList } from "apps/client/src/services/appointment";
import Footer from "apps/client/src/components/Footer";
import Navbar from "apps/client/src/components/Navbar";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const DoctorPaymentHistoryPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [row, setRow] = useState<any[]>([]);

    const fetchPaymentHistory = async () => {
        try {
            const doctorId = typeof window !== "undefined" ? localStorage.getItem("doctorId") : null;
            if (!doctorId) {
                router.push("/doctor-login");
                return;
            }

            setLoading(true);
            const res = await paymentDoctorList(doctorId);
            const rawList = Array.isArray(res?.data?.data) ? res.data.data : [];
            const mappedRows = rawList.map((item: any, index: number) => ({
                ...item,
                id: index + 1
            }));
            setRow(mappedRows);
        } catch (error: any) {
            console.error("Error fetching doctor payment history:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'patientName',
            headerName: 'Patient Name',
            width: 160,
            valueGetter: (value: any, row: any) => row?.user?.name || "N/A"
        },
        {
            field: 'patientEmail',
            headerName: 'Patient Email',
            width: 220,
            valueGetter: (value: any, row: any) => row?.user?.email || "N/A"
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 140,
            valueGetter: (value: any, row: any) => row?.user?.phone || "N/A"
        },
        {
            field: 'receipt',
            headerName: 'Appointment ID',
            width: 230,
            valueGetter: (value: any, row: any) => row?.receipt || "N/A"
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 130,
            valueGetter: (value: any, row: any) => row?.amount ? `₹${row.amount}` : "₹0"
        },
        {
            field: 'currency',
            headerName: 'Currency',
            width: 100,
            valueGetter: (value: any, row: any) => row?.currency || "INR"
        },
        {
            field: 'date',
            headerName: 'Payment Date',
            width: 180,
            valueGetter: (value: any, row: any) => {
                if (!row?.createdAt) return "N/A";
                const parsed = dayjs(row.createdAt);
                return parsed.isValid() ? parsed.format("DD/MM/YYYY hh:mm A") : row.createdAt;
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            renderCell: () => (
                <div className="flex items-center h-full">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                        Paid
                    </span>
                </div>
            )
        }
    ];

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between py-3'>
                    <h3 className="text-xl font-bold">Payment History</h3>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <Box sx={{ height: 800, width: '100%' }}>
                        <DataGrid
                            rows={row}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 20,
                                    },
                                },
                            }}
                            pageSizeOptions={[20, 50, 100]}
                            disableRowSelectionOnClick
                        />
                    </Box>
                )}
            </div>
            <Footer />
        </>
    );
};

export default DoctorPaymentHistoryPage;
