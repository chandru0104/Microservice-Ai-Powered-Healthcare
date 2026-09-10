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
import { addLabTestlabCategory, updateLabTestlabCategory, listLabTestlabCategory,deleteLabTestlabCategory } from "../../../services/labtest"
import { FiEdit3, FiTrash2 as RiDeleteBin5Line } from "react-icons/fi";



const LabTestCategory = () => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRow] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [editId, setEditId] = useState<string | null>(null)
    const [description, setDescription] = useState("")
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            setEditId(null);
            setName("");
            setDescription("")
        }
    };

    const handleOpenAdd = () => {
        setEditId(null);
        setName("");
        setDescription("")
        setOpen(true);
    };

    const submitLabTestCategory = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();
        try {
            if (editId) {
                let payload = { name, description }
                const edit = await updateLabTestlabCategory(editId, payload)
                setOpen(false)
                listTestCategory()
                return edit

            } else {
                let payload = { name, description }
                const add = await addLabTestlabCategory(payload)
                setOpen(false)
                listTestCategory()
                return add
            }

        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const listTestCategory = async () => {
        try {
            setLoading(true)
            const list = await listLabTestlabCategory()

            const arrayData = Array.isArray(list?.data.data) ? list?.data.data : []

            const mappingData = arrayData.map((data: any, index: any) => ({
                ...data,
                id: index + 1

            }))
            console.log("mappingData : ", mappingData)
            return setRow(mappingData)
        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        listTestCategory()
    }, [])


    const handleEdit = (data: any) => {
        setOpen(true)
        setEditId(data._id)
        setName(data.name)
        setDescription(data.description)


    }
    const handleDelete = (data: any) => {
      try{
       const deleteItem = deleteLabTestlabCategory(data._id)
        listTestCategory()
       return deleteItem
      }catch(error:any){
        alert(error.message)
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
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 500,
        }
    ];

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" >
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Origin" : "Add Origin"}</p>
            <Box component="form" onSubmit={submitLabTestCategory} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
                <TextField
                    label='Name'
                    name='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Description'
                    name='description'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                />
                <Button variant="contained" type='submit' loading={loading}>
                    {editId ? "Update" : "Submit"}
                </Button>
            </Box>
        </Box>
    );

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Lab Test Category</h3>
                <Button variant="contained" onClick={handleOpenAdd}>
                    Add Lab Category
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

export default LabTestCategory;
