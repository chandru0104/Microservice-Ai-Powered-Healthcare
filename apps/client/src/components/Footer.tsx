
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

import Image from "next/image";
const Footer = () => {

    return (
        <div className="h-[700px] sm:h-[400px] bg-[#004097] text-white mt-8">
            <div className="flex-block sm:flex justify-center gap-8 pt-8">
                <div>
                        <Link href={"/"}><h5 className="font-bold flex items-center gap-2 p-2">
                    
                        <Image src={"/logo.png"} alt="logo" width={40} height={40} />Care Hub</h5></Link>
                    <p className="p-2 sm:p-0">We are India’s largest omnichannel digital healthcare platform. Care Hub brings a <br /> legacy of clinical technology to make the best quality healthcare easily accessible to every Indian, online.</p>
                </div>
                <div className="pt-6 sm:pt-0">
                    <h5 className="font-bold pl-2 sm:pl-0">Quick Links</h5>
                    <Link href={"/buy-medicines"} className="pl-2 sm:pl-0">Buy Medicines</Link><br />
                    <Link href={"/doctors"} className="pl-2 sm:pl-0">Find Doctors</Link><br />
                    <Link href={"/lab-tests"} className="pl-2 sm:pl-0">Lab Tests
                    </Link><br />
                    <Link href={"/ai-reports"} className="pl-2 sm:pl-0">AI Reports</Link><br />
                    <Link href={"/about"} className="pl-2 sm:pl-0">About</Link>
                </div>
                <div className="pt-6 sm:pt-0">
                    <h5 className="pl-2 sm:pl-0 font-bold ">Legal</h5>
                    <Link href={"/privacy-policy"} className="pl-2 sm:pl-0">Privacy Policy</Link><br />
                    <Link href={"/terms-conditions"} className="pl-2 sm:pl-0">Terms and Conditions</Link><br />

                    <Link href={"/contact"} className="pl-2 sm:pl-0">Contact
                    </Link><br />
                </div>
                
            </div >
            <div className="flex justify-center p-4 gap-8">
                <p>Copyrights © {new Date().getFullYear()},Care Hub.All rights reserved</p>
            </div>
                   <div className="flex gap-3 justify-center">
                    <Link href={"#"}><FaInstagram size={20} /></Link>
                    <Link href={"#"}><CiFacebook size={20} /></Link>
                    <Link href={"#"}><FaXTwitter size={20} /></Link>   
                </div>
                <p className="text-[12px] p-4  text-center text-gray-400 max-w-6xl mx-auto">Disclaimer: The information provided on the Care Hub platform is for general informational purposes only and does not constitute medical advice. Care Hub is not a substitute for professional medical diagnosis or treatment. Always consult with a qualified healthcare provider regarding any medical condition or health concern.</p>
    
        </div>

    )
}

export default Footer