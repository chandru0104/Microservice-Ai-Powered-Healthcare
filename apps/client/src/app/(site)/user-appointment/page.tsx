"use client";

import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Loading } from "apps/client/src/components/Loading"
import { useState } from 'react';
import * as React from 'react';
import { getUserAppointmentList, getDoctorAppointmentList } from "apps/client/src/services/appointment"
import { getErrorMessage } from "apps/client/src/models/errorHandler"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import dayjs from "dayjs"
import { IoVideocam } from "react-icons/io5";
import { videoCall } from "apps/client/src/services/appointment"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const OrderHistorysPage = () => {

    const [loading, setLoading] = useState(false)

    const [row, setRow] = useState<any[]>([])
    const [roomName, setroomName] = useState("")
    const [meetUrl, setMeetUrl] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [doctorEmail, setDoctorEmail] = useState("")
    const [fees, setFees] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [open, setOpen] = useState(false)

    const callData = async (appointmentId: any) => {
        try {
            const call = await videoCall(appointmentId)
            const data = call?.data?.data
            setroomName(data?.roomName || data?.room || "")
            setMeetUrl(data?.meetUrl || "")
            setDate(data?.date || "")
            setTime(data?.time || "")
            setDoctorName(data?.doctorName || data?.doctor?.name || "")
            setDoctorEmail(data?.doctorEmail || data?.doctor?.email || "")
            setFees(data?.fees || data?.doctor?.fees || "")
            setPaymentStatus(data?.payment || "")
            setOpen(true)
        } catch (error: unknown) {
            throw new Error(getErrorMessage(error))
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    const list = async () => {
        try {
            const doctorId = typeof window !== "undefined" ? localStorage.getItem("doctorId") : null
            const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null

            if (!doctorId && !userId) return

            setLoading(true)
            let res: any;
            if (doctorId) {
                res = await getDoctorAppointmentList(doctorId)
            } else if (userId) {
                res = await getUserAppointmentList(userId)
            }

            const mapping = Array.isArray(res?.data?.data) ? res?.data?.data.map((items: any, index: any) => ({
                ...items,
                id: index + 1
            })) : []
            setRow(mapping)


        } catch (error: unknown) {
            throw new Error(getErrorMessage(error))
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        list()
    }, [])


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'user',
            headerName: 'Name',
            width: 150,
            editable: true,
            valueGetter: (value: any) => value ? value.name : ""
        },
        {
            field: 'userEmail',
            headerName: 'User Email',
            width: 250,
            editable: true,
            valueGetter: (value: any, row: any) => row?.user?.email || ""
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 130,
            valueGetter: (value, row) => row?.phone || "",
        },
        {
            field: 'doctorName',
            headerName: 'Doctor Name',
            width: 150,
            editable: true,
            valueGetter: (value, row) => row?.doctor?.name || ""
        },
        {
            field: 'doctorEmail',
            headerName: 'Doctor Email',
            width: 200,
            editable: true,
            valueGetter: (value, row) => row?.doctor?.email || ""
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 130,
            editable: true,
            valueGetter: (value, row) => {
                if (!row?.date) return "";
                const parsed = dayjs(row.date);
                return parsed.isValid() ? parsed.format("DD/MM/YYYY") : row.date;
            }
        },
        {
            field: 'time',
            headerName: 'Time',
            width: 120,
            editable: true,
            valueGetter: (value, row) => {
                if (!row?.time) return "";
                const parsed = dayjs(row.time);
                return parsed.isValid() ? parsed.format("hh:mm A") : row.time;
            }
        },
        {
            field: 'fees',
            headerName: 'Fees',
            width: 120,
            editable: true,
            valueGetter: (value, row) => row?.fees ? `${row.fees} Rs` : ""
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            width: 200,
            editable: true,
            renderCell: (params: any) => {
                const status = (params?.row?.payment || params?.row?.paymetStatus || params?.row?.paymentStatus || "pending").toLowerCase();
                if (status === "paid" || status === "success") {
                    return (
                        <div className="flex items-center h-full">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                               <button className='flex items-center gap-2' onClick={()=>callData(params?.row._id)}> Paid and clik to connect <IoVideocam /></button>
                            </span>
                        </div>
                    );
                } else if (status === "failed") {
                    return (
                        <div className="flex items-center h-full">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                                Failed
                            </span>
                        </div>
                    );
                }
                return (
                    <div className="flex items-center h-full">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-md text-xs font-semibold capitalize">
                            Pending
                        </span>
                    </div>
                );
            }
        },




    ];

    return (
        <>
            <Navbar />
            <Dialog
                open={open}
                slots={{
                    transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
                aria-labelledby="video-call-dialog-title"
            >
                <DialogTitle id="video-call-dialog-title" className="border-b border-gray-100 bg-slate-50">
                    <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                        <span className="p-2 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                            <IoVideocam size={20} />
                        </span>
                        Video Consultation Details
                    </div>
                </DialogTitle>
                <DialogContent className="pt-4 pb-2">
                    <div className="space-y-4 pt-2">
                        {/* Doctor Info */}
                        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4">
                            <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2">Doctor Details</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-500 block text-xs">Name</span>
                                    <span className="font-semibold text-gray-800">{doctorName || "N/A"}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block text-xs">Email</span>
                                    <span className="font-medium text-gray-800 break-all">{doctorEmail || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Info */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm">
                            <div>
                                <span className="text-gray-500 block text-xs">Date</span>
                                <span className="font-medium text-gray-800">
                                    {date ? (dayjs(date).isValid() ? dayjs(date).format("DD/MM/YYYY") : date) : "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs">Time</span>
                                <span className="font-medium text-gray-800">
                                    {time ? (dayjs(time).isValid() ? dayjs(time).format("hh:mm A") : time) : "N/A"}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs">Fees</span>
                                <span className="font-semibold text-gray-800">{fees ? `${fees} Rs` : "N/A"}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block text-xs">Payment</span>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                                    paymentStatus?.toLowerCase() === "paid" || paymentStatus?.toLowerCase() === "success"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-amber-100 text-amber-700"
                                }`}>
                                    {paymentStatus || "Pending"}
                                </span>
                            </div>
                        </div>

                        {/* Meeting Room & Link */}
                        <div className="border border-gray-200 rounded-xl p-3.5 bg-white space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Room Name</span>
                                <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700 font-semibold">{roomName || "N/A"}</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500 block mb-1">Meeting URL:</span>
                                {meetUrl ? (
                                    <a
                                        href={meetUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:text-blue-800 underline break-all font-mono"
                                    >
                                        {meetUrl}
                                    </a>
                                ) : (
                                    <span className="text-sm text-gray-400">Not available</span>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className="px-6 py-3 border-t border-gray-100 bg-slate-50 flex items-center justify-end gap-2">
                    <Button onClick={handleClose} color="inherit">
                        Close
                    </Button>
                    {meetUrl && (
                        <Button
                            component="a"
                            href={meetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            color="primary"
                            startIcon={<IoVideocam />}
                        >
                            Join Video Call
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between py-3'>
                    <h3 className="text-xl font-bold">Appointment History</h3>


                </div>
                {loading ? <Loading /> : <Box sx={{ height: 800, width: '100%' }}>
                    <DataGrid

                        rows={row}
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
            <Footer />
        </>
    );
};

export default OrderHistorysPage;