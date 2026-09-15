"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Loading } from "../../../components/Loading"
import { useState } from 'react';
import * as React from 'react';

import { OrderHistory } from "../../../services/orderHistory"







const OrderHistorys = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [loading, setLoading] = useState(false)

    const [rows, setRows] = useState("")

    const list = async () => {
        try {
            setLoading(true)
            const res = await OrderHistory()
            const mapping = Array.isArray(res?.data.data) ? res?.data.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : []
            setRows(mapping)
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
            valueGetter:(value:any)=>value? value.name : ""
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            rowHeader: true,
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Order History</h3>


            </div>
            {loading ? <Loading /> : <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[10]}
                />
            </Box>
            }
        </div>
    );
};

export default OrderHistorys;