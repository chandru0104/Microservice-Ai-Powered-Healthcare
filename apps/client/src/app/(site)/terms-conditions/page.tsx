import Image from "next/image"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
const Terms = () => {
    return (
        <>
            <Navbar />
            <h1>terms & conditions</h1>
            <p>please read all of our terms and conditions before doing anything.</p>
            <Image src={"/terms.jpg"} height={20} width={1200} alt="terms image" className="h-[550px]" />
            <h1>CARE HUB LIMITED - TERMS OF USE</h1>
            <ol className="list-decimal">
                <li>GENERAL</li>
            </ol>
            <p>1.1.We, at Care Hub Limited, a company duly incorporated under the provisions of the Companies Act, 2013, having its registered office at #123, Healthcare Avenue, Tech Park, New Delhi, India - 110001 (“CHL”, “We”, “Us”, “Our” “Company”) provide services to all individuals accessing or  using our app, Care Hub and website ( www.carehub.com ) (collectively “Platform”) for any reason  (“You”, “Yours”, “User”) subject to the notices, terms, and conditions set forth in these Terms of Use  (“Terms of Use”, “Agreement”, “Terms”), read with the Privacy Policy, Return Policy, Payment &  Refunds Policy available here https://www.carehub.com . CHL and User are hereinafter individually  referred to as the “Party” and collectively as the “Parties”.
                1.2.These Terms of Use together with the Privacy Policy, Return Policy, and Payment and Refund Policy (without limitation) available  either at Platform or entered separately by the Company with You, as applicable, and all other notices,  rules, guidelines with respect to Your use of the Platform, constitutes the entire agreement (“Agreement”) between the Company and You:
                1.3.The domain name www.carehub.com, an internet-based portal, and “Care Hub”, a mobile application, is run, operated, and maintained by CHL. CHL may assign, transfer, and subcontract its  rights and/or obligations under these Terms of Use to any third party, as it may deem fit, and you shall  continue to be bound by these Terms of Use in the event of such assignment, transfer, or  subcontracting.
                1.4.Our Platform is operated, and services are provided in compliance with the laws in India and CHL shall not be liable to provide any Services availed by you in locations outside India. If you access our services  from locations outside India, you do so at your own risk and you are solely liable for compliance with  applicable local laws. The User agrees to use the services to authorize an individual and get the services  from the third party on his/her behalf. Where you use any third-party website or the services of any  third party, you may be subject to alternative or additional Terms of Use and privacy policies  of the respective third party/s.
                Any accessing or browsing of the Platform and using the Services (as defined in these Terms of Use) indicates your Agreement to all the Terms of Use in this Agreement. If you disagree with any part of the  Terms of Use, then you may discontinue access or use of the Platform.</p>

            <ol className="list-decimal" start={2}>
                <li>USER ACCOUNT</li>
            </ol>
            <p>2.1. In order to avail of the Services on the Platform, You will be required to register on the Platform by providing details about yourself, including Your name, address, contact details and such other details as may be required on the Platform and create an account (“Account”).
                2.2. You shall ensure and confirm that the Account information provided by You is complete, accurate and up-to-date. If there is any change in the Account information, You shall promptly update Your Account information on the Platform. If You provide any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or if CHL has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, CHL has the right to suspend or terminate Your Account and refuse any and all current or future use of the Platform (or any portion thereof) at its discretion, in addition to any right that CHL may have against You at law or in equity, for any misrepresentation of information provided by You.
                2.3. You will be responsible for maintaining the confidentiality of the Account information and are fully responsible for all activities that occur under Your Account. You agree to (a) immediately notify CHL of any unauthorized use of Your Account information or any other breach of security, and (b) ensure that You exit from Your Account at the end of each session. CHL cannot and will not be liable for any loss or damage arising from Your failure to comply with this provision. You may be held liable for losses incurred by CHL or any other user of or visitor to the Platform due to authorized or unauthorized use of Your Account as a result of Your failure in keeping Your Account information secure and confidential.
                2.4. Use of another User’s Account information for availing the Services is expressly prohibited.</p>

            <ol className="list-decimal" start={3}>
                <li>SERVICES</li>
            </ol>
            <p>3.1. Care Hub facilitates the provision of a variety of healthcare services to Users including but not limited to online medical consultations, diagnostic lab testing at home, and home delivery of medicines.
                3.2. We ensure that all medical practitioners and service providers listed on the Platform are verified and hold valid licenses to practice their respective professions. However, Care Hub acts merely as a technology platform connecting Users with these service providers.
                3.3. You acknowledge that the medical advice or consultation provided by any medical practitioner through the Platform is the sole responsibility of the practitioner. Care Hub shall not be liable for any medical negligence, incorrect diagnosis, or adverse effects arising out of such consultations or treatments.
                3.4. We reserve the right to modify, suspend, or discontinue any Service (or any part or content thereof) at any time with or without notice to You, and We will not be liable to You or to any third party should We exercise such rights.</p>

            <ol className="list-decimal" start={4}>
                <li>PRIVACY AND DATA PROTECTION</li>
            </ol>
            <p>4.1. By using the Platform, You agree to our collection, use, and disclosure of Your personal information in accordance with our Privacy Policy.
                4.2. We implement robust security measures to protect Your personal data and medical records stored in Your digital health vault. However, You acknowledge that no method of transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security.
                4.3. You grant Care Hub the right to share Your medical records with the consulting doctors or laboratories as strictly necessary for providing the Services You have requested on the Platform.
                4.4. We comply with all applicable data protection laws in India. For more detailed information regarding how we handle your data, please refer to our Privacy Policy accessible on the Platform.</p>

            <Footer />
        </>
    )
}

export default Terms