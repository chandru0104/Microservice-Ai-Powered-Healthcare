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
import { OriginList, childCategoryList, subCategoryList, productCategoryList, brandList, ageGroupList, productAdds, productList, productUpdate, productDelete } from "../../../../services/productService"
import { FiEdit3, FiTrash2 as RiDeleteBin5Line, FiUploadCloud, FiX, FiImage } from "react-icons/fi";
import Autocomplete from '@mui/material/Autocomplete';
import Grid from "@mui/material/Grid"
import Image from 'next/image';


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
    const [files, setFiles] = useState<File[]>([])
    const [editId, setEditId] = useState<string | null>(null)

    const [selectedBrand, setSelectedBrand] = useState<string>("")
    const [selectedOrigin, setSelectedOrigin] = useState<string>("")
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedChildCategory, setSelectedChildCategory] = useState<string>("")
    const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")
    const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("")

    const [existingImages, setExistingImages] = useState<string[]>([]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setEditId(null);
        setName("");
        setDescription("");
        setPrice("");
        setExpiryDate("");
        setBenefit("");
        setReturnPolicy("");
        setVariant("");
        setStock("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedChildCategory("");
        setSelectedBrand("");
        setSelectedOrigin("");
        setSelectedAgeGroup("");
        setFiles([]);
        setExistingImages([]);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        if (!newOpen) {
            resetForm();
        }
    };

    const handleOpenAdd = () => {
        resetForm();
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
            console.error(error.message)
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
            console.error(error.message)
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
            console.error(error.message)
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
            console.error(error.message)
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
            console.error(error.message)
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
            console.error(error.message)
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


    const list = async () => {
        try {
            setLoading(true)

            const listData = await productList()

            const mapping = Array.isArray(listData?.data?.data) ? listData.data.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : []
            setRow(mapping)
        } catch (error: any) {
            console.log(error.message)
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
            setLoading(true)

            const payload: any = {
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
                files: files.length > 0 ? files : undefined,
            }

            if (editId) {
                await productUpdate(editId, payload)
            } else {
                await productAdds(payload)
            }

            setOpen(false)
            resetForm()
            list()

        } catch (error: any) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    const handleDelete = async (data: any) => {
        try {

            await productDelete(data._id)
            list()

        } catch (error: any) {
            console.log(error.message)
        }
    }

    const handleEdit = async (data: any) => {
        setOpen(true)
        setEditId(data._id)
        setName(data.name || "")
        setDescription(data.description || "")
        setPrice(data.price ?? "")
        setExpiryDate(data.expiryOn || "")
        setBenefit(data.benefit || "")
        setReturnPolicy(data.returnPolicy || "")
        setVariant(data.variant || "")
        setStock(data.stock ?? "")
        setSelectedCategory(data.categoryId?._id || "")
        setSelectedSubCategory(data.subcategoryId?._id || "")
        setSelectedChildCategory(data.childCategoryId?._id || "")
        setSelectedBrand(data.brandId?._id || "")
        setSelectedOrigin(data.originId?._id || "")
        setSelectedAgeGroup(data.ageGroupId?._id || "")
        setFiles([])
        const currentImgs = Array.isArray(data.image) ? data.image : (data.image ? [data.image] : [])
        setExistingImages(currentImgs)
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
            width: 170,
            renderCell: (params: any) => {
                const images: string[] = Array.isArray(params.row?.image)
                    ? params.row.image
                    : (params.row?.image ? [params.row.image] : []);

                if (!images.length) {
                    return <span className="text-xs text-slate-400 italic">No image</span>;
                }

                return (
                    <div className="flex gap-2 items-center h-full overflow-x-auto py-1">
                        {images.map((im: any, index: number) => (
                            <Image
                                key={index}
                                src={im}
                                alt="Product"
                                width={50}
                                height={50}
                                className="w-[50px] h-[50px] rounded-lg object-cover shadow-sm shrink-0 border border-slate-200"
                            />
                        ))}
                    </div>
                );
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'returnPolicy',
            headerName: 'Return Policy',
            width: 140,
        },
        {
            field: 'brandId',
            headerName: 'Brand',
            width: 200,
            renderCell: (params: any) => params?.value?.name
        },
        {
            field: 'categoryId',
            headerName: 'Category',
            width: 250,
            renderCell: (params: any) => params?.value?.name

        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 100,
        }
    ];



    const DrawerList = (
        <Box sx={{ width: 700, p: 3, height: '100%', overflowY: 'auto' }} role="presentation" >
            <p className="pb-3 font-semibold text-xl text-slate-800 border-b border-slate-100">{editId ? "Edit Product" : "Add Product"}</p>
            <Box component="form" onSubmit={submitOrigin} sx={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "16px" }}>
                <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Select Product Options</p>
                    <Grid container spacing={2}>
                        <Grid size={6} >
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={categoryOptions}
                                        value={categoryOptions.find((option: any) => option.value === selectedCategory) || null}
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedCategory(newValue ? newValue.value : "")
                                        }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Category" required={!selectedCategory} />}
                                    />
                                </div>
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={childCategoryOptions}
                                        value={childCategoryOptions.find((option: any) => option.value === selectedChildCategory) || null}
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedChildCategory(newValue ? newValue.value : "")
                                        }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Childcategory" required={!selectedChildCategory} />}
                                    />
                                </div>
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={subCategoryOptions}
                                        value={subCategoryOptions.find((option: any) => option.value === selectedSubCategory) || null}
                                        fullWidth
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedSubCategory(newValue ? newValue.value : "")
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Subcategory" required={!selectedSubCategory} />}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={brandOptions}
                                        value={brandOptions.find((option: any) => option.value === selectedBrand) || null}
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedBrand(newValue ? newValue.value : "")
                                        }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Brand" required={!selectedBrand} />}
                                    />
                                </div>
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={ageGroupOptions}
                                        value={ageGroupOptions.find((option: any) => option.value === selectedAgeGroup) || null}
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedAgeGroup(newValue ? newValue.value : "")
                                        }}
                                        fullWidth
                                        renderInput={(params) => <TextField {...params} label="Age Group" required={!selectedAgeGroup} />}
                                    />
                                </div>
                                <div>
                                    <Autocomplete
                                        disablePortal
                                        options={originOptions}
                                        value={originOptions.find((option: any) => option.value === selectedOrigin) || null}
                                        fullWidth
                                        getOptionKey={(option: any) => option.value}
                                        getOptionLabel={(option: any) => option.label || ""}
                                        onChange={(_, newValue: any) => {
                                            setSelectedOrigin(newValue ? newValue.value : "")
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Origin" required={!selectedOrigin} />}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Fill Product Details</p>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <div className="flex flex-col gap-3">
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
                                <TextField
                                    label='Price'
                                    name='price'
                                    placeholder='Price'
                                    type='number'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label='Variant'
                                    name='variant'
                                    placeholder='e.g., 500mg, 100ml'
                                    value={variant}
                                    onChange={(e) => setVariant(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>

                        <Grid size={6}>
                            <div className="flex flex-col gap-3">
                                <TextField
                                    label='Expiry Date'
                                    name='expiryDate'
                                    placeholder='Expiry Date'
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label='Benefit'
                                    name='benefit'
                                    placeholder='Benefit'
                                    value={benefit}
                                    onChange={(e) => setBenefit(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label='Return Policy'
                                    name='returnPolicy'
                                    placeholder='Return Policy'
                                    value={returnPolicy}
                                    onChange={(e) => setReturnPolicy(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label='Stock'
                                    name='stock'
                                    placeholder='Stock count'
                                    type='number'
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {/* Multiple Images Upload Section */}
                <div className="flex flex-col gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-sm text-slate-800">Product Images</p>
                            <p className="text-xs text-slate-500">Upload multiple high-quality product images</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                            {files.length + existingImages.length} image(s) total
                        </span>
                    </div>

                    {/* Dropzone Upload Button */}
                    <label
                        htmlFor="product-multiple-images"
                        className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-blue-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 rounded-xl cursor-pointer transition duration-150 ease-in-out group"
                    >
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="p-2.5 bg-blue-50 group-hover:bg-blue-100 rounded-full text-blue-600 transition mb-2">
                                <FiUploadCloud size={24} />
                            </div>
                            <p className="text-sm font-medium text-slate-700">
                                <span className="text-blue-600 font-semibold underline">Click to choose images</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG, JPEG, WEBP (Select multiple files)</p>
                        </div>
                        <input
                            id="product-multiple-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    {/* Previews of newly selected files */}
                    {files.length > 0 && (
                        <div className="flex flex-col gap-2 mt-1">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">New Images to Upload ({files.length})</p>
                            <div className="grid grid-cols-4 gap-2.5 max-h-[200px] overflow-y-auto p-1">
                                {files.map((f, idx) => (
                                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm aspect-square">
                                        <img
                                            src={URL.createObjectURL(f)}
                                            alt={f.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(idx)}
                                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow-md transition"
                                            title="Remove image"
                                        >
                                            <FiX size={12} />
                                        </button>
                                        <div className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5 text-[10px] text-white truncate text-center">
                                            {f.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Existing images when editing */}
                    {editId && existingImages.length > 0 && (
                        <div className="flex flex-col gap-2 mt-1">
                            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Current Images ({existingImages.length})</p>
                            <div className="grid grid-cols-4 gap-2.5 max-h-[200px] overflow-y-auto p-1">
                                {existingImages.map((imgUrl, idx) => (
                                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm aspect-square">
                                        <Image
                                            src={imgUrl}
                                            alt={`Current product ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                                            Image {idx + 1}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                    rowHeight={100}
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
