
import Image from "next/image"
import Link from "next/link"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
export default function Contact() {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl text-center sm:text-4xl text-center text-primary-bg pt-2">Contact Us for Enquiries</h1>
                <p className="pb-4 text-center">If you require any assistance or wish to raise a concern, please use the support channels mentioned below.</p>
                <Image src={"/contact.png"} height={20} width={1200} alt="contact image" className="sm:h-[500px]" />
                <h2 className="pl-2 sm:pl-0 mt-2">LEVEL 1: CUSTOMER SUPPORT</h2>
                <p className="pl-2 sm:pl-0">Chat Support</p>
                <p className="pl-2 sm:pl-0">For immediate assistance with orders, diagnostics, doctor consultations, payments, refunds, or account-related issues.</p>
                <Link href={"#"} className="underline pl-2 sm:pl-0">Need Help</Link>
                <p className="pl-2 sm:pl-0">Connect with our Instant Chat Support team via the Need Help section.</p>
                <p className="pl-2 sm:pl-0">Response Time: Within 3-5 Minutes</p>
                <p className="pl-2 sm:pl-0">Availability: 24x7</p>

                <h2 className="pl-2 sm:pl-0 pt-8">LEVEL 2: Email Support</h2>
                <p className="pl-2 sm:pl-0">You may reach our support team at:</p>
                <p className="pl-2 sm:pl-0">For detailed inquiries, escalations, or issues requiring documentation attachments, please drop us an email.</p>
                <Link href={"#"} className="underline pl-2 sm:pl-0">helpdesk@carehub.com </Link>
                <p className="pl-2 sm:pl-0">Response Time: Within 4 hours</p>

                <h2 className="pl-2 sm:pl-0 pt-8">LEVEL 3: CORPORATE ENQUIRIES </h2>
                <p className="pl-2 sm:pl-0">corporate@carehub.org </p>
                <h3 className="pl-2 sm:pl-0">REGISTERED OFFICE</h3>
                <p className="pl-2 sm:pl-0">Care Hub Limited <br />CIN No - U85110DL2024PLC123456 <br />#123, Healthcare Avenue <br />Tech Park <br />New Delhi, India – 110001</p>
            </div>
            <Footer />
        </>
    )
}