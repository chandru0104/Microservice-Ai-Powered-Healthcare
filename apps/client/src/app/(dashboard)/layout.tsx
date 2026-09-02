
"use client"

import "../global.css"
import Grid from "@mui/material/Grid"
import sideBar from "./jsons/sideBar.json"
import Image from "next/image"
import { useRouter } from "next/navigation"
import DashboardNav from "../../components/DashboardNav"
import {LuLogOut} from "react-icons/lu";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    return (
        <div>
            <Grid container spacing={0}>
                <Grid size={2} className="h-screen">
                    <div className="">
                        <div className="flex gap-2 items-center ml-3">
                            <Image src={"/logo.png"} alt="logo" width={50} height={50} />
                            <div className="text-2xl ">Care Hub</div>
                        </div>
                        {sideBar && sideBar.map((menu) => {
                            return (
                                <div key={menu.id} className="mt-2 ">

                                    <div className="">
                                        <button className="flex items-center justify-start gap-2 hover:bg-blue-200 py-2 px-4 w-full" onClick={() => router.push(menu.path)}>
                                            <div>{menu.icon}</div>
                                            <div>{menu.name}</div>
                                        </button>
                                    </div>
                                </div>
                            )
                        })

                        }
                    </div>
                    <div className="flex gap-2 items-center justify-center absolute top-[900px] left-[20px] w-[230px] bg-gray-100  text-gray-900 p-1 rounded-md  cursor-pointer"><LuLogOut /> <button>Logout</button></div>
                </Grid>
                <Grid size={10}>    
                    <div className="p-2 bg-gray-100 h-screen">
                        <DashboardNav />
                        {children}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Layout