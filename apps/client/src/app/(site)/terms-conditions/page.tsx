import Image from "next/image"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
const Terms = () => {
    return (
        <>
            <Navbar />
            <h1 className="text-2xl text-center sm:text-4xl text-center pt-4">terms & conditions</h1>
            <p className="text-center pb-4">please read all of our terms and conditions before doing anything.</p>
            <Image src={"/termandcondition.jpg"} height={20} width={1200} alt="terms image" className="sm:h-[400px] flex item-center mx-auto" />
            <h1 className="text-[20px] text-center pb-2 sm:text-2xl text-center pt-4">CARE HUB LIMITED - TERMS OF USE</h1>
            <div className="pl-6 sm:max-w-7xl mx-auto">
                <ol className="list-decimal pb-4 font-semibold">
                    <li>GENERAL</li>
                </ol>
                <p className="pb-4">1.1.We, at Care Hub Limited, a company duly incorporated under the provisions of the Companies Act, 2013, having its registered office at #123, Healthcare Avenue, Tech Park, New Delhi, India - 110001 (“CHL”, “We”, “Us”, “Our” “Company”) provide services to all individuals accessing or  using our app, Care Hub and website ( www.carehub.com ) (collectively “Platform”) for any reason  (“You”, “Yours”, “User”) subject to the notices, terms, and conditions set forth in these Terms of Use  (“Terms of Use”, “Agreement”, “Terms”), read with the Privacy Policy, Return Policy, Payment &  Refunds Policy available here https://www.carehub.com . CHL and User are hereinafter individually  referred to as the “Party” and collectively as the “Parties”<br />
                    1.2.These Terms of Use together with the Privacy Policy, Return Policy, and Payment and Refund Policy (without limitation) available  either at Platform or entered separately by the Company with You, as applicable, and all other notices,  rules, guidelines with respect to Your use of the Platform, constitutes the entire agreement (“Agreement”) between the Company and You:</p>

                <ol className="list-decimal pb-4 font-semibold" start={2}>
                    <li>USER ACCOUNT</li>
                </ol>
                <p className="pb-4">2.1. In order to avail of the Services on the Platform, You will be required to register on the Platform by providing details about yourself, including Your name, address, contact details and such other details as may be required on the Platform and create an account (“Account”).</p>

                <ol className="list-decimal pb-4 font-semibold" start={3}>
                    <li>SERVICES</li>
                </ol>
                <p className="pb-4">3.1. Care Hub facilitates the provision of a variety of healthcare services to Users including but not limited to online medical consultations, diagnostic lab testing at home, and home delivery of medicines. <br />
                    3.2. We ensure that all medical practitioners and service providers listed on the Platform are verified and hold valid licenses to practice their respective professions. However, Care Hub acts merely as a technology platform connecting Users with these service providers.</p>

                <ol className="list-decimal pb-4 font-semibold" start={4}>
                    <li>PRIVACY AND DATA PROTECTION</li>
                </ol>
                <p className="pb-4">4.1. By using the Platform, You agree to our collection, use, and disclosure of Your personal information in accordance with our Privacy Policy. <br />
                    4.2. We implement robust security measures to protect Your personal data and medical records stored in Your digital health vault. However, You acknowledge that no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.</p>
            </div>
            <Footer />
        </>
    )
}

export default Terms