"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Loading } from "../../../../components/Loading"
import { useState } from 'react';
import * as React from 'react';
import { FaRegEye } from "react-icons/fa";
import { OrderHistory } from "../../../../services/orderHistory"
import { useRouter } from 'next/navigation';
import { IoTimeSharp } from 'react-icons/io5';
import { Row } from 'antd';
import row from 'antd/es/row';


const OrderHistorys = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [loading, setLoading] = useState(false)

    const [row, setRow] = useState<any[]>([])

    const list = async () => {
        try {
            setLoading(true)
            const res = await OrderHistory()
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
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user ? row.user.email : ""
        },

        {
            field: 'name',
            headerName: 'Product',
            rowHeader: true,
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 460,
            valueGetter: (value, row) => row?.items.map((list: any) => list.product.name) || "",
        },
        {
            field: 'categoryId',
            headerName: 'category',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.items[0]?.product?.categoryId?.name || ""
        },
        {
            field: 'subCategoryId',
            headerName: 'Sub Category',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.items[0]?.product?.subcategoryId?.name || ""
        },
        {
            field: 'variant',
            headerName: 'Variant',
            width: 150,
            editable: true,
            valueGetter: (value: any, row: any) => row?.items.map((items: any) => items.product.variant) || ""
        },
        {
            field: 'paymetStatus',
            headerName: 'Paymet Status',
            width: 150,
            editable: true,
        },
        {
            field: 'shippingAddress',
            headerName: 'Shipping Address',
            type: 'number',
            width: 400,
            editable: true,
        },
        {
            field: 'childCategoryId',
            headerName: 'Child Category',
            width: 150,
            valueGetter: (value, row) => row?.items[0]?.product.childCategoryId?.name || ""
        },
        {
            field: 'origin',
            headerName: 'Origin',
            width: 150,
            valueGetter: (value, row) => row?.items[0].product.originId.name || ""
        },
        {
            field: 'brandId',
            headerName: 'Brand',
            width: 150,
            valueGetter: (value, row) => row?.items[0].product.brandId.name || ""
        },
        {
            field: 'ageGroupId',
            headerName: 'Age Group',
            width: 150,
            valueGetter: (value, row) => row?.items[0].product.ageGroupId.name || ""
        },
        {
            field: 'returnPolicy',
            headerName: 'Return Policy',
            width: 150,
            valueGetter: (value, row) => row.items.map((item: any) => item.product.returnPolicy)
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 150,
            valueGetter: (value, row) => row.items.map((item: any) => item.product.stock)
        },


    ];

    return (
        <div className='w-full'>
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
    );
};

export default OrderHistorys;