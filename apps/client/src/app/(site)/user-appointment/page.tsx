"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading"
import { useState } from 'react';
import * as React from 'react';
import { orderListUser } from "apps/client/src/services/order"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"

const OrderHistorysPage = () => {

    const [loading, setLoading] = useState(false)

    const [row, setRow] = useState<any[]>([])

    const list = async () => {
        try {
            setLoading(true)
            const res = await orderListUser()
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
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'user',
            headerName: 'Name',
            width: 150,
            editable: true,
            valueGetter: (value: any) => value ? value.name : ""
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user ? row.user.phone : ""
        },

        {
            field: 'address',
            headerName: 'Shipping Address',
            rowHeader: true,
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 400,
            valueGetter: (value, row) => row?.shippingAddress || "",
        },
        {
            field: 'name',
            headerName: 'Product',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.items[0]?.product?.name || ""
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            editable: true,
            // valueGetter: (value, row) => row?.items[0]?.product?.image || ""
            renderCell:(params:any)=>(<img src={params.row.items[0].product.image} alt="" />)
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.items[0]?.product?.price || ""
        },




    ];

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between py-3'>
                    <h3 className="text-xl font-bold">Order History</h3>


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