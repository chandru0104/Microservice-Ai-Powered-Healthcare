"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { doctorList } from "../../../services/authService"
import { Loading } from "../../../components/Loading"
import { useState } from 'react';
import * as React from 'react';
import { doctorVerifyData } from "../../../services/authService"
import { FaEye } from "react-icons/fa";

const DoctorPage = () => {
    const [DoctorData, setDoctorData] = useState<any>([]);


    const [loading, setLoading] = useState(false)


    const DoctorListData = async () => {
        try {
            setLoading(true)
            const list = await doctorList()
            const { data } = list
            const dataList = Array.isArray(data?.data) ? data.data : []

            const mappingData = dataList.map((list: any, index: any) => ({
                ...list,
                id: index + 1

            }))
            setDoctorData(mappingData)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        DoctorListData()
    }, [])
    const doctorVerify = async (row: any) => {
        try {

            const updateData = await doctorVerifyData(row._id)
            if (updateData) {
                DoctorListData()
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    const columns: GridColDef<any>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            editable: false,
            renderCell: (params) => (
                <div className='flex gap-4 items-center '>
                    <div className=''>
                        {params.row.is_approved == 1 ? <div className='flex items-center gap-2'>
                            <button className='bg-green-500 rounded-md  w-[60px] h-[50px]'>Verify</button>

                        </div> : <div className=''>
                            <button className='bg-red-500 rounded-md  w-[70px] h-[50px]' onClick={() => { doctorVerify(params.row) }}>Not Verify</button>
                        </div>

                        }

                    </div>
                    <button ><FaEye size={35} className='flex items-center justify-center pl-4' color="blue" /></button>
                </div>

            )

        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
        },
        {
            field: 'specialties',
            headerName: 'Specialties',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'experience',
            headerName: 'Experience',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'register',
            headerName: 'Register No',
            type: 'number',
            width: 110,
            editable: true,
        },

    ];


    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Doctors</h3>


            </div>
            {loading ? <Loading /> : <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={DoctorData}
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

export default DoctorPage;