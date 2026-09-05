import Scale from "../../../components/TicksWithoutLabels"
import Formatter from "../../../components/AxisFormatter"
import XAxis from "../../../components/XAxis"
import SeriesFormatter from "../../../components/ChartDataIndex"
import { Grid } from "@mui/material"
import AxisSubdomain from "../../../components/AxisSubdomain"
import { DashboardCard } from "../../../components/Card"

const Dashboard = () => {
    return (
        <>
            <h3 className="text-xl font-bold py-4">Dashboard</h3>
            <div className="bg-white p-4">
                <DashboardCard />

            </div>
            <div className="py-4" >
                <Grid container spacing={2} >
                    <Grid size={6}>
                        <Scale />
                    </Grid>
                    <Grid size={6}>
                        <Formatter />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ py: "18px" }}>
                    <Grid size={4}>
                        <XAxis />
                    </Grid>
                    <Grid size={4}>
                        <AxisSubdomain />
                    </Grid>
                    <Grid size={4}>
                        <SeriesFormatter />
                    </Grid>
                </Grid>

            </div>
        </>
    )
}
export default Dashboard
