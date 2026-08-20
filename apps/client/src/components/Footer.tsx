
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {

    return (
        <div className="bg-[#004097] text-white mt-8">
            <div className="flex justify-between gap-10 p-4 border-b-2">
                <div>
                    <h5 className="font-bold">Care Hub</h5>
                    <p>We are India’s largest omnichannel digital healthcare platform. Care Hub brings a <br /> legacy of clinical technology to make the best quality healthcare easily accessible to every Indian, online.</p>
                </div>
                <div>
                    <h5 className="font-bold">Quick Links</h5>
                    <Link href={"/Link"}>Buy Medicines</Link><br />
                    <Link href={"/Link"}>Find Doctors</Link><br />
                    <Link href={"/Link"}>Lab Tests
                    </Link><br />
                    <Link href={"/Link"}>AI Summary</Link><br />
                    <Link href={"/about"}>About</Link>
                </div>
                <div>
                    <h5 className="font-bold">Legal</h5>
                    <Link href={"/privacy-policy"}>Privacy Policy</Link><br />
                    <Link href={"/terms-conditions"}>Terms and Conditions</Link><br />

                    <Link href={"/contact"}>Contact
                    </Link><br />
                </div>
            </div >
            <div className="flex justify-between p-4">
                <p>Care Hub © {new Date().getFullYear()}</p>
                <p>+91 9999 888 777</p>
                <p>info@carehub.com</p>
                <div className="flex gap-3">
                    <Link href={"#"}><FaInstagram size={20} /></Link>
                    <Link href={"#"}><CiFacebook size={20} /></Link>
                    <Link href={"#"}><FaXTwitter size={20} /></Link>
                </div>
            </div>
            <div >

            </div>
            <p className="text-[12px] p-4 text-center text-gray-300">Disclaimer: The information provided on the Care Hub platform is for general informational purposes only and does not constitute medical advice. Care Hub is not a substitute for professional medical diagnosis or treatment. Always consult with a qualified healthcare provider regarding any medical condition or health concern.</p>
        </div>
    )
}

export default Footer