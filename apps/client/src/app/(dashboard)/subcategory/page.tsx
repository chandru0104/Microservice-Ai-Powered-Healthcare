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
import { OriginList, AddOrgin, UpdateOrigin, DeleteOrigin } from "../../../services/productService"
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

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
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const submitOrigin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) {
            alert("Please provide name")
            return
        }
        try {
            if (editId) {
                await UpdateOrigin(editId, name)
            } else {
                await AddOrgin(name)
            }
            setOpen(false)
            setEditId(null)
            setName("")
            getData()
        } catch (error: any) {
            alert(error.message)
        }
    }

    const handleEdit = (row: any) => {
        setEditId(row._id || row.id)
        setName(row.name)
        setOpen(true)
    }

    const handleDelete = async (row: any) => {
        const id = row._id || row.id
        if (confirm(`Are you sure you want to delete "${row.name}"?`)) {
            try {
                await DeleteOrigin(id)
                getData()
            } catch (error: any) {
                alert(error.message)
            }
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
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Origin" : "Add Origin"}</p>
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
                <h3 className="text-xl font-bold">Origin</h3>
                <Button variant="contained" onClick={handleOpenAdd}>
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
                    pageSizeOptions={[5, 10, 20]}
                />
            </Box>
            }
        </div>
    );
};

export default ProductsPage;
