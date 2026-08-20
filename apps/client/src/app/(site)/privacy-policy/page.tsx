import Image from "next/image"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <h1>Care Hub Privacy Policy</h1>
            <Image src={"/policy-image.jpg"} alt="policy image" width={1200} height={20} />
            <p>CARE HUB LIMITED-PRIVACY POLICY </p>

            <p>This Privacy Policy governs how we, Care Hub Limited, a company duly incorporated under the provisions of the Companies Act, 2013, having its registered office at #123, Healthcare Avenue, Tech Park, New Delhi, India - 110001 (collectively, “CHL”, “Care Hub”, “Company”, “we,” “us,” or “our”) collect, use, share and process your information, that you provide to us through your use of the app,  Care Hub and website [https://www.carehub.com/] in the course of availing services that are  made available on the said app and website (“Services”) as defined in the Terms of Use [https://www.carehub.com/terms] to you. </p>

            <p>CHL, owner of the Care Hub website and app (“Website” / “App” respectively), respects your  privacy, and seeks to comply with applicable legal requirements, including the Information Technology  Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and  Sensitive Personal Information) Rules, 2011 (the “SPDI Rules”) as amended from time to time, in  respect of data collection, processing, and transfer. </p>

            <p>Please read this Privacy Policy carefully. By accessing or using this Website/ App, you agree to be  bound by the terms described herein and all the terms incorporated by reference. If you do not agree  to all of these terms, do not use this Website/ App. </p>

            <ol className="list-decimal">
                <li>WHAT IS PERSONAL INFORMATION </li>

                <ol type="a">
                    <li> Personal information is that information which can be used to directly or indirectly identify you. It includes de-identified data that, when linked to other information available to us, would enable us to identify you. Personal data does not include data that has been irreversibly anonymized or aggregated  so that we cannot identify you through it, even in conjugation conjunction with other information. </li>
                    <li>“Sensitive Personal Data or Information” means personal information of any individual relating to password; financial information such as bank account or credit card or debit card or other payment  instrument details; physical, physiological, and mental health condition; sexual orientation; health  information such as medical records and history; biometric information; any detail relating to the  above as provided to or received by us for processing or storage. However, any data/information  relating to an individual that is freely available or accessible in the public domain or furnished under  the Right to Information Act, 2005, or any other law shall not qualify as Sensitive Personal Data or  Information. </li>
                    <li>By signing up on the App or proceeding to the Website, and / or using our Services you represent that you voluntarily provide us with personal information including medical and financial information, and  consent to their collection, use, and disclosure in accordance with this Privacy Policy. You also  represent that you are duly authorized by any third party (including a child or an employee) whose  information you share with us. We shall act as per your representation of authority and shall not make  any independent enquiries to ascertain the veracity of your authorization. In the event you do not  have sufficient authorization you shall be solely responsible for your acts and omissions including  sharing of information with us by you and the consequential processing and actions taken by us in  accordance with this Privacy Policy. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={2}>
                <li>HOW WE COLLECT PERSONAL INFORMATION </li>

                <ol type="a">
                    <li> We collect Personal Information directly from you when you register on our Platform, book a consultation, order medicines, or communicate with our customer support. </li>
                    <li> We may also collect certain information automatically when you use our Platform, such as your IP address, browser type, device information, and usage details through cookies and similar tracking technologies. </li>
                    <li> We may receive Personal Information about you from third parties, such as payment gateways, healthcare providers, or diagnostic centers that you interact with through our Platform. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={3}>
                <li>PURPOSE OF COLLECTION AND USAGE </li>

                <ol type="a">
                    <li> To provide and improve our Services, including facilitating teleconsultations, delivering medicines, and processing home lab test requests. </li>
                    <li> To communicate with you regarding your appointments, orders, promotional offers, and updates to our policies or terms. </li>
                    <li> To comply with legal obligations, resolve disputes, enforce our agreements, and protect the rights, property, or safety of Care Hub, our users, or others. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={4}>
                <li>DISCLOSURE AND SHARING OF INFORMATION </li>

                <ol type="a">
                    <li> We may share your Personal Information with our doctors, diagnostic labs, pharmacies, and other service providers to fulfill the Services requested by you. </li>
                    <li> We do not sell your Personal Information to third parties for marketing purposes without your explicit consent. </li>
                    <li> We may disclose your Personal Information to government authorities or law enforcement agencies if required by law or in response to valid legal processes. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={5}>
                <li>DATA SECURITY </li>

                <ol type="a">
                    <li> We implement reasonable security practices and procedures to protect your Personal Information from unauthorized access, alteration, disclosure, or destruction. </li>
                    <li> Despite our efforts, no transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security of your data. </li>
                    <li> You are responsible for maintaining the confidentiality of your account credentials and should notify us immediately of any unauthorized use of your account. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={6}>
                <li>DATA RETENTION </li>

                <ol type="a">
                    <li> We will retain your Personal Information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. </li>
                    <li> Once your Personal Information is no longer required, we will securely delete or anonymize it in accordance with applicable laws. </li>
                    <li> You may request the deletion of your account and associated data, subject to any legal obligations we may have to retain certain information. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={7}>
                <li>YOUR RIGHTS </li>

                <ol type="a">
                    <li> You have the right to access, review, update, or correct your Personal Information stored with us at any time by logging into your account. </li>
                    <li> You may choose to withdraw your consent for the collection and processing of your Personal Information, subject to applicable laws and our ability to continue providing Services to you. </li>
                    <li> If you have any grievances or concerns regarding the handling of your Personal Information, you may contact our Grievance Officer using the details provided below. </li>
                </ol>
            </ol>
            <ol className="list-decimal" start={8}>
                <li>CHANGES TO THIS POLICY </li>

                <ol type="a">
                    <li> We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting on the Platform. </li>
                    <li> We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your Personal Information. </li>
                    <li> Your continued use of the Platform after any changes to this Privacy Policy constitutes your acceptance of the updated terms. </li>
                </ol>
            </ol>
            <Footer />
        </div>
    )
}


export default PrivacyPolicy