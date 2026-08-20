
import Link from "next/link"
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { VscTwitter } from "react-icons/vsc";
const Footer =()=>{

    return(
              <div className="bg-[#004097] text-white mt-8">
                <div className="flex justify-between gap-10 p-4 border-b-2">
                <div>
                     <h5 className="font-bold">Site name</h5>
                     <p>We are India’s largest omnichannel digital healthcare platform  sitename <br /> legacy of clinical echnology to make the best quality healthcare easily accessible to every Indian, online.</p>
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
                    <p> site name ©  {new Date().getFullYear()}</p>
                                        <p>+91 9999 888 777</p>
                                                                                <p>
info@haunlimited.com</p>
<div className="flex gap-3">
    <Link href={"#"}><FaInstagram size={20}/></Link>
        <Link href={"#"}><CiFacebook size={20}/></Link>
            <Link href={"#"}><VscTwitter size={20}/></Link>
</div>
                </div>
                                <div >

                </div>
                <p className="text-[12px] p-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut id nihil dicta ipsam non pariatur exercitationem voluptas, alias nisi officiis fuga, natus sed eum illum doloribus aperiam cupiditate maxime. Mollitia libero praesentium nemo veniam atque doloremque blanditiis? Consectetur reprehenderit voluptatum, inventore vitae totam cupiditate. Itaque temporibus, possimus dolores provident debitis vitae sed odit nobis voluptatibus harum recusandae ea praesentium beatae nostrum, vero sapiente veniam hic! Nemo nulla iure et totam perferendis ex. Et asperiores recusandae sed voluptatibus qui excepturi obcaecati aliquid fuga placeat hic! Dolore quibusdam sequi iste pariatur, quos delectus vel at iusto et praesentium voluptas. Excepturi, nihil explicabo.</p>
              </div>
    )
}

export default Footer