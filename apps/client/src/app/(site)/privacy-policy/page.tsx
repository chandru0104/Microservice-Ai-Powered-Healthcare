import Image from "next/image"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-center pt-4">Care Hub Privacy Policy</h1>
            <p className="text-center pb-4">Please read our privacy policy carefully to understand how we collect, use, and protect your personal information.</p>
            <Image src={"/policy.jpg"} alt="policy image" width={1200} height={20} className="flex item-center mx-auto" />
            <h2 className="text-center p-4">CARE HUB LIMITED-PRIVACY POLICY </h2>
            <div className="max-w-7xl mx-auto">
                <p>This Privacy Policy governs how we, Care Hub Limited, a company duly incorporated under the provisions of the Companies Act, 2013, having its registered office at #123, Healthcare Avenue, Tech Park, New Delhi, India - 110001 (collectively, “CHL”, “Care Hub”, “Company”, “we,” “us,” or “our”) collect, use, share and process your information, that you provide to us through your use of the app,  Care Hub and website [https://www.carehub.com/] in the course of availing services that are  made available on the said app and website (“Services”) as defined in the Terms of Use [https://www.carehub.com/terms] to you. </p>


                <ol >
                    <li><h2 className="py-2">1. WHAT IS PERSONAL INFORMATION </h2></li>

                    <ol type="a">
                        <li> Personal information is that information which can be used to directly or indirectly identify you. It includes de-identified data that, when linked to other information available to us, would enable us to identify you. Personal data does not include data that has been irreversibly anonymized or aggregated  so that we cannot identify you through it, even in conjugation conjunction with other information. </li>
                        <li>By signing up on the App or proceeding to the Website, and / or using our Services you represent that you voluntarily provide us with personal information including medical and financial information, and  consent to their collection, use, and disclosure in accordance with this Privacy Policy. You also  represent that you are duly authorized by any third party (including a child or an employee) whose  information you share with us. We shall act as per your representation of authority and shall not make  any independent enquiries to ascertain the veracity of your authorization. In the event you do not  have sufficient authorization you shall be solely responsible for your acts and omissions including  sharing of information with us by you and the consequential processing and actions taken by us in  accordance with this Privacy Policy. </li>
                    </ol>
                </ol>
                <ol start={2}>
                    <li className="py-2"><h2>2. HOW WE COLLECT PERSONAL INFORMATION</h2> </li>

                    <ol type="a">
                        <li> We collect Personal Information directly from you when you register on our Platform, book a consultation, order medicines, or communicate with our customer support. </li>
                        <li> We may also collect certain information automatically when you use our Platform, such as your IP address, browser type, device information, and usage details through cookies and similar tracking technologies. </li>
                        <li> We may receive Personal Information about you from third parties, such as payment gateways, healthcare providers, or diagnostic centers that you interact with through our Platform. </li>
                    </ol>
                </ol>
                <ol start={3}>
                    <li className="py-2"><h2>3. PURPOSE OF COLLECTION AND USAGE </h2> </li>

                    <ol type="a">
                        <li> To provide and improve our Services, including facilitating teleconsultations, delivering medicines, and processing home lab test requests. </li>
                        <li> To communicate with you regarding your appointments, orders, promotional offers, and updates to our policies or terms. </li>
                        <li> To comply with legal obligations, resolve disputes, enforce our agreements, and protect the rights, property, or safety of Care Hub, our users, or others. </li>
                    </ol>
                </ol>
                <ol start={4}>
                    <li className="py-2"><h2>4. DISCLOSURE AND SHARING OF INFORMATION </h2> </li>

                    <ol type="a">
                        <li> We may share your Personal Information with our doctors, diagnostic labs, pharmacies, and other service providers to fulfill the Services requested by you. </li>
                        <li> We do not sell your Personal Information to third parties for marketing purposes without your explicit consent. </li>
                        <li> We may disclose your Personal Information to government authorities or law enforcement agencies if required by law or in response to valid legal processes. </li>
                    </ol>
                </ol>
                <ol start={5}>
                    <li className="py-2"><h2>5. DATA SECURITY </h2></li>

                    <ol type="a">
                        <li> We implement reasonable security practices and procedures to protect your Personal Information from unauthorized access, alteration, disclosure, or destruction. </li>
                        <li> Despite our efforts, no transmission over the internet or method of electronic storage is completely secure, and we cannot guarantee absolute security of your data. </li>
                        <li> You are responsible for maintaining the confidentiality of your account credentials and should notify us immediately of any unauthorized use of your account. </li>
                    </ol>
                </ol>
                <ol start={6}>
                    <li className="py-2"><h2>6. DATA RETENTION </h2></li>

                    <ol type="a">
                        <li> We will retain your Personal Information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. </li>
                        <li> Once your Personal Information is no longer required, we will securely delete or anonymize it in accordance with applicable laws. </li>
                        <li> You may request the deletion of your account and associated data, subject to any legal obligations we may have to retain certain information. </li>
                    </ol>
                </ol>
                <ol start={7}>
                    <li className="py-2"><h2>7. YOUR RIGHTS </h2></li>

                    <ol type="a">
                        <li> You have the right to access, review, update, or correct your Personal Information stored with us at any time by logging into your account. </li>
                        <li> You may choose to withdraw your consent for the collection and processing of your Personal Information, subject to applicable laws and our ability to continue providing Services to you. </li>
                        <li> If you have any grievances or concerns regarding the handling of your Personal Information, you may contact our Grievance Officer using the details provided below. </li>
                    </ol>
                </ol>
                <ol start={8}>
                    <li className="py-2"><h2>8. CHANGES TO THIS POLICY </h2></li>

                    <ol type="a">
                        <li> We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting on the Platform. </li>
                        <li> We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your Personal Information. </li>
                        <li> Your continued use of the Platform after any changes to this Privacy Policy constitutes your acceptance of the updated terms. </li>
                    </ol>


                </ol>
            </div>
            <Footer />
        </div>
    )
}


export default PrivacyPolicy