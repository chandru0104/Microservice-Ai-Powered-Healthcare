"use client";


import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "../../../components/Loading"
import { useState,useEffect } from 'react';
import * as React from 'react';
import { UserAllList } from "../../../services/authService"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 350,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 380,
        editable: true,
    },


];


const UserPage = () => {

    const [rows, setrow] = useState([])

    const [loading, setLoading] = useState(false)

    const getData = async() => {
        try {
            setLoading(true)

            const list = await UserAllList()

            const { data } = list

            const rowsData = Array.isArray(data?.data) ? data.data :[]

            const mappingData = rowsData.map((row:any ,index:any)=>({
                ...row,
                id:index+1
            }))
            setrow(mappingData)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }
   
   useEffect(() => {
    getData()
   }, [])
   
    return (
        <div className='w-full'>
            <div className='flex items-center justify-between py-3'>
                <h3 className="text-xl font-bold">Users</h3>


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

export default UserPage;