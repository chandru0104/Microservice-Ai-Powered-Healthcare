'use client';

import Link from "next/link";
import Button from '@mui/material/Button';
import { User, Menu, BriefcaseMedical } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from "next/image";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { userProfile } from "../services/user"
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { IoSettingsSharp } from "react-icons/io5";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [userName, setUserName] = useState<string | null>(null)
    const [doctorName, setDoctorName] = useState<string | null>(null)
    const [showProfile, setShowProfile] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<any>(null)
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const userNames = localStorage.getItem("userName")
        const doctorNames = localStorage.getItem("doctorName")
        setUserName(userNames)
        setDoctorName(doctorNames)
    }, [])

    const fetchUserProfile = async () => {
        try {
            const user = await userProfile()
            const userData = user?.data?.data
            setShowProfile(true)
            setUserInfo(userData)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const router = useRouter()

    function toggleDrawer() {
        if (openMenu) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    }

    function doctorNavigation(data: String) {
        if (data === "user") {
            if (userName) {
                fetchUserProfile()
                setUserInfo(true)
            } else {
                router.push("/user-login")
            }
        } else if (data === "doctor") {
            if (doctorName) {
                router.push("/doctor/profile")
            } else {
                router.push("/doctor-login")
            }
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickLogout =()=>{
        localStorage.removeItem("userAccessToken")
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        router.push("/")

    }

    return (
        <>

            <nav className=" bg-white text-black flex gap-8 p-4 items-center justify-center border-b-2 sticky top-0 z-50">
                <div className="block sm:hidden mr-auto">
                    <Menu size={30} onClick={toggleDrawer} className="cursor-pointer" />
                </div>
                <div className="flex gap-2">
                    <div className="block sm:hidden ml-auto">
                        <Button onClick={() => { doctorNavigation("user") }}><User />Login</Button>
                    </div>
                    <div className="block sm:hidden ml-auto ">
                        <Button onClick={() => { doctorNavigation("doctor") }}><BriefcaseMedical /> &nbsp; Doctor Login</Button>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <Link href={"/"}><Image src="/logo.png" alt="logo" height={40} width={40} /></Link>
                </div>
                <ul className="hidden sm:flex gap-10">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/buy-medicines">Buy Medicines</Link>
                    </li>
                    <li>
                        <Link href="/doctor">Find Doctors</Link>
                    </li>
                    <li>
                        <Link href="/lab-tests">Lab Tests</Link>
                    </li>
                    <li>
                        <Link href="/ai-reports">AI Reports</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
                <div className="hidden sm:block ">
                    <Button onClick={() => { doctorNavigation("doctor") }}><BriefcaseMedical /> &nbsp; {doctorName ? doctorName : "Doctor Login"}</Button>
                </div>
                <div className="hidden sm:block">
                    <Button onClick={() => { doctorNavigation("user") }}><User /> &nbsp; {userName ? userName : "User Login"}</Button>
                    {showProfile &&
                        <div className="absolute top-15 right-50 bg-primary-bg text-white p-2 m-2 rounded-md flex flex-col gap-1 w-[220px]">
                            <button onClick={() => setShowProfile(false)} className="relative left-[190px] "><IoMdClose /></button>
                            <p>{userInfo.name}</p>
                            <p>{userInfo.email}</p>
                            <p>{userInfo.phone}</p>
                            <button className="bg-white text-primary-bg p-2 rounded-md flex items-center justify-center gap-2" onClick={() => { handleClickOpen() }}><IoSettingsSharp color=""/>settings</button>
                            <button className="bg-red-500 text-white p-2 rounded-md flex items-center justify-center gap-2" onClick={() => {handleClickLogout() }}><RiLogoutBoxFill color="white" />Logout</button>
                        </div>
                    }
                </div>
                {open && <React.Fragment>

                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            Modal title
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
                            <Typography gutterBottom>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros.
                            </Typography>
                            <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </Typography>
                            <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                                magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                                ullamcorper nulla non metus auctor fringilla.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                                Save changes
                            </Button>
                        </DialogActions>
                    </BootstrapDialog>
                </React.Fragment>
}
                <div className="hidden sm:block">
                    <Button onClick={() => { router.push("/cart") }} className="cartBtn"><LuShoppingCart /> &nbsp;Cart</Button>
                </div>
            </nav>
            {
                openMenu && <NavMenu />
            }
        </>

    );
};

export default Navbar;