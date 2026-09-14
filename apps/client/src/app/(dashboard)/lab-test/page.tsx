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
import { listLabTestlabCategory, addLabTests, UpdatelabTest, listLabTest, deletelabTest } from "../../../services/labtest"
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
    const [editId, setEditId] = useState<string | boolean>(false)
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

    const listData = async () => {
        try {
            setLoading(true)

            const list = await listLabTest()
            const mappingData = Array.isArray(list?.data?.data) ? list.data.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : []
            setRow(mappingData)

        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        listData()
    }, [])

    const addData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!categoryId) {
            alert("Please select a Category from the dropdown");
            return;
        }
        try {
            if (editId) {
                const dataUpdate = await UpdatelabTest({
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
                }, editId);
                listData()
                setOpen(false);
                return dataUpdate;
            } else {
                const addData = await addLabTests({
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
                })
                listData()
                setOpen(false)
                return addData
            }
        } catch (error: any) {
            console.error("Error adding lab test:", error);
            alert(error?.response?.data?.message || error.message);
        }
    };
    const labCategoryList = async () => {
        try {
            const list = await listLabTestlabCategory()
            const rawData = Array.isArray(list?.data?.data) ? list.data.data : [];
            const seen = new Set<string>();
            const mapping: { label: string; value: string }[] = [];

            for (const item of rawData) {
                const val = String(item._id || item.id || "");
                if (val && !seen.has(val)) {
                    seen.add(val);
                    mapping.push({
                        label: item.name || item.label || "",
                        value: val
                    });
                }
            }

            setLabCategory(mapping as any)
            console.log("Categories mapped:", mapping)
        } catch (error) {
            console.error("Error fetching lab categories:", error);
        }
    }

    React.useEffect(() => {
        listData();
        labCategoryList();
    }, [])

    const handleOpenAdd = () => {
        setEditId(false)
        setCategoryId("")
        setName("")
        setPrice("")
        setSampleType("")
        setGender("")
        setAgeGroup("")
        setReportDelivery("")
        setAddress("")
        setDescription("")
        setAuthorDetailsId("")
        setOpen(true)
        labCategoryList()
    }

    const handleEdit = (data: any) => {
        labCategoryList()
        setEditId(data._id || data.id)
        setCategoryId(data.categoryId?._id || "")
        setPrice(data.price ? String(data.price) : "")
        setName(data.name || "")
        setSampleType(data.sampleType || "")
        setGender(data.gender || "")
        setAgeGroup(data.ageGroup || "")
        setReportDelivery(data.reportDelivery || "")
        setAddress(data.address || "")
        setDescription(data.description || "")
        setAuthorDetailsId(data.authorDetailsId || "")
        setOpen(true)
    }

    const handleDelete = async (data: any) => {
        try {
            setLoading(false)
            const deleteData = await deletelabTest(data._id)
            await listData();
            await labCategoryList();
            return deleteData
        } catch (error: any) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    } 

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'action',
            headerName: 'Action',
            width: 100,
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
            field: 'categoryId',
            headerName: 'Category',
            width: 300,
            valueGetter: (value: any) => value ? value.name : ""
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
        },

        {
            field: 'sampleType',
            headerName: 'Sample Type',
            width: 150,
        },

        {
            field: 'ageGroup',
            headerName: 'Age Group',
            width: 150,
        },
        {
            field: 'reportDelivery',
            headerName: 'Report Delivery',
            width: 200,
        },

        {
            field: 'address',
            headerName: 'Address',
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
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Lab Test" : "Add Lab Test"}</p>
            <Box component="form" onSubmit={addData} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
                <Autocomplete
                    disablePortal
                    options={labCategory}
                    getOptionKey={(option: any) => option.value}
                    getOptionLabel={(option: any) => option.label || ""}
                    value={labCategory.find((item: any) => item.value === categoryId) || null}
                    isOptionEqualToValue={(option: any, val: any) => option.value === (val?.value || val)}
                    sx={{ width: 320 }}
                    onChange={(event, newValue: any) => {
                        setCategoryId(newValue ? newValue.value : "");
                    }}
                    renderOption={(props, option: any) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key || option.value} {...optionProps}>
                                {option.label}
                            </li>
                        );
                    }}
                    renderInput={(params) => <TextField {...params} label="Category" required={!categoryId} />}
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

export default LabTest;
