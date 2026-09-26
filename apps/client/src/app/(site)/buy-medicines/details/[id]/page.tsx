"use client"
import Footer from "apps/client/src/components/Footer"
import Navbar from "apps/client/src/components/Navbar"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { productView } from "apps/client/src/services/productService"
import { Grid } from "@mui/material"
import Image from "next/image"

const productDetails = () => {

    const [detailsData, setDetailsData] = useState()

    const params: any = useParams()
    const { id } = params

    const details = async () => {
        try {
            const view = await productView(id)
            console.log(view)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        details()
    }, [])
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <Grid>
                    <div className="flex">
                        <div>
                            <Image src={""} alt="pics" height={40} width={40} />
                            <Image src={""} alt="pics" height={40} width={40} />
                            <Image src={""} alt="pics" height={40} width={40} />
                            <Image src={""} alt="pics" height={40} width={40} />
                        </div>
                        <div> <Image src={""} alt="pics" height={500} width={300} /></div>
                        <div>
                            <h2>product name</h2>
                            <p>stock</p>
                            <p>expiryOn</p>
                            <p>variant</p>

                            <div>
                                <table>
                                    <td>
                                        <tr>subcategoryId</tr> <tr>data</tr>
                                    </td>

                                    <td>
                                        <tr>categoryId</tr> <tr>data</tr>
                                    </td>

                                    <td>
                                        <tr>childCategoryId</tr> <tr>data</tr>
                                    </td>

                                    <td>
                                        <tr>brandId</tr> <tr>data</tr>
                                    </td>

                                    <td>
                                        <tr>ageGroupId</tr> <tr>data</tr>
                                    </td>

                                    <td>
                                        <tr>originId</tr> <tr>data</tr>
                                    </td>
                                    <p>returnPolicy</p>
                                </table>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid>
                    <div>

                    </div>
                </Grid>
            </div>
            <Footer />
        </>
    )
}

export default productDetails