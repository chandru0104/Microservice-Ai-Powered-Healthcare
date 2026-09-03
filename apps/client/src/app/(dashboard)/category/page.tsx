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
import { categoryList, CategoryAdd, categoryUpdate, categoryDelete } from "../../../services/productService"
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Category {
    name: string,
    _id: string,
}

const ProductsPage = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [rows, setRow] = useState<Category[]>([])
    const [name, setName] = useState("")
    const [editId, setEditId] = useState<Category | null>(null)
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen)
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await categoryUpdate(editId._id, name)
            } else {
                await CategoryAdd(name)
            }
        } catch (error: any) {
            alert(error.message)
        } finally {

        }
    }


    const handleList = async () => {
        try {
            setLoading(true)
            const row = await categoryList()

            const { data } = row

            const rowData = Array.isArray(data?.data) ? data.data : []
            const mapdata = rowData.map((item: any, index: number) => ({
                ...item,
                id: index + 1
            }))

            setRow(mapdata)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleList()
    }, [])

    const handleDelete = async (row: any) => {
        try {
            await categoryDelete(row._id)
            handleList()
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    const handleOpen = () => {
        setOpen(true)
        setName("")
        setEditId(null)
    }

    const handleOpenEdit = (row: any) => {
        setOpen(true)
        setName(row.name)
        setEditId(row)
    }


    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            renderCell: (params) => (
                <div className="flex items-center">
                    <button
                        type="button"
                        className="p-2 text-blue-900 hover:text-blue-700 cursor-pointer"
                        onClick={() => handleOpenEdit(params.row)}
                    >
                        <FiEdit3 size={20} />
                    </button>
                    <button
                        type="button"
                        className="p-2 text-red-900 hover:text-red-700 cursor-pointer"
                        onClick={() => handleDelete(params.row)}
                    >
                        <RiDeleteBin5Line size={20} />
                    </button>
                </div>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 500,
        }
    ];

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" >
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Origin" : "Add Origin"}</p>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
                <TextField
                    label='Name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <Button variant="contained" type='submit'>
                    {editId ? "Update" : "Submit"}
                </Button>
            </Box>
        </Box>
    );

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Origin</h3>
                <Button variant="contained" onClick={handleOpen}>
                    Add Child Category
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
                    pageSizeOptions={[5, 10, 20]}
                />
            </Box>
            }
        </div>
    );
};

export default ProductsPage;
