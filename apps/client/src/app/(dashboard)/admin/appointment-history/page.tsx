"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "../../../../components/Loading";
import { useState } from 'react';
import * as React from 'react';
import { getAllAppoinmentLits } from "../../../../services/appointment";

import dayjs from "dayjs";

const AppointmentHistoryPage = () => {

    const [loading, setLoading] = useState(false);

    const [row, setRow] = useState<any[]>([]);

    const list = async () => {
        try {
            setLoading(true);
            const res = await getAllAppoinmentLits();
            const mapping = Array.isArray(res?.data?.data) ? res.data.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : [];
            setRow(mapping);
        } catch (error: any) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    React.useEffect(() => {
        list();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'user',
            headerName: 'Name',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user ? row.user.name : ""
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user ? row.user.email : ""
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.phone || (row?.user ? row.user.phone : "")
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.doctor ? row.doctor.name : ""
        },
        {
            field: 'doctorEmail',
            headerName: 'Doctor Email',
            width: 200,
            editable: true,
            valueGetter: (value: any, row: any) => row?.doctor ? row.doctor.email : ""
        },
        {
            field: 'specialties',
            headerName: 'Specialties',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.doctor ? row.doctor.specialties : ""
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 130,
            editable: true,
            valueGetter: (value: any, row: any) => {
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
            valueGetter: (value: any, row: any) => {
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
            valueGetter: (value: any, row: any) => row?.fees ? `₹${row.fees}` : ""
        },
        {
            field: 'payment',
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
        <div className='w-full'>
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
    );
};

export default AppointmentHistoryPage;
