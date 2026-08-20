import Carousel from "apps/client/src/components/Carousel"
import Navbar from "../../../components/Navbar"
import Footer from "apps/client/src/components/Footer"
import HomeCaps from "apps/client/src/components/HomeCaps"
import MiddleComponents from "apps/client/src/components/middleComponents"

const HomePage = () => {
    return (
        <div><Navbar />
            <Carousel />
            <MiddleComponents />
            <HomeCaps />
            <Footer />
        </div>

    )
}
export default HomePage