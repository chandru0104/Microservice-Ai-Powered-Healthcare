import Carousel from "apps/client/src/components/Carousel"
import Navbar from "../../../components/Navbar"
import Footer from "apps/client/src/components/Footer"
import HomeCaps from "apps/client/src/components/HomeCaps"
import MiddleComponents from "apps/client/src/components/middleComponents"
import LabTest from "apps/client/src/components/LabTest"
const HomePage = () => {
    return (
        <div className=""><Navbar />
            <Carousel /> 
            <LabTest/>
            <MiddleComponents />
            <HomeCaps />
            <Footer />
        </div>

    )
}
export default HomePage