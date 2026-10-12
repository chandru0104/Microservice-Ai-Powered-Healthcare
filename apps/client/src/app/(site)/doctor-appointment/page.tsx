"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading";
import { useState, useEffect } from 'react';
import * as React from 'react';
import { getDoctorAppointmentList } from "apps/client/src/services/appointment";
import Footer from "apps/client/src/components/Footer";
import Navbar from "apps/client/src/components/Navbar";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const DoctorAppointmentPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [row, setRow] = useState<any[]>([]);

    const fetchAppointments = async () => {
        try {
            const doctorId = typeof window !== "undefined" ? localStorage.getItem("doctorId") : null;
            if (!doctorId) {
                router.push("/doctor-login");
                return;
            }

            setLoading(true);
            const res = await getDoctorAppointmentList(doctorId);
            const mapping = Array.isArray(res?.data?.data) ? res.data.data.map((item: any, index: number) => ({
                ...item,
                id: index + 1
            })) : [];
            setRow(mapping);
        } catch (error: any) {
            console.error("Error fetching doctor appointments:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'user',
            headerName: 'Name',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user ? row.user.name : ""
        },
        {
            field: 'userEmail',
            headerName: 'User Email',
            width: 250,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user?.email || ""
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130,
            valueGetter: (value, row) => row?.phone || (row?.user ? row.user.phone : ""),
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.doctor?.name || ""
        },
        {
            field: 'doctorEmail',
            headerName: 'Doctor Email',
            width: 200,
            editable: true,
            valueGetter: (value, row) => row?.doctor?.email || ""
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 130,
            editable: true,
            valueGetter: (value, row) => {
                if (!row?.date) return "";
                const parsed = dayjs(row.date);
                return parsed.isValid() ? parsed.format("DD/MM/YYYY") : row.date;
            }
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 120,
            editable: true,
            valueGetter: (value, row) => {
                if (!row?.time) return "";
                const parsed = dayjs(row.time);
                return parsed.isValid() ? parsed.format("hh:mm A") : row.time;
            }
        },
        {
            field: 'fees',
            headerName: 'Fees',
            width: 120,
            editable: true,
            valueGetter: (value, row) => row?.fees ? `${row.fees} Rs` : ""
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 150,
            editable: true,
            renderCell: (params: any) => {
                const status = (params?.row?.payment || params?.row?.paymetStatus || params?.row?.paymentStatus || "pending").toLowerCase();
                if (status === "paid" || status === "success") {
                    return (
                        <div className="flex items-center h-full">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                                Paid
                            </span>
                        </div>
                    );
                } else if (status === "failed") {
                    return (
                        <div className="flex items-center h-full">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                                Failed
                            </span>
                        </div>
                    );
                }
                return (
                    <div className="flex items-center h-full">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                            Pending
                        </span>
                    </div>
                );
            }
        },
    ];

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between py-3'>
                    <h3 className="text-xl font-bold">Appointment History</h3>
                </div>
                {loading ? <Loading /> : <Box sx={{ height: 800, width: '100%' }}>
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
                    />
                </Box>
                }
            </div>
            <Footer />
        </>
    );
};

export default DoctorAppointmentPage;
