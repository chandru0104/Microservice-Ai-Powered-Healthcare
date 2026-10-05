'use client';

import Link from "next/link";
import Button from '@mui/material/Button';
import { User, Menu, BriefcaseMedical, Mail, Phone, ShoppingBag, Calendar, Trash2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from "next/image";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";
import { LuShoppingCart } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { userProfile, userUpdate, deleteUser } from "../services/user"
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Alert } from "@mui/material"
import { TextField } from "@mui/material"
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
    const [userInfo, setUserInfo] = useState<any>("")
    const [open, setOpen] = React.useState(false);

    // Delete Account Dialog states
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")

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
            if (userData?.name) {
                setUserName(userData.name)
                localStorage.setItem("userName", userData.name)
            }
        } catch (error: any) {
            console.error(error.message)
        }
    }

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
            const token = localStorage.getItem("userAccessToken")
            if (token || userName) {
                fetchUserProfile()
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
        setName(userInfo?.name || "")
        setEmail(userInfo?.email || "")
        setPhone(userInfo?.phone || "")
        setAddress(userInfo?.address || "")
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickLogout = () => {
        localStorage.removeItem("userAccessToken")
        localStorage.removeItem("userName")
        localStorage.removeItem("userId")
        localStorage.removeItem("userRole")
        setUserName(null)
        setUserInfo(null)
        setShowProfile(false)
        router.push("/")
    }

    const handleOpenDeleteDialog = () => {
        setConfirmEmail("")
        setDeleteError("")
        setDeleteDialogOpen(true)
    }

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setConfirmEmail("")
        setDeleteError("")
    }

    const handleConfirmDeleteUser = async () => {
        if (!confirmEmail || confirmEmail.trim().toLowerCase() !== userInfo?.email?.trim().toLowerCase()) {
            setDeleteError("Email address does not match. Please enter your correct registered email.")
            return
        }

        try {
            setDeleteLoading(true)
            if (userInfo?._id) {
                await deleteUser(userInfo._id)
            }
            handleCloseDeleteDialog()
            handleClose()
            handleClickLogout()
        } catch (error: any) {
            setDeleteError(error.message || "Failed to delete user account.")
        } finally {
            setDeleteLoading(false)
        }
    }

    const handleViewOrders = () => {
        handleClose()
        setShowProfile(false)
        router.push("/orders")
    }

    const handleViewAppointments = () => {
        handleClose()
        setShowProfile(false)
        router.push("/appointments")
    }

    const updateHandler = async (e: any) => {
        e.preventDefault()
        try {
            const payload = {
                name: name !== "" ? name : userInfo?.name,
                email: email !== "" ? email : userInfo?.email,
                phone: phone !== "" ? phone : userInfo?.phone,
                address: address !== "" ? address : userInfo?.address,
            }

            const update = await userUpdate(userInfo._id, payload)
            if (update) {
                if (payload.name) {
                    setUserName(payload.name)
                    localStorage.setItem("userName", payload.name)
                }
                await fetchUserProfile()
            }
            handleClose()
            return update
        } catch (error: any) {
            console.error(error.message)
        }
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
                        <div className="absolute top-15 right-50 bg-primary-bg text-white p-3 m-2 rounded-md flex flex-col gap-2 w-[240px] shadow-lg">
                            <div className="flex justify-end">
                                <button onClick={() => setShowProfile(false)} className="hover:opacity-80"><IoMdClose size={18} /></button>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <User size={16} className="shrink-0" />
                                <span className="truncate">{userInfo?.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs opacity-90 break-all">
                                <Mail size={16} className="shrink-0" />
                                <span className="truncate">{userInfo?.email}</span>
                            </div>
                            {userInfo?.phone && (
                                <div className="flex items-center gap-2 text-xs opacity-90">
                                    <Phone size={16} className="shrink-0" />
                                    <span>{userInfo?.phone}</span>
                                </div>
                            )}
                            <button className="bg-white text-primary-bg p-2 mt-1 rounded-md flex items-center justify-center gap-2 font-medium" onClick={() => { handleClickOpen() }}><MdEdit color="blue" />Edit Profile</button>
                            <button className="bg-red-500 text-white p-2 rounded-md flex items-center justify-center gap-2 font-medium" onClick={() => { handleClickLogout() }}><RiLogoutBoxFill color="white" />Logout</button>
                        </div>
                    }
                </div>
                {open && <React.Fragment>

                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        maxWidth="sm"
                        fullWidth
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
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, padding: "24px 20px" }}>
                            {/* 2 Fields Per Row */}
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                                <TextField
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    value={phone}
                                    onChange={(e) => { setPhone(e.target.value) }}
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                />
                            </Box>

                            {/* Quick Navigation & Delete User Actions */}
                            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, pt: 1.5, borderTop: "1px solid #e5e7eb" }}>
                                <Button
                                    onClick={handleViewOrders}
                                    startIcon={<ShoppingBag size={17} />}
                                    sx={{
                                        backgroundColor: "#16a34a !important",
                                        color: "#ffffff !important",
                                        textTransform: "none",
                                        fontWeight: 500,
                                        "&:hover": { backgroundColor: "#15803d !important" }
                                    }}
                                >
                                    View Orders
                                </Button>
                                <Button
                                    onClick={handleViewAppointments}
                                    startIcon={<Calendar size={17} />}
                                    sx={{
                                        backgroundColor: "#7c3aed !important",
                                        color: "#ffffff !important",
                                        textTransform: "none",
                                        fontWeight: 500,
                                        "&:hover": { backgroundColor: "#6d28d9 !important" }
                                    }}
                                >
                                    View Appointments
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleOpenDeleteDialog}
                                    startIcon={<Trash2 size={15} />}
                                    sx={{
                                        backgroundColor: "#ef4444 !important",
                                        color: "#ffffff !important",
                                        textTransform: "none",
                                        fontSize: "12px",
                                        padding: "4px 10px",
                                        ml: { sm: "auto" },
                                        "&:hover": { backgroundColor: "#dc2626 !important" }
                                    }}
                                >
                                    Delete User
                                </Button>
                            </Box>

                            <DialogActions sx={{ px: 0, pb: 0, pt: 1 }}>
                                <Button
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: "#f3f4f6 !important",
                                        color: "#374151 !important",
                                        textTransform: "none",
                                        "&:hover": { backgroundColor: "#e5e7eb !important" }
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={updateHandler}
                                    sx={{
                                        backgroundColor: "var(--primary-bg) !important",
                                        color: "#ffffff !important",
                                        textTransform: "none"
                                    }}
                                >
                                    Update Profile
                                </Button>
                            </DialogActions>
                        </Box>


                    </BootstrapDialog>
                </React.Fragment>
                }

                {/* Delete Account Email Confirmation Dialog */}
                {deleteDialogOpen && (
                    <BootstrapDialog
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="delete-dialog-title"
                        open={deleteDialogOpen}
                        maxWidth="xs"
                        fullWidth
                    >
                        <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center", gap: 1, color: "#dc2626" }} id="delete-dialog-title">
                            <AlertTriangle size={22} color="#dc2626" />
                            Confirm Account Deletion
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDeleteDialog}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: "16px 20px" }}>
                            <p className="text-sm text-gray-700">
                                This action is <strong>permanent</strong> and cannot be undone. To confirm deletion, please enter your registered email address:
                            </p>
                            <div className="bg-gray-100 p-2 rounded text-xs font-mono font-bold text-gray-800 break-all select-all">
                                {userInfo?.email}
                            </div>

                            {deleteError && (
                                <Alert severity="error" sx={{ fontSize: "13px" }}>
                                    {deleteError}
                                </Alert>
                            )}

                            <TextField
                                label="Enter your email to confirm"
                                placeholder={userInfo?.email || "Email address"}
                                value={confirmEmail}
                                onChange={(e) => {
                                    setConfirmEmail(e.target.value)
                                    if (deleteError) setDeleteError("")
                                }}
                                variant="outlined"
                                fullWidth
                                size="small"
                                autoFocus
                            />

                            <DialogActions sx={{ px: 0, pb: 0, pt: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                <Button
                                    onClick={handleCloseDeleteDialog}
                                    sx={{
                                        backgroundColor: "#f3f4f6 !important",
                                        color: "#374151 !important",
                                        textTransform: "none",
                                        "&:hover": { backgroundColor: "#e5e7eb !important" }
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmDeleteUser}
                                    disabled={deleteLoading || confirmEmail.trim().toLowerCase() !== userInfo?.email?.trim().toLowerCase()}
                                    sx={{
                                        backgroundColor: confirmEmail.trim().toLowerCase() === userInfo?.email?.trim().toLowerCase() ? "#dc2626 !important" : "#fca5a5 !important",
                                        color: "#ffffff !important",
                                        textTransform: "none",
                                        "&:hover": { backgroundColor: "#b91c1c !important" },
                                        "&.Mui-disabled": {
                                            backgroundColor: "#e5e7eb !important",
                                            color: "#9ca3af !important"
                                        }
                                    }}
                                >
                                    {deleteLoading ? "Deleting..." : "Delete Account"}
                                </Button>
                            </DialogActions>
                        </Box>
                    </BootstrapDialog>
                )}
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