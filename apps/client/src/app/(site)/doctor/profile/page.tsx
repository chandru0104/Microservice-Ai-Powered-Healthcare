"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { doctorProfile, doctorUpdate, doctorDelete } from "apps/client/src/services/doctors"
import { useEffect, useState } from "react"
import { Loading } from "apps/client/src/components/Loading"
import { Box, Grid } from "@mui/material"
import { FaUserDoctor } from "react-icons/fa6";
import { GoStar } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { GoLocation } from "react-icons/go";
import Image from "next/image"
import { MdVerified, MdLogout } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useRouter } from "next/navigation";
import AlertDailog from "apps/client/src/components/AlertDailog"
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, TextField } from "@mui/material"


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function DoctorProfile() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [details, setDetails] = useState<any>([])
    const [openDailog, setOpenDailog] = useState<boolean>(false)
    const [open, setOpen] = React.useState(false);
    const id: any = typeof window === "object" ? localStorage.getItem("doctorId") : ""
    
    const [name, setName] = useState<any>("")
    const [email, setEmail] = useState<string>("")
    const [profile, setProfile] = useState<File | null>(null)
    const [place, setPlace] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [experience, setExperience] = useState<string>("")
    const [specialties, setSpecialties] = useState<string>("")
    const [btnLoading ,setBtnloading] = useState<boolean>(false)

    const handleLogout = () => {
        localStorage.removeItem("doctorAccessToken")
        localStorage.removeItem("doctorId")
        localStorage.removeItem("doctorName")
        setOpenDailog(false)
        router.push("/doctor-login")
    }

    const dooctorDetails = async () => {
        try {
            setLoading(true)
            const list = await doctorProfile(id as string)
            setDetails(list?.data?.data)
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        dooctorDetails()
    }, [])

    const handleClickOpen = () => {
        setEmail(details?.email)
        setName(details?.name)
        setPlace(details?.place)
        setPrice(details?.price)
        setExperience(details?.experience)
        setSpecialties(details?.specialties)
        setProfile(null)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const updateDoctor = async (e: any) => {
        e.preventDefault()
        try {
            setBtnloading(true)
            const update = await doctorUpdate(id, {
                name,
                email,
                profile,
                place,
                price,
                experience,
                specialties
            })

            setOpen(false)
            await dooctorDetails()
            return update

        } catch (error: any) {
            return console.error(error)
        } finally {
            setBtnloading(false)
        }
    }

    return (
        <>
            <Navbar />
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Edit Profile
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <Box component="form" onSubmit={updateDoctor}>
                            <div className="flex flex-wrap gap-5 items-center justify-around">

                                <TextField
                                    defaultValue={details.name}
                                    name="name"
                                    label="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"

                                />
                                <TextField
                                    defaultValue={details.email}
                                    name="email"
                                    label="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <TextField
                                    defaultValue={details.specialties}
                                    name="specialties"
                                    label="Specialties"
                                    onChange={(e) => setSpecialties(e.target.value)}
                                    placeholder="Specialties"
                                />

                                <TextField
                                    defaultValue={details.experience}
                                    name="experience"
                                    label="Experience"
                                    onChange={(e) => setExperience(e.target.value)}
                                    placeholder="Experience"

                                />
                                <TextField
                                    defaultValue={details.place}
                                    name="place"
                                    label="Place"
                                    onChange={(e) => setPlace(e.target.value)}
                                    placeholder="Place"
                                />
                                <TextField
                                    defaultValue={details.price}
                                    name="price"
                                    label="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price"
                                />
                              
                                <Image src={details?.profile || "/images/doc"} alt="profile" width={200} height={200} className="rouned-full"/>
                             
                                <div className="flex flex-col gap-3 mt-3">
                                    <p>Uplaod new profile</p>
                                    <input type="file" name="profile" onChange={(e) => setProfile(e.target.files?.[0] || null)} className="bg-gray-200 text-gray-600" />
                                </div>
                            </div>
                            <DialogActions className="border-t mt-3">
                                <Button autoFocus onClick={handleClose} >
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" className="w-[150px]" disabled={btnLoading}>{btnLoading? "Updating...":"Update"}</Button>
                            </DialogActions>

                        </Box>
                    </DialogContent>

                </BootstrapDialog>
            </React.Fragment>
            {loading ? <Loading /> : <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-end">
                    <button
                        onClick={() => setOpenDailog(true)}
                        className="flex items-center gap-1 border border-red-700 text-red-700 px-3 py-1.5 my-3 rounded-md hover:bg-red-50 cursor-pointer font-medium"
                    >
                        <MdLogout size={18} /> Logout
                    </button>
                    <AlertDailog
                        open={openDailog}
                        onClose={() => setOpenDailog(false)}
                        onConfirm={handleLogout}
                    />
                </div>
                <Grid container spacing={4}>

                    <Grid size={12}>
                        <div className="border border-gray-200 rounded-md  flex items-start justify-between shadow-lg">
                            <div className="p-4 flex items-start gap-3 ">
                                <Image src={details?.profile || "/images/doc"} alt="profile" width={200} height={200} className="rounded-md" />
                                <div className="text-gray-500 text-sm">
                                    <div className="text-gray-700 font-semibold text-[30px] p-2 flex items-center">{details.name} &nbsp; {details.is_approved === true ? <MdVerified color="green" /> : null}

                                        <div className="flex items-center gap-2">
                                            <button onClick={handleClickOpen}><CiEdit size={20} color="blue" style={{ courser: "poniter" }} /></button>
                                            <button><AiOutlineDelete size={20} color="red" /></button>

                                        </div>
                                    </div>
                                    <p className="flex items-center gap-1 font-semibold text-[30px] p-2"><FaUserDoctor color="blue" />{details.specialties}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><GoStar color="blue" />{details.experience}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><SlCalender color="gray" />{details.experience}</p>
                                    <p className="flex items-center gap-1 text-[20px] p-2"><GoLocation color="gray" />{details.place}</p>
                                </div>

                            </div>
                            <div className="text-semibold flex p-4 flex-col">
                                <p className="text-lg text-green-700 rounded-md  text-green-700 font-semibold">Register No : {details.register}</p>
                                <p className="flex items-center" ><HiOutlineMailOpen size={18} color="gray" /> &nbsp; {details.email}</p>
                                <p className="font-semibold">Base pay Amount : ₹ {details.price}.00</p>
                                <button className="bg-orange-500 rounded-lg p-1 text-white m-1 shadow-md">View Appointment</button>
                                <button className="bg-blue-500 rounded-lg p-1 text-white m-1 shadow-md">Payment History</button>

                            </div>

                        </div>

                    </Grid>
                </Grid>
            </div>}
            <Footer />
        </>
    )
}