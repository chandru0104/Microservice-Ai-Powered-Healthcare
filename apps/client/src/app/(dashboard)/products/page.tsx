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
import { OriginList, childCategoryList, subCategoryList, productCategoryList, brandList, ageGroupList, productAdds, productList, productView, productUpdate, productDelete } from "../../../services/productService"
import { FiEdit3, FiTrash2 as RiDeleteBin5Line } from "react-icons/fi";
import Autocomplete from '@mui/material/Autocomplete';
import Grid from "@mui/material/Grid"



const ProductsPage = () => {
    const [open, setOpen] = React.useState(false);
    const [rows, setRow] = useState<[]>([])
    const [loading, setLoading] = useState(false)


    const [brandOptions, setBrandOptions] = useState<{ value: string; label: string }[]>([])
    const [originOptions, setOriginOptions] = useState<{ value: string; label: string }[]>([])
    const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])
    const [childCategoryOptions, setChildCategoryOptions] = useState<{ value: string; label: string }[]>([])
    const [subCategoryOptions, setSubCategoryOptions] = useState<{ value: string; label: string }[]>([])
    const [ageGroupOptions, setAgeGroupOptions] = useState<{ value: string; label: string }[]>([])

    // Selected Form Values
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [returnPolicy, setReturnPolicy] = useState("")
    const [benefit, setBenefit] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [variant, setVariant] = useState("")
    const [stock, setStock] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [editId, setEditId] = useState<string | null>(null)

    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const [selectedOrigin, setSelectedOrigin] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedChildCategory, setSelectedChildCategory] = useState<string>("")
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("")

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


    //options api

    const originList = async () => {
        try {
            const list = await OriginList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any) => ({
                value: items._id || items.id,
                label: items.name
            })) : []
            setOriginOptions(mapping)
        } catch (error: any) {
            alert(error.message)
        }
    }

    const childCategoryLists = async () => {
        try {
            const list = await childCategoryList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((item: any) => ({
                value: item._id || item.id,
                label: item.name
            })) : []
            setChildCategoryOptions(mapping)

        } catch (error: any) {
            alert(error.message)
        }
    }

    const subCategoryLists = async () => {
        try {
            const list = await subCategoryList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any) => ({
                value: items._id || items.id,
                label: items.name
            })) : []
            setSubCategoryOptions(mapping)
        } catch (error: any) {
            alert(error.message)
        }
    }


    const productCategoryLists = async () => {
        try {
            const list = await productCategoryList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any) => ({
                value: items._id || items.id,
                label: items.name
            })) : []
            setCategoryOptions(mapping)
        } catch (error: any) {
            alert(error.message)
        }
    }


    const brandLists = async () => {
        try {
            const list = await brandList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any) => ({
                value: items._id || items.id,
                label: items.name
            })) : []
            setBrandOptions(mapping)
        } catch (error: any) {
            alert(error.message)
        }
    }


    const ageGroupLists = async () => {
        try {
            const list = await ageGroupList()
            const mapping = Array.isArray(list?.data?.data) ? list?.data.data.map((items: any) => ({
                value: items._id || items.id,
                label: items.name
            })) : []
            setAgeGroupOptions(mapping)
        } catch (error: any) {
            alert(error.message)
        }
    }

    useEffect(() => {
        originList()
        childCategoryLists()
        subCategoryLists()
        productCategoryLists()
        brandLists()
        ageGroupLists()
    }, [])


    const submitOrigin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (editId) {
                const payload = {
                    name,
                    description,
                    price: Number(price),
                    expiryDate,
                    benefit,
                    returnPolicy,
                    variant,
                    stock: Number(stock),
                    categoryId: selectedCategory,
                    subcategoryId: selectedSubCategory,
                    childCategoryId: selectedChildCategory,
                    brandId: selectedBrand,
                    originId: selectedOrigin,
                    ageGroupId: selectedAgeGroup,
                    file
                }
                const update = await productUpdate(editId, payload)
                alert("Product updated successfully!")
                setOpen(false)
                setName("")
                setDescription("")
                setPrice("")
                setExpiryDate("")
                setBenefit("")
                setReturnPolicy("")
                setVariant("")
                setStock("")
                setSelectedCategory("")
                setSelectedSubCategory("")
                setSelectedChildCategory("")
                setSelectedBrand("")
                setSelectedOrigin("")
                setSelectedAgeGroup("")
                setFile(null)
            } else {

                const payload = {
                    name,
                    description,
                    price: Number(price),
                    expiryDate,
                    benefit,
                    returnPolicy,
                    variant,
                    stock: Number(stock),
                    categoryId: selectedCategory,
                    subcategoryId: selectedSubCategory,
                    childCategoryId: selectedChildCategory,
                    brandId: selectedBrand,
                    originId: selectedOrigin,
                    ageGroupId: selectedAgeGroup,
                    file
                }
                const add = await productAdds(payload)
                alert("Product added successfully!")
                setOpen(false)

                setName("")
                setDescription("")
                setPrice("")
                setExpiryDate("")
                setBenefit("")
                setReturnPolicy("")
                setVariant("")
                setStock("")
                setSelectedCategory("")
                setSelectedSubCategory("")
                setSelectedChildCategory("")
                setSelectedBrand("")
                setSelectedOrigin("")
                setSelectedAgeGroup("")
                setFile(null)
            }
            return add
        } catch (error: any) {
            console.log(error.message)
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }


    const handleDelete = async (data: any) => {
        try {

            await productDelete(data._id)

        } catch (error: any) {
            throw new Error(error.message)
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
            field: 'name',
            headerName: 'Name',
            width: 300,
        },
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'returnPolicy',
            headerName: 'Return Policy',
            width: 100,
        },
        {
            field: 'brand',
            headerName: 'Brand',
            width: 100,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 250,
        },
        {
            field: 'ageGroup',
            headerName: 'Age Group',
            width: 100,
        }
    ];



    const DrawerList = (
        <Box sx={{ width: 700 }} role="presentation" >
            <p className="p-4 font-semibold text-lg">{editId ? "Edit Products" : "Add Products"}</p>
            <Box component="form" onSubmit={submitOrigin} sx={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
                <p>Select Product Require Options</p>
                <Grid container spacing={0}>
                    <Grid size={6} >
                        <div >
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={categoryOptions}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedCategory(newValue ? newValue.value : "")
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Category" required />}
                                />
                            </div>
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={childCategoryOptions}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedChildCategory(newValue.value)
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Childcategory" required />}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div>
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={brandOptions}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedBrand(newValue ? newValue.value : "")
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Brand" required />}
                                />
                            </div>
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={ageGroupOptions}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedAgeGroup(newValue ? newValue.value : "")
                                    }}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Age Group" required />}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div>
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={subCategoryOptions}
                                    sx={{ width: 300 }}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedSubCategory(newValue ? newValue.value : "")
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Subcategory" required />}
                                />
                            </div>
                            <div className='p-2'>
                                <Autocomplete
                                    disablePortal
                                    options={originOptions}
                                    sx={{ width: 300 }}
                                    getOptionKey={(option: any) => option.value}
                                    getOptionLabel={(option: any) => option.label || ""}
                                    onChange={(_, newValue: any) => {
                                        setSelectedOrigin(newValue ? newValue.value : "")
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Origin" required />}
                                />
                            </div>
                        </div>
                    </Grid>


                </Grid>
                <p>Fill Product Require Details</p>
                <Grid container >
                    <Grid size={6}>
                        <div>
                            <div className='p-2'>
                                <TextField
                                    label='Name'
                                    name='name'
                                    placeholder='Enter name'
                                    value={name}
                                    sx={{ width: 300 }}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                            <div className='p-2'>
                                <TextField
                                    label='Description'
                                    name='description'
                                    placeholder='Description'
                                    value={description}
                                    sx={{ width: 300 }}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                            <div className='p-2'>

                                <TextField
                                    label='Price'
                                    name='price'
                                    placeholder='Price'
                                    type='number'
                                    value={price}
                                    sx={{ width: 300 }}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                            <div className='p-2'>
                                <TextField
                                    label='Variant'
                                    name='variant'
                                    placeholder='e.g., 500mg, 100ml'
                                    value={variant}
                                    sx={{ width: 300 }}
                                    onChange={(e) => setVariant(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </div>

                    </Grid>

                    <Grid size={6}>
                        <div className='p-2'>
                            <TextField
                                label='Expiry Date'
                                name='expiryDate'
                                placeholder='Expiry Date'
                                value={expiryDate}
                                sx={{ width: 300 }}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                                fullWidth
                            />
                        </div>
                        <div className='p-2'>
                            <TextField
                                label='Benefit'
                                name='benefit'
                                placeholder='Benefit'
                                value={benefit}
                                sx={{ width: 300 }}
                                onChange={(e) => setBenefit(e.target.value)}
                                required
                                fullWidth
                            />
                        </div>
                        <div className='p-2'>
                            <TextField
                                label='Return Policy'
                                name='returnPolicy'
                                placeholder='Return Policy'
                                value={returnPolicy}
                                sx={{ width: 300 }}
                                onChange={(e) => setReturnPolicy(e.target.value)}
                                required
                                fullWidth
                            />
                        </div>
                        <div className='p-2'>
                            <TextField
                                label='Stock'
                                name='stock'
                                placeholder='Stock count'
                                type='number'
                                value={stock}
                                sx={{ width: 300 }}
                                onChange={(e) => setStock(e.target.value)}
                                required
                                fullWidth
                            />
                        </div>
                    </Grid>
                </Grid>
                <div className='h-[100px]  m-2'>
                    <p className='pt-2'>Porduct image </p>
                    <input type="file" name='files' onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
                <Button variant="contained" type='submit' disabled={loading}>
                    {loading ? "Loading..." : editId ? "Update" : "Submit"}
                </Button>
            </Box>
        </Box>
    );

    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Products</h3>
                <Button variant="contained" onClick={handleOpenAdd}>
                    Add Products
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

export default ProductsPage;
