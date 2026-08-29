
import "../global.css"
import Grid from "@mui/material/Grid"
import sideBar from "./jsons/sideBar.json"
import Image from "next/image"
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <div>
                    <Grid container spacing={0}>
                        <Grid size={2}>
                            <div>
                                <div className="flex gap-2 items-center ml-3">
                                    <Image src={"/logo.png"} alt="logo" width={50} height={50} />
                                    <div className="text-2xl ">Care Hub</div>
                                </div>
                                {sideBar && sideBar.map((menu) => {
                                    return (
                                        <div key={menu.id} className="m-6">

                                            <div className="flex gap-2">
                                                <div>{menu.icon}</div>
                                                <div>{menu.name}</div>
                                            </div>
                                        </div>
                                    )
                                })

                                }
                            </div>

                        </Grid>
                        <Grid size={10}>
                            <div className="p-4 bg-gray-900 h-full-screen"></div>
                        </Grid>
                    </Grid>

                </div>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default Layout