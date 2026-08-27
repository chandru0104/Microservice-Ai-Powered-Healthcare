'use client';

import Link from "next/link";
import Button from '@mui/material/Button';
import { User, Menu, BriefcaseMedical } from 'lucide-react';
import { useState } from 'react';
import Image from "next/image";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    
const userName  = localStorage.getItem("user_name")

    const router = useRouter()

    function toggleDrawer() {
        if (openMenu) {
            setOpenMenu(false)
        } else {
            setOpenMenu(true)
        }
    }

    function doctorNavigation(data: String) {
        if (data == "user") {
            if(userName){
            router.push("/user-profile")
            }
        } else {
            router.push("/doctor-login")
        }
    }
    return (
        <>
            <nav className=" bg-white text-black flex gap-10 p-4 items-center justify-center border-b-2 sticky top-0 z-50">
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
                        <Link href="/buy-medicines">Buy Medicines</Link>
                    </li>
                    <li>
                        <Link href="/doctors">Find Doctors</Link>
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
                    <Button onClick={() => { doctorNavigation("doctor") }}><BriefcaseMedical /> &nbsp; Doctor Login</Button>
                </div>
                <div className="hidden sm:block">
                    <Button onClick={() => { doctorNavigation("user") }}><User /> &nbsp; {userName ? userName : "User Login"}</Button>
                </div>
            </nav>
            {
                openMenu && <NavMenu />
            }
        </>

    );
};

export default Navbar;