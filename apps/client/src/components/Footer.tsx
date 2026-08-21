
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

import Image from "next/image";
const Footer = () => {

    return (
        <div className="bg-[#004097] text-white mt-8 h-[400px]  ">
            <div className="flex justify-center gap-8 pt-8">
                <div>
                        <Link href={"/"}><h5 className="font-bold flex items-center gap-2 p-2">
                    
                        <Image src={"/logo.png"} alt="logo" width={40} height={40} />Care Hub</h5></Link>
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