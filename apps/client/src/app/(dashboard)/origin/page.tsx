"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Loading } from "../../../components/Loading"
import { useState, useEffect } from 'react';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import { OriginList } from "../../../services/productService"
import { AddOrgin } from "../../../services/productService"
interface Origin {
    id: string | number,
    name: string,
    _id?: string,
}




const ProductsPage = () => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRow] = useState<Origin[]>([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const getData = async () => {
        try {
            setLoading(true)

            const dataOrigin = await OriginList()
            const { data } = dataOrigin
            const originArray = Array.isArray(data?.data) ? data.data : []
            const mappedData = originArray.map((item: any, index: number) => ({
                ...item,
                id: index + 1,
            }))
            setRow(mappedData)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const submitOrigin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name) {
            alert("Please provide name")
            return
        }
        try {
            await AddOrgin(name)
            setOpen(false)
            setName("")
            getData()
        } catch (error: any) {
            alert(error.message)
        }
    }

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 500,
            editable: true,
        }
    ];

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" >
            <p className="p-2 font-semibold">Origin Add</p>
            <Box component="form" onSubmit={submitOrigin} sx={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px" }}>
                <TextField
                    label='name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button type='submit'>Submit</Button>
            </Box>
        </Box>
    );
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 >Origin</h3>
                <Button onClick={toggleDrawer(true)}>
                    Add Origin
                    <AddIcon />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                    {DrawerList}
                </Drawer>
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

export default ProductsPage;