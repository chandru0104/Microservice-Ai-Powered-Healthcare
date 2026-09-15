"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Loading } from "../../../../components/Loading"
import { useState, useEffect } from 'react';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import { ageGroupAdd, ageGroupList, ageGroupUpdate, ageGroupDelete } from "../../../../services/productService"
import { FiEdit3, FiTrash2 as RiDeleteBin5Line } from "react-icons/fi";

interface Origin {
    id: string | number,
    name: string,
    _id?: string,
}

const ProductsAgeGroup = () => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRow] = useState<Origin[]>([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [editId, setEditId] = useState<string | null>(null)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            setEditId(null);
            setName("");
        }
    };

    const handleOpenAdd = () => {
        setEditId(null);
        setName("");
        setOpen(true);
    };


    const list = async () => {
        try {
            setLoading(true)
            const list = await ageGroupList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any, index: any) => ({
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

    useEffect(() => {
        list()
    }, [])

    const submitOrigin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editId) {
                const edit = await ageGroupUpdate(editId, name)
                setOpen(false)
                list()
                return edit
            } else {
                const add = await ageGroupAdd(name)
                setOpen(false)
                list()
                return add
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }


    const handleEdit = (data: any) => {
        setEditId(data._id)
        setName(data.name)
        setOpen(true)
    }

    const handleDelete = async (data: any) => {
        try {
            await ageGroupDelete(data._id)
            list()
        } catch (error: any) {
            console.error(error.message)
        }
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
                        onClick={() => handleEdit(params.row)}
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
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Product Age Group" : "Add Product Age Group"}</p>
            <Box component="form" onSubmit={submitOrigin} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
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
                <h3 className="text-xl font-bold">Product Age Group</h3>
                <Button variant="contained" onClick={handleOpenAdd}>
                    Add Product Age Group
                    <AddIcon />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                    {DrawerList}
                </Drawer>
            </div>
            {loading ? <Loading /> : <Box sx={{ height: 800, width: '100%' }}>
                <DataGrid
                    rows={rows}
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

export default ProductsAgeGroup;
