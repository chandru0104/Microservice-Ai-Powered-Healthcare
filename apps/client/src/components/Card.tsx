import { FaUserShield } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
export function DashboardCard() {
    return (
        <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaUserShield /></p>
                        <p className="">Active Users</p>
                    </div>

                </h3>
                <p className="text-2xl">10000+</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaUserDoctor /></p>
                        <p className="">Active Doctor</p>
                    </div>
                </h3>
                <p className="text-2xl">1500+</p>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><FaShop /></p>
                        <p className="">Oder Count</p>
                    </div>
                </h3>
                <p className="text-2xl">2000+</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><HiShoppingCart /></p>
                        <p className="">Total Product</p>
                    </div>
                </h3>
                <p className="text-2xl">500+</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
                <h3>
                    <div className="flex items-center gap-2">
                        <p className=""><RiMoneyRupeeCircleFill /></p>
                        <p className="">Total Revenue</p>
                    </div>
                </h3>
                <p className="text-2xl">Rs 10Lacs</p>
            </div>
        </div>
    )
}