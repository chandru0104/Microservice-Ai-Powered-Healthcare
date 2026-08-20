import Image from "next/image"
import Navbar from "apps/client/src/components/Navbar"
import Footer from "apps/client/src/components/Footer"
const About = () => {
    return (
        <div>
            <Navbar />
            <h1>About</h1>
            <Image src={"/img_aboutus.webp"} alt="About Image" width={1200} height={20} />
            <p>Who we are?</p>
            <p>We are India’s largest omnichannel digital healthcare platform with the core belief that ‘Expertise is for Everyone’. We combine Care Hub’s legacy of clinical excellence, affordable cost, and forward-looking research with cutting-edge technology to make the best quality healthcare easily accessible to every Indian, online.</p>
            <p>What we do?</p>
            <p>Care Hub offers a comprehensive ecosystem of healthcare services. From instant online doctor consultations and at-home diagnostic tests to seamless home delivery of medicines, we ensure that every aspect of your health is covered under one roof.</p>

            <ul className="list-disc font-semibold">
                <li>Online Doctor Consultations</li>

            </ul>
            <p>With 6000+ Care Hub doctors from every possible specialty on-board, Care Hub empowers consumers to consult with doctors in 15 minutes or less, from the comfort and safety of their homes. Online doctor consultation is done via video conferencing, telephonic conversations or online chats.</p>

            <ul className="list-disc font-semibold">
                <li>Online Pharmacy</li>

            </ul>
            <p>Our extensive network of pharmacies ensures that you get 100% genuine medicines delivered straight to your doorstep. We offer a wide range of prescription medicines, over-the-counter health products, and wellness items.</p>
            <ul className="list-disc font-semibold">
                <li>At-Home Lab Tests</li>

            </ul>
            <p>Experience the convenience of diagnostic tests right at home. Care Hub provides safe and hygienic sample collection by trained professionals, with accurate digital reports delivered swiftly to your secure health vault.</p>

            <p>About Care Hub</p>
            <p>Care Hub was established in 1983 by renowned architects of modern healthcare in India. As the nation’s first corporate hospital, Care Hub is acclaimed for pioneering the private healthcare revolution in the country. The group has emerged as Asia’s foremost integrated healthcare services provider and has a robust presence across the healthcare ecosystem, including Hospitals, Pharmacies, Primary Care & Diagnostic Clinics and several retail health models. The Group also has Telemedicine facilities across several countries, Health Insurance Services, Global Projects Consultancy, Medical Colleges, Medvarsity for E-Learning, Colleges of Nursing and Management of Hospitals and a Research Foundation. Since its inception, Care Hub has been honoured by the trust of over 150 million individuals from 140 countries.</p>
            <Footer />
        </div>
    )
}

export default About