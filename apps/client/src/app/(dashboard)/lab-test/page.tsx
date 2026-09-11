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
import { listLabTestlabCategory, addLabTests } from "../../../services/labtest"
import { FiEdit3, FiTrash2 as RiDeleteBin5Line } from "react-icons/fi";
import Autocomplete from '@mui/material/Autocomplete';

interface AddLabTest {
    name: string,
    categoryId: string,
    price: string,
    sampleType: string,
    gender: string,
    ageGroup: string,
    reportDelivery: string,
    address: string,
    description: string,
    authorDetailsId: string
}

const LabTest = () => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRow] = useState<[]>([])
    const [loading, setLoading] = useState(false)
    const [editId, setEditId] = useState<string | null>(null)
    const [labCategory, setLabCategory] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [sampleType, setSampleType] = useState("")
    const [gender, setGender] = useState("")
    const [ageGroup, setAgeGroup] = useState("")
    const [reportDelivery, setReportDelivery] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [authorDetailsId, setAuthorDetailsId] = useState("")

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);

    };

    const addData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryId) {
            alert("Please select a Category from the dropdown");
            return;
        }
        try {
            const dataAdd = await addLabTests({
                name,
                categoryId,
                price,
                sampleType,
                gender,
                ageGroup,
                reportDelivery,
                address,
                description,
                authorDetailsId
            });
            setOpen(false);
            return dataAdd;
        } catch (error: any) {
            console.error("Error adding lab test:", error);
            alert(error?.response?.data?.message || error.message);
        }
    };

    const handleEdit = (data: any) => {
        setEditId(data.id)
    }
    const handleDelete = (data: any) => {

    }

    const labCategoryList = async () => {
        const list = await listLabTestlabCategory()
        const mapping = Array.isArray(list?.data?.data) ? list.data.data.map((items: any) => ({
            label: items.name,
            value: items._id || items.id
        })) : []

        setLabCategory(mapping)
        console.log("Categories mapped:", mapping)
    }

    const handleOpenAdd = () => {
        setOpen(true)
        labCategoryList()
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
            <Box component="form" onSubmit={addData} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
                <Autocomplete
                    disablePortal
                    options={labCategory}
                    sx={{ width: 300 }}
                    onChange={(event, newValue: any) => {
                        setCategoryId(newValue ? newValue.value : "");
                    }}
                    renderInput={(params) => <TextField {...params} label="Category" required />}
                />
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
                    label='Price'
                    name='price'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Sample Type'
                    name='sampleType'
                    placeholder='Enter Sample Type'
                    value={sampleType}
                    onChange={(e) => setSampleType(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Gender'
                    name='gender'
                    placeholder='Enter Gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Age Group'
                    name='ageGroup'
                    placeholder='Enter Age Group'
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Report Delivery'
                    name='reportDelivery'
                    placeholder='Enter Report Delivery'
                    value={reportDelivery}
                    onChange={(e) => setReportDelivery(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Address'
                    name='address'
                    placeholder='Enter Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Description'
                    name='description'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    label='Author Details Id'
                    name='authorDetailsId'
                    placeholder='Enter Author Details Id'
                    value={authorDetailsId}
                    onChange={(e) => setAuthorDetailsId(e.target.value)}
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
                <h3 className="text-xl font-bold">Lab Test</h3>
                <Button variant="contained" onClick={handleOpenAdd}>
                    Add Lab Test
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

export default LabTest;
