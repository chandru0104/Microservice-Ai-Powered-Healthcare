import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import Grid from '@mui/material/Grid';

const UserProfile = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto ">
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <form action="">
                            <table>
                                <tr>
                                    <td><label htmlFor="">Name</label></td><td><input type="text" /></td>

                                </tr>
                                                                <tr>
                                    <td><label htmlFor="">Namddde</label></td><td><input type="text" /></td>

                                </tr>
                                                                <tr>
                                    <td><label htmlFor="">Ndddame</label></td><td><input type="text" /></td>

                                </tr>
                            </table>
                        </form>
                          
                    </Grid>
                    <Grid size={8}>

                    </Grid>
                </Grid>
            </div>
            <Footer />
        </>
    )
}

export default UserProfile