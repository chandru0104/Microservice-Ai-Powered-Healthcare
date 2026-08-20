
import Image from "next/image"
import Link from "next/link"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
export default function Contact(){
     return(
        <>
        <Navbar/>
        <div>
            <h1>Contact Us for Enquiries</h1>
            <p>If you require any assistance or wish to raise a concern, please use the support channels mentioned below.</p>
            <Image src={"/contact.jpg"} height={20} width={1200} alt="contact image"/>
            <p>LEVEL 1: CUSTOMER SUPPORT</p>
            <p>Chat Support</p>
            <p>For immediate assistance with orders, diagnostics, doctor consultations, payments, refunds, or account-related issues.</p>
            <Link href={"#"} className="underline">Need Help</Link>
            <p>Connect with our Instant Chat Support team via the Need Help section.</p>
            <p>Response Time: Within 3-5 Minutes</p>
            <p>Availability: 24x7</p>

            <p>LEVEL 2: Email Support</p>
            <p>You may reach our support team at:</p>
            <p>For immediate assistance with orders, diagnostics, doctor consultations, payments, refunds, or account-related issues.</p>
            <Link href={"#"} className="underline">helpdesk@apollo247.com </Link>
            <p>Response Time: Within 4 hours</p>

            <p>LEVEL 3: CORPORATE ENQUIRIES </p>
            <p>corporate@apollo247.org </p>
            <h3>REGISTERED OFFICE</h3>
            <p>Apollo Healthco Limited <br />CIN No - U85110TN2020PLC135839 <br />#19, Bishop Gardens <br />Raja Annamalaipuram <br />Chennai, Tamil Nadu – 600028</p>
        </div>
        <Footer/>
        </>
     )
}