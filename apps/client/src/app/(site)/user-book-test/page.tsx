"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading"
import { useState } from 'react';
import * as React from 'react';
import { userBookingList } from "apps/client/src/services/labtest"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"

const OrderHistorysPage = () => {

    const [loading, setLoading] = useState(false)

    const [row, setRow] = useState<any[]>([])

    const list = async () => {
        try {
            setLoading(true)
            const res = await userBookingList()
            const mapping = Array.isArray(res?.data.data) ? res?.data.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : []
            setRow(mapping)
        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        list()
    }, [])


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 80 },
        {
            field: 'user',
            headerName: 'Patient Name',
            width: 170,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user?.name || "User"
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user?.phone || "-"
        },
        {
            field: 'test',
            headerName: 'Lab Test Name',
            width: 240,
            editable: true,
            valueGetter: (value: any, row: any) => row?.test?.name || "Lab Test"
        },
        {
            field: 'sampleType',
            headerName: 'Sample Type',
            width: 140,
            editable: true,
            valueGetter: (value: any, row: any) => row?.test?.sampleType || "-"
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 130,
            editable: true,
            valueGetter: (value: any, row: any) => `${row?.price || row?.test?.price || 0}.00 Rs`
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 150,
            editable: true,
            renderCell: (params: any) => {
                const status = params?.row?.paymentStatus || params?.row?.paymetStatus || "pending";
                return status === "success" ? (
                    <div className='bg-green-500 text-white mt-3 rounded-md h-[28px] px-3 flex items-center justify-center font-medium capitalize'>
                        success
                    </div>
                ) : (
                    <div className='bg-amber-500 text-white mt-3 rounded-md h-[28px] px-3 flex items-center justify-center font-medium capitalize'>
                        pending
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
                    <h3 className="text-xl font-bold">Book Test History</h3>
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

export default OrderHistorysPage;